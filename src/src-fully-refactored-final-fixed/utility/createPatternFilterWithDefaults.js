/**
 * Creates a pattern-matching filter function with default configuration options applied.
 *
 * This utility wraps the base pattern matching functionality (matchPatternWithConfig) and returns
 * a function and associated classes/methods that always apply the given default options.
 * If no valid defaults are provided, the base matcher is returned directly.
 *
 * @param {Object} defaultOptions - Default configuration options to apply to all pattern matching operations.
 * @returns {Function & Object} a function for matching patterns with defaults, extended with utility classes and methods.
 */
function createPatternFilterWithDefaults(defaultOptions) {
  // If no valid defaults are provided, return the base matcher directly
  if (
    !defaultOptions ||
    typeof defaultOptions !== "object" ||
    !Object.keys(defaultOptions).length
  ) {
    return matchPatternWithConfig;
  }

  // Reference to the base matcher
  const baseMatcher = matchPatternWithConfig;

  /**
   * The main pattern matching function with defaults applied.
   * @param {string} pattern - The pattern to match.
   * @param {string} input - The input string to test against the pattern.
   * @param {Object} [options={}] - Additional options to override defaults.
   * @returns {boolean} Whether the input matches the pattern.
   */
  function patternMatcherWithDefaults(pattern, input, options = {}) {
    // Merge defaultOptions with any provided options
    return baseMatcher(pattern, input, mergeOptionsWithDefaults(defaultOptions, options));
  }

  // Extend the main function with utility classes and methods
  return Object.assign(patternMatcherWithDefaults, {
    /**
     * Minimatch class with defaults applied.
     */
    Minimatch: class MinimatchWithDefaults extends baseMatcher.Minimatch {
      constructor(pattern, options = {}) {
        // Merge defaultOptions with provided options
        super(pattern, mergeOptionsWithDefaults(defaultOptions, options));
      }
      static defaults(options) {
        // Return a Minimatch class with new merged defaults
        return baseMatcher.defaults(mergeOptionsWithDefaults(defaultOptions, options)).Minimatch;
      }
    },

    /**
     * AST class with defaults applied.
     */
    AST: class ASTWithDefaults extends baseMatcher.AST {
      constructor(pattern, input, options = {}) {
        // Merge defaultOptions with provided options
        super(pattern, input, mergeOptionsWithDefaults(defaultOptions, options));
      }
      static fromGlob(pattern, options = {}) {
        // Create AST from glob pattern with merged defaults
        return baseMatcher.AST.fromGlob(pattern, mergeOptionsWithDefaults(defaultOptions, options));
      }
    },

    /**
     * Utility methods with defaults applied.
     */
    unescape: (input, options = {}) => baseMatcher.unescape(input, mergeOptionsWithDefaults(defaultOptions, options)),
    escape: (input, options = {}) => baseMatcher.escape(input, mergeOptionsWithDefaults(defaultOptions, options)),
    filter: (input, options = {}) => baseMatcher.filter(input, mergeOptionsWithDefaults(defaultOptions, options)),
    defaults: (options) => baseMatcher.defaults(mergeOptionsWithDefaults(defaultOptions, options)),
    makeRe: (pattern, options = {}) => baseMatcher.makeRe(pattern, mergeOptionsWithDefaults(defaultOptions, options)),
    braceExpand: (pattern, options = {}) => baseMatcher.braceExpand(pattern, mergeOptionsWithDefaults(defaultOptions, options)),
    match: (list, pattern, options = {}) => baseMatcher.match(list, pattern, mergeOptionsWithDefaults(defaultOptions, options)),
    sep: baseMatcher.sep,
    GLOBSTAR: GLOBSTAR_CONSTANT
  });
}

/**
 * Merges the default options with the provided options, with provided options taking precedence.
 *
 * @param {Object} defaults - The default options.
 * @param {Object} overrides - The options to override defaults.
 * @returns {Object} The merged options object.
 */
function mergeOptionsWithDefaults(defaults, overrides) {
  // hJ is assumed to be a deep merge utility
  return hJ(defaults, overrides);
}

// External dependencies assumed to be imported or defined elsewhere:
// - matchPatternWithConfig (matchPatternWithConfig)
// - hJ (deep merge utility)
// - GLOBSTAR_CONSTANT (FG)

module.exports = createPatternFilterWithDefaults;
