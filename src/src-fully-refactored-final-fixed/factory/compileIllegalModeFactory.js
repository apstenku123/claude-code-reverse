/**
 * Compiles a language mode object for illegal pattern detection and rule matching.
 * This function processes a language definition object, compiles its rules (begin, end, illegal, etc.),
 * and returns a fully prepared mode object with regex matchers for highlighting or parsing.
 *
 * @param {Object} languageDefinition - The language definition object to compile.
 * @param {Object} options - Additional options, including plugins.
 * @param {Array} options.plugins - Array of plugin functions to extend compilation.
 * @returns {Object} The compiled language mode object, ready for use in parsing/highlighting.
 */
function compileIllegalModeFactory(languageDefinition, { plugins }) {
  /**
   * Creates a RegExp object for a given pattern, with appropriate flags.
   * @param {RegExp|string} pattern - The regex pattern or string.
   * @param {boolean} global - Whether to use the global flag.
   * @returns {RegExp}
   */
  function createRegex(pattern, global) {
    // getSourceString is assumed to be a utility that converts pattern to a string
    return new RegExp(
      getSourceString(pattern),
      'm' + (languageDefinition.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
  }

  /**
   * Multi-pattern regex matcher for a set of rules.
   * Maintains mapping from regex group index to rule metadata.
   */
  class MultiRegexMatcher {
    constructor() {
      this.matchIndexes = {}; // Maps regex group index to rule
      this.regexes = []; // Array of [rule, regexPattern]
      this.matchAt = 1; // Current group index
      this.position = 0; // Position of rule in the matcher
    }

    /**
     * Adds a rule and its regex pattern to the matcher.
     * @param {RegExp|string} regexPattern
     * @param {Object} ruleMeta
     */
    addRule(regexPattern, ruleMeta) {
      ruleMeta.position = this.position++;
      this.matchIndexes[this.matchAt] = ruleMeta;
      this.regexes.push([ruleMeta, regexPattern]);
      this.matchAt += pm9(regexPattern) + 1; // pm9 returns number of capture groups
    }

    /**
     * Compiles the matcher into a single RegExp.
     */
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
        return;
      }
      // im9 combines regex patterns into a single alternation
      const patterns = this.regexes.map(([_, pattern]) => pattern);
      this.matcherRe = createRegex(im9(patterns), true);
      this.lastIndex = 0;
    }

    /**
     * Executes the matcher regex on the input string.
     * @param {string} input
     * @returns {Array|null} The match array with rule metadata, or null.
     */
    exec(input) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(input);
      if (!match) return null;
      // Find the first non-undefined group (after group 0)
      const groupIndex = match.findIndex((value, idx) => idx > 0 && value !== undefined);
      const ruleMeta = this.matchIndexes[groupIndex];
      // Remove unused groups before the matched one
      match.splice(0, groupIndex);
      // Attach rule metadata to match array
      return Object.assign(match, ruleMeta);
    }
  }

  /**
   * Manages a set of rules and their multi-regex matchers, supporting resuming from partial matches.
   */
  class RuleSetMatcher {
    constructor() {
      this.rules = []; // Array of [regexPattern, ruleMeta]
      this.multiRegexes = []; // Cache of MultiRegexMatcher instances
      this.count = 0; // Number of 'begin' rules
      this.lastIndex = 0; // Last index matched
      this.regexIndex = 0; // Current matcher index
    }

    /**
     * Returns a MultiRegexMatcher for the given index, creating isBlobOrFileLikeObject if needed.
     * @param {number} index
     * @returns {MultiRegexMatcher}
     */
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];
      const matcher = new MultiRegexMatcher();
      this.rules.slice(index).forEach(([regexPattern, ruleMeta]) => matcher.addRule(regexPattern, ruleMeta));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    /**
     * Returns true if resuming scan at the same position.
     * @returns {boolean}
     */
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    /**
     * Resets to consider all rules from the beginning.
     */
    considerAll() {
      this.regexIndex = 0;
    }

    /**
     * Adds a rule to the set.
     * @param {RegExp|string} regexPattern
     * @param {Object} ruleMeta
     */
    addRule(regexPattern, ruleMeta) {
      this.rules.push([regexPattern, ruleMeta]);
      if (ruleMeta.type === 'begin') this.count++;
    }

    /**
     * Executes the matcher on the input string, handling resuming logic.
     * @param {string} input
     * @returns {Array|null}
     */
    exec(input) {
      let matcher = this.getMatcher(this.regexIndex);
      matcher.lastIndex = this.lastIndex;
      let match = matcher.exec(input);
      // If resuming and no match at the same position, try from next position
      if (this.resumingScanAtSamePosition()) {
        if (match && match.index === this.lastIndex) {
          // continue
        } else {
          const freshMatcher = this.getMatcher(0);
          freshMatcher.lastIndex = this.lastIndex + 1;
          match = freshMatcher.exec(input);
        }
      }
      if (match) {
        this.regexIndex += match.position + 1;
        if (this.regexIndex === this.count) this.considerAll();
      }
      return match;
    }
  }

  /**
   * Builds a RuleSetMatcher from a mode'createInteractionAccessor contains, terminatorEnd, and illegal patterns.
   * @param {Object} mode
   * @returns {RuleSetMatcher}
   */
  function buildRuleSetMatcher(mode) {
    const ruleSet = new RuleSetMatcher();
    // Add 'begin' rules for each contained mode
    mode.contains.forEach(containedMode => {
      ruleSet.addRule(containedMode.begin, {
        rule: containedMode,
        type: 'begin'
      });
    });
    // Add 'end' rule if present
    if (mode.terminatorEnd) {
      ruleSet.addRule(mode.terminatorEnd, { type: 'end' });
    }
    // Add 'illegal' rule if present
    if (mode.illegal) {
      ruleSet.addRule(mode.illegal, { type: 'illegal' });
    }
    return ruleSet;
  }

  /**
   * Recursively compiles a mode and its contained modes.
   * @param {Object} mode - The mode object to compile.
   * @param {Object} [parent] - The parent mode, if any.
   * @returns {Object} The compiled mode.
   */
  function compileMode(mode, parent) {
    let compiledMode = mode;
    if (mode.isCompiled) return compiledMode;

    // Apply core and plugin compiler extensions
    [assignMatchToBeginIfPresent].forEach(extension => extension(mode, parent));
    languageDefinition.compilerExtensions.forEach(extension => extension(mode, parent));
    mode.__beforeBegin = null;
    [configureBeginKeywordsPattern, processIllegalEntries, ensureRelevanceProperty].forEach(extension => extension(mode, parent));
    mode.isCompiled = true;

    // Handle keywords
    let keywordPattern = null;
    if (typeof mode.keywords === 'object') {
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    if (mode.keywords) {
      mode.keywords = parseInteractionAttributes(mode.keywords, languageDefinition.case_insensitive);
    }
    // Error if both $pattern and lexemes are present
    if (mode.lexemes && keywordPattern) {
      throw new Error('ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ');
    }
    // Compile keyword pattern regex
    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
    compiledMode.keywordPatternRe = createRegex(keywordPattern, true);

    // Compile begin/end/terminator regexes if this is a contained mode
    if (parent) {
      if (!mode.begin) mode.begin = /\b|\b/;
      compiledMode.beginRe = createRegex(mode.begin);
      if (mode.endSameAsBegin) mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent) mode.end = /\b|\b/;
      if (mode.end) compiledMode.endRe = createRegex(mode.end);
      compiledMode.terminatorEnd = getSourceString(mode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        compiledMode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    // Compile illegal pattern regex
    if (mode.illegal) {
      compiledMode.illegalRe = createRegex(mode.illegal);
    }
    // Ensure contains is an array
    if (!mode.contains) mode.contains = [];
    // Recursively compile contained modes
    mode.contains = [].concat(...mode.contains.map(contained => getProcessedVariants(contained === 'self' ? mode : contained)));
    mode.contains.forEach(contained => {
      compileMode(contained, compiledMode);
    });
    // Recursively compile 'starts' mode
    if (mode.starts) compileMode(mode.starts, parent);
    // Attach matcher for this mode
    compiledMode.matcher = buildRuleSetMatcher(compiledMode);
    return compiledMode;
  }

  // Ensure compilerExtensions is present
  if (!languageDefinition.compilerExtensions) languageDefinition.compilerExtensions = [];
  // Top-level 'self' is not allowed
  if (languageDefinition.contains && languageDefinition.contains.includes('self')) {
    throw new Error('ERR: contains `self` is not supported at the top-level of a language.  See documentation.');
  }
  // Normalize classNameAliases
  languageDefinition.classNameAliases = mergeObjects(languageDefinition.classNameAliases || {});
  // Compile the root mode
  return compileMode(languageDefinition);
}

module.exports = compileIllegalModeFactory;
