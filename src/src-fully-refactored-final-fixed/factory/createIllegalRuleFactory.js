/**
 * Factory function to compile and manage illegal rule matchers for syntax highlighting modes.
 *
 * @param {Object} languageDefinition - The language definition object containing rules and configuration.
 * @param {Object} options - Additional options for the factory.
 * @param {Object} options.plugins - Plugins to extend or modify the behavior.
 * @returns {Object} - The compiled language definition with matchers and regexes for illegal rules.
 */
function createIllegalRuleFactory(languageDefinition, { plugins }) {
  /**
   * Builds a RegExp for a given pattern, respecting case sensitivity and global matching.
   * @param {string|RegExp} pattern - The pattern to compile.
   * @param {boolean} global - Whether to use the global flag.
   * @returns {RegExp}
   */
  function buildRegex(pattern, global) {
    // getSourceString is assumed to normalize/convert pattern to string
    const flags = 'm' + (languageDefinition.case_insensitive ? 'i' : '') + (global ? 'g' : '');
    return new RegExp(getSourceString(pattern), flags);
  }

  /**
   * Multi-pattern regex matcher for a set of rules.
   */
  class MultiRegexMatcher {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    /**
     * Adds a rule and its pattern to the matcher.
     * @param {string|RegExp} pattern - The regex pattern for the rule.
     * @param {Object} rule - The rule object.
     */
    addRule(pattern, rule) {
      rule.position = this.position++;
      this.matchIndexes[this.matchAt] = rule;
      this.regexes.push([rule, pattern]);
      this.matchAt += pm9(pattern) + 1; // pm9 returns the number of capture groups in the pattern
    }

    /**
     * Compiles the combined regex for all rules.
     */
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
        return;
      }
      // im9 combines patterns into a single regex string with alternation
      const patterns = this.regexes.map(([_, pattern]) => pattern);
      this.matcherRe = buildRegex(im9(patterns), true);
      this.lastIndex = 0;
    }

    /**
     * Executes the matcher regex on the input string.
     * @param {string} input - The string to match against.
     * @returns {Array|null} - The match result with rule metadata, or null if no match.
     */
    exec(input) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(input);
      if (!match) return null;
      // Find the first non-undefined capturing group (skip group 0)
      const groupIndex = match.findIndex((group, idx) => idx > 0 && group !== undefined);
      const rule = this.matchIndexes[groupIndex];
      // Remove leading groups so match[0] is the matched text
      match.splice(0, groupIndex);
      // Attach rule metadata to the match array
      return Object.assign(match, rule);
    }
  }

  /**
   * Manages a set of rules and their multi-regex matchers for scanning input.
   */
  class RuleMatcher {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    /**
     * Gets or creates a MultiRegexMatcher starting at a specific rule index.
     * @param {number} startIndex - The index to start matching from.
     * @returns {MultiRegexMatcher}
     */
    getMatcher(startIndex) {
      if (this.multiRegexes[startIndex]) return this.multiRegexes[startIndex];
      const matcher = new MultiRegexMatcher();
      this.rules.slice(startIndex).forEach(([pattern, rule]) => matcher.addRule(pattern, rule));
      matcher.compile();
      this.multiRegexes[startIndex] = matcher;
      return matcher;
    }

    /**
     * Checks if scanning is resuming at the same position (not at the start).
     * @returns {boolean}
     */
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    /**
     * Resets the matcher to consider all rules from the start.
     */
    considerAll() {
      this.regexIndex = 0;
    }

    /**
     * Adds a rule to the matcher.
     * @param {string|RegExp} pattern - The regex pattern for the rule.
     * @param {Object} rule - The rule object.
     */
    addRule(pattern, rule) {
      this.rules.push([pattern, rule]);
      if (rule.type === 'begin') this.count++;
    }

    /**
     * Executes the matcher on the input string.
     * @param {string} input - The string to match against.
     * @returns {Array|null} - The match result with rule metadata, or null if no match.
     */
    exec(input) {
      let matcher = this.getMatcher(this.regexIndex);
      matcher.lastIndex = this.lastIndex;
      let match = matcher.exec(input);

      // If resuming at the same position and no match, try from the start at next position
      if (this.resumingScanAtSamePosition()) {
        if (!match || match.index !== this.lastIndex) {
          const fallbackMatcher = this.getMatcher(0);
          fallbackMatcher.lastIndex = this.lastIndex + 1;
          match = fallbackMatcher.exec(input);
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
   * Builds a RuleMatcher for a mode'createInteractionAccessor contains, terminatorEnd, and illegal rules.
   * @param {Object} mode - The mode definition.
   * @returns {RuleMatcher}
   */
  function buildMatcherForMode(mode) {
    const matcher = new RuleMatcher();
    // Add 'begin' rules for each contained mode
    mode.contains.forEach(containedMode => {
      matcher.addRule(containedMode.begin, {
        rule: containedMode,
        type: 'begin'
      });
    });
    // Add 'end' rule if defined
    if (mode.terminatorEnd) {
      matcher.addRule(mode.terminatorEnd, { type: 'end' });
    }
    // Add 'illegal' rule if defined
    if (mode.illegal) {
      matcher.addRule(mode.illegal, { type: 'illegal' });
    }
    return matcher;
  }

  /**
   * Recursively compiles a mode and its children, attaching regexes and matchers.
   * @param {Object} mode - The mode to compile.
   * @param {Object} [parent] - The parent mode, if any.
   * @returns {Object} - The compiled mode.
   */
  function compileMode(mode, parent) {
    let compiledMode = mode;
    if (mode.isCompiled) return compiledMode;

    // Run core and extension compilers
    [assignMatchToBeginIfPresent].forEach(fn => fn(mode, parent));
    languageDefinition.compilerExtensions.forEach(fn => fn(mode, parent));
    mode.__beforeBegin = null;
    [configureBeginKeywordsPattern, processIllegalEntries, ensureRelevanceProperty].forEach(fn => fn(mode, parent));
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
    if (mode.lexemes && keywordPattern) {
      throw new Error('ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ');
    }
    keywordPattern = keywordPattern || mode.lexemes || /\w+/;
    compiledMode.keywordPatternRe = buildRegex(keywordPattern, true);

    // Compile begin/end/illegal regexes for the mode
    if (parent) {
      if (!mode.begin) mode.begin = /\b|\b/;
      compiledMode.beginRe = buildRegex(mode.begin);
      if (mode.endSameAsBegin) mode.end = mode.begin;
      if (!mode.end && !mode.endsWithParent) mode.end = /\b|\b/;
      if (mode.end) compiledMode.endRe = buildRegex(mode.end);
      compiledMode.terminatorEnd = getSourceString(mode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        compiledMode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) {
      compiledMode.illegalRe = buildRegex(mode.illegal);
    }

    // Recursively compile contained modes
    if (!mode.contains) mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(contained => getProcessedVariants(contained === 'self' ? mode : contained)));
    mode.contains.forEach(containedMode => {
      compileMode(containedMode, compiledMode);
    });
    if (mode.starts) compileMode(mode.starts, parent);

    // Attach matcher for this mode
    compiledMode.matcher = buildMatcherForMode(compiledMode);
    return compiledMode;
  }

  // Ensure compilerExtensions exists
  if (!languageDefinition.compilerExtensions) languageDefinition.compilerExtensions = [];
  // Top-level 'self' is not allowed
  if (languageDefinition.contains && languageDefinition.contains.includes('self')) {
    throw new Error('ERR: contains `self` is not supported at the top-level of a language.  See documentation.');
  }
  // Normalize classNameAliases
  languageDefinition.classNameAliases = mergeObjects(languageDefinition.classNameAliases || {});
  // Compile the language definition
  return compileMode(languageDefinition);
}

module.exports = createIllegalRuleFactory;