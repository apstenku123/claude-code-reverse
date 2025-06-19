/**
 * Factory function to compile and manage illegal pattern matchers for syntax highlighting modes.
 *
 * @param {Object} languageDefinition - The language definition object containing rules and configuration.
 * @param {Object} options - Additional options, such as plugins.
 * @param {Array} options.plugins - Array of plugin functions to extend the compiler.
 * @returns {Object} The compiled language definition with matchers for illegal patterns.
 */
function createIllegalMatcherFactory(languageDefinition, { plugins }) {
  /**
   * Creates a RegExp object from a pattern, with flags based on language options.
   * @param {string|RegExp} pattern - The pattern to compile.
   * @param {boolean} global - Whether to use the global flag.
   * @returns {RegExp}
   */
  function buildRegex(pattern, global) {
    return new RegExp(
      getSourceString(pattern),
      'm' + (languageDefinition.case_insensitive ? 'i' : '') + (global ? 'g' : '')
    );
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
     * Adds a rule and its regex to the matcher.
     * @param {string|RegExp} regexPattern - The regex pattern for the rule.
     * @param {Object} rule - The rule metadata.
     */
    addRule(regexPattern, rule) {
      rule.position = this.position++;
      this.matchIndexes[this.matchAt] = rule;
      this.regexes.push([rule, regexPattern]);
      this.matchAt += pm9(regexPattern) + 1;
    }
    /**
     * Compiles all added rules into a single matcher regex.
     */
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
        return;
      }
      const patterns = this.regexes.map(([_, regex]) => regex);
      this.matcherRe = buildRegex(im9(patterns), true);
      this.lastIndex = 0;
    }
    /**
     * Executes the matcher regex on the input string.
     * @param {string} input - The string to match against.
     * @returns {Object|null} The match result with rule metadata, or null.
     */
    exec(input) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(input);
      if (!match) return null;
      // Find the first non-undefined capturing group after group 0
      const groupIndex = match.findIndex((group, idx) => idx > 0 && group !== undefined);
      const rule = this.matchIndexes[groupIndex];
      match.splice(0, groupIndex);
      return Object.assign(match, rule);
    }
  }

  /**
   * Manages a set of rules and their associated multi-regex matchers.
   */
  class RuleSetMatcher {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }
    /**
     * Gets or creates a matcher starting from a specific rule index.
     * @param {number} startIndex - The index to start matching from.
     * @returns {MultiRegexMatcher}
     */
    getMatcher(startIndex) {
      if (this.multiRegexes[startIndex]) return this.multiRegexes[startIndex];
      const matcher = new MultiRegexMatcher();
      this.rules.slice(startIndex).forEach(([regex, rule]) => matcher.addRule(regex, rule));
      matcher.compile();
      this.multiRegexes[startIndex] = matcher;
      return matcher;
    }
    /**
     * Checks if scanning is resuming at the same position.
     * @returns {boolean}
     */
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    /**
     * Resets to consider all rules from the start.
     */
    considerAll() {
      this.regexIndex = 0;
    }
    /**
     * Adds a rule to the set.
     * @param {string|RegExp} regexPattern - The regex pattern for the rule.
     * @param {Object} rule - The rule metadata.
     */
    addRule(regexPattern, rule) {
      this.rules.push([regexPattern, rule]);
      if (rule.type === 'begin') this.count++;
    }
    /**
     * Executes the matcher on the input string.
     * @param {string} input - The string to match against.
     * @returns {Object|null} The match result with rule metadata, or null.
     */
    exec(input) {
      let matcher = this.getMatcher(this.regexIndex);
      matcher.lastIndex = this.lastIndex;
      let match = matcher.exec(input);
      // If resuming at the same position but no match, try from the start
      if (this.resumingScanAtSamePosition()) {
        if (!(match && match.index === this.lastIndex)) {
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
   * Builds a RuleSetMatcher for a mode, adding begin, end, and illegal rules.
   * @param {Object} mode - The mode definition.
   * @returns {RuleSetMatcher}
   */
  function buildRuleSetMatcher(mode) {
    const matcher = new RuleSetMatcher();
    // Add 'begin' rules for all contained modes
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
   * Recursively compiles a mode and its contained modes.
   * @param {Object} mode - The mode definition.
   * @param {Object} [parent] - The parent mode, if any.
   * @returns {Object} The compiled mode.
   */
  function compileMode(mode, parent) {
    let compiledMode = mode;
    if (mode.isCompiled) return compiledMode;
    // Run core and plugin compiler extensions
    [assignMatchToBeginIfPresent].forEach(ext => ext(mode, parent));
    languageDefinition.compilerExtensions.forEach(ext => ext(mode, parent));
    mode.__beforeBegin = null;
    [configureBeginKeywordsPattern, processIllegalEntries, ensureRelevanceProperty].forEach(ext => ext(mode, parent));
    mode.isCompiled = true;

    // Handle keywords pattern
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

    // Compile begin/end/illegal regexes for this mode
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
    // Recursively compile 'starts' mode if present
    if (mode.starts) compileMode(mode.starts, parent);
    compiledMode.matcher = buildRuleSetMatcher(compiledMode);
    return compiledMode;
  }

  // Ensure compilerExtensions is defined
  if (!languageDefinition.compilerExtensions) languageDefinition.compilerExtensions = [];
  // Top-level 'self' is not allowed
  if (languageDefinition.contains && languageDefinition.contains.includes('self')) {
    throw new Error('ERR: contains `self` is not supported at the top-level of a language.  See documentation.');
  }
  // Normalize classNameAliases
  languageDefinition.classNameAliases = mergeObjects(languageDefinition.classNameAliases || {});
  // Compile and return the language definition
  return compileMode(languageDefinition);
}

module.exports = createIllegalMatcherFactory;