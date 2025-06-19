/**
 * Creates a pattern matching utility with default options applied.
 *
 * If the provided defaultOptions object is invalid or empty, returns the base pattern matcher.
 * Otherwise, returns a function and associated classes/methods that always merge the given defaults
 * with any options passed at call time.
 *
 * @param {Object} defaultOptions - An object containing default options to apply to all pattern matching operations.
 * @returns {Function|Object} a pattern matcher function with attached classes and utility methods, all using the merged default options.
 */
function createPatternMatcherWithDefaults(defaultOptions) {
  // If defaultOptions is not a non-empty object, return the base matcher
  if (!defaultOptions || typeof defaultOptions !== "object" || !Object.keys(defaultOptions).length) {
    return matchPatternWithConfig;
  }

  // Store reference to the base matcher
  const baseMatcher = matchPatternWithConfig;

  /**
   * The main pattern matching function with defaults applied.
   * Merges defaultOptions with any options provided at call time.
   * @param {string} pattern - The pattern to match.
   * @param {string} input - The string to test against the pattern.
   * @param {Object} [options={}] - Additional options to override defaults.
   * @returns {*} The result of the base matcher.
   */
  function matcherWithDefaults(pattern, input, options = {}) {
    return baseMatcher(pattern, input, mergeOptions(defaultOptions, options));
  }

  // Attach utility classes and methods to the matcherWithDefaults function
  return Object.assign(matcherWithDefaults, {
    /**
     * Minimatch class with defaults applied.
     */
    Minimatch: class MinimatchWithDefaults extends baseMatcher.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, mergeOptions(defaultOptions, options));
      }
      static defaults(options) {
        return baseMatcher.defaults(mergeOptions(defaultOptions, options)).Minimatch;
      }
    },

    /**
     * AST class with defaults applied.
     */
    AST: class ASTWithDefaults extends baseMatcher.AST {
      constructor(pattern, parent, options = {}) {
        super(pattern, parent, mergeOptions(defaultOptions, options));
      }
      static fromGlob(pattern, options = {}) {
        return baseMatcher.AST.fromGlob(pattern, mergeOptions(defaultOptions, options));
      }
    },

    /**
     * Utility methods with defaults applied.
     */
    unescape: (input, options = {}) => baseMatcher.unescape(input, mergeOptions(defaultOptions, options)),
    escape: (input, options = {}) => baseMatcher.escape(input, mergeOptions(defaultOptions, options)),
    filter: (pattern, options = {}) => baseMatcher.filter(pattern, mergeOptions(defaultOptions, options)),
    defaults: (options) => baseMatcher.defaults(mergeOptions(defaultOptions, options)),
    makeRe: (pattern, options = {}) => baseMatcher.makeRe(pattern, mergeOptions(defaultOptions, options)),
    braceExpand: (pattern, options = {}) => baseMatcher.braceExpand(pattern, mergeOptions(defaultOptions, options)),
    match: (list, pattern, options = {}) => baseMatcher.match(list, pattern, mergeOptions(defaultOptions, options)),
    sep: baseMatcher.sep,
    GLOBSTAR: GLOBSTAR_CONSTANT
  });
}

// Helper function to merge default options with user-provided options
// (Assumes mergeOptions is implemented elsewhere, e.g., hJ in the original code)
// function mergeOptions(defaultOptions, userOptions) { ... }

module.exports = createPatternMatcherWithDefaults;