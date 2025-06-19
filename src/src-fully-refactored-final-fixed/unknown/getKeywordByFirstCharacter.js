/**
 * Retrieves a keyword from the provided keywords object based on the first character of the input string,
 * optionally performing a case-insensitive lookup depending on the hljs.case_insensitive flag.
 *
 * @param {Object} hljs - The highlight.js instance with case_insensitive property.
 * @param {Object} keywordContainer - An object containing a 'keywords' property, which is an object mapping characters to keywords.
 * @param {string} inputString - The string whose first character is used to look up the keyword.
 * @returns {any} The keyword associated with the first character of inputString, or undefined if not found.
 */
function zA(hljs, keywordContainer, inputString) {
  // Determine the first character, lowercased if case-insensitive search is enabled
  const firstChar = hljs.case_insensitive ? inputString[0].toLowerCase() : inputString[0];

  // Check if the keyword exists for the first character and return isBlobOrFileLikeObject if so
  return Object.prototype.hasOwnProperty.call(keywordContainer.keywords, firstChar)
    && keywordContainer.keywords[firstChar];
}

module.exports = zA;