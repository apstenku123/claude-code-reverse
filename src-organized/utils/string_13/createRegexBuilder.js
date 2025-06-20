/**
 * Creates a regex builder object that allows for dynamic replacement of parts of a regex pattern
 * and retrieval of the resulting RegExp object.
 *
 * @param {string|RegExp} pattern - The initial regex pattern as a string or RegExp object.
 * @param {string} [flags=""] - Optional regex flags (e.g., 'g', 'i').
 * @returns {object} An object with 'replace' and 'getRegex' methods for manipulating and retrieving the regex.
 */
function createRegexBuilder(pattern, flags = "") {
  // If pattern is a RegExp, extract its source; otherwise, use the string directly
  let regexSource = typeof pattern === "string" ? pattern : pattern.source;

  /**
   * Placeholder for caret matching regex (e.g., /^([\s\s]*?)/),
   * since 'gD.caret' is referenced but not defined in the provided code.
   * Replace with the actual caret regex as needed.
   */
  const caretRegex = /^([\s\s]*?)/;

  const builder = {
    /**
     * Replaces a part of the regex source with a new pattern.
     *
     * @param {RegExp|string} searchValue - The pattern or string to search for in the regex source.
     * @param {RegExp|string} replacement - The replacement pattern or string.
     * @returns {object} The builder object for chaining.
     */
    replace: (searchValue, replacement) => {
      // If replacement is a RegExp, use its source; otherwise, use the string directly
      let replacementSource = typeof replacement === "string" ? replacement : replacement.source;
      // Replace caret anchors in the replacement pattern, if present
      replacementSource = replacementSource.replace(caretRegex, "$1");
      // Replace the searchValue in the regex source with the processed replacement
      regexSource = regexSource.replace(searchValue, replacementSource);
      return builder;
    },

    /**
     * Returns the constructed RegExp object using the current regex source and flags.
     *
     * @returns {RegExp} The constructed regular expression.
     */
    getRegex: () => {
      return new RegExp(regexSource, flags);
    }
  };

  return builder;
}

module.exports = createRegexBuilder;
