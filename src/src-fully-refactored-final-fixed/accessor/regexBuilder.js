/**
 * Creates a chainable regex builder object for constructing and modifying regular expressions.
 *
 * @param {string|RegExp} pattern - The initial regular expression pattern as a string or RegExp object.
 * @param {string} [flags=""] - Optional regex flags (e.g., 'g', 'i', 'm').
 * @returns {object} An object with chainable methods to replace parts of the pattern and to get the final RegExp object.
 */
function regexBuilder(pattern, flags = "") {
  // If pattern is a RegExp, extract its source, otherwise use as is
  let patternSource = typeof pattern === "string" ? pattern : pattern.source;

  const builder = {
    /**
     * Replaces a part of the pattern with a new substring or the source of another RegExp.
     *
     * @param {RegExp|string} searchValue - The substring or RegExp to search for in the pattern.
     * @param {string|RegExp} replacement - The replacement string or RegExp whose source will be used.
     * @returns {object} The builder object for chaining.
     */
    replace: (searchValue, replacement) => {
      // If replacement is a RegExp, use its source; otherwise, use as is
      let replacementSource = typeof replacement === "string" ? replacement : replacement.source;
      // Remove leading caret (^) if present, preserving any group
      replacementSource = replacementSource.replace(/^\^(.*)/, "$1");
      // Replace the searchValue in the patternSource with the replacementSource
      patternSource = patternSource.replace(searchValue, replacementSource);
      return builder; // Enable chaining
    },

    /**
     * Returns the constructed RegExp object with the current pattern and flags.
     *
     * @returns {RegExp} The final RegExp object.
     */
    getRegex: () => {
      return new RegExp(patternSource, flags);
    }
  };

  return builder;
}

module.exports = regexBuilder;