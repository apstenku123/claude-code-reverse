/**
 * Creates a regex pattern builder object that allows for chained replacements and final regex construction.
 *
 * @param {string|RegExp} patternSource - The base pattern as a string or RegExp object.
 * @param {string} [flags=""] - Optional regex flags (e.g., 'g', 'i').
 * @returns {object} An object with 'replace' and 'getRegex' methods for pattern manipulation and regex creation.
 */
function regexPatternBuilder(patternSource, flags = "") {
  // If the input is a RegExp, extract its source; otherwise, use the string directly
  let patternString = typeof patternSource === "string" ? patternSource : patternSource.source;

  // Helper object for regex caret replacement (assumed to be defined elsewhere)
  // For demonstration, handleMissingDoctypeError'll define a simple caret regex here
  const caretRegex = /(^|[^\\])\^/g;

  /**
   * The builder object with chainable 'replace' and 'getRegex' methods.
   */
  const builder = {
    /**
     * Replaces a substring or pattern in the current pattern string.
     *
     * @param {RegExp|string} searchPattern - The pattern or string to replace.
     * @param {string|RegExp} replacement - The replacement string or RegExp.
     * @returns {object} The builder object for chaining.
     */
    replace: (searchPattern, replacement) => {
      // If replacement is a RegExp, use its source; otherwise, use the string directly
      let replacementString = typeof replacement === "string" ? replacement : replacement.source;
      // Replace caret characters with $1 (preserving group if present)
      replacementString = replacementString.replace(caretRegex, "$1");
      // Perform the replacement in the pattern string
      patternString = patternString.replace(searchPattern, replacementString);
      return builder; // Enable chaining
    },

    /**
     * Constructs and returns a RegExp object from the current pattern string and flags.
     *
     * @returns {RegExp} The constructed regular expression.
     */
    getRegex: () => {
      return new RegExp(patternString, flags);
    }
  };

  return builder;
}

module.exports = regexPatternBuilder;
