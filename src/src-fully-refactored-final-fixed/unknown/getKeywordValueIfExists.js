/**
 * Checks if a keyword exists in the provided keywords object (case-insensitive if specified), and returns its value if found.
 *
 * @param {Object} hljs - The highlight.js instance with case_insensitive property.
 * @param {Object} keywordContainer - An object containing a 'keywords' property, which is an object mapping keyword names to their values.
 * @param {Array<string>} keywordArray - An array where the first element is the keyword to look up.
 * @returns {any} The value associated with the keyword if isBlobOrFileLikeObject exists, otherwise false.
 */
function getKeywordValueIfExists(hljs, keywordContainer, keywordArray) {
  // Determine if case-insensitive matching is enabled
  const isCaseInsensitive = hljs.case_insensitive;
  // Get the keyword to search for, converting to lowercase if needed
  const keywordToFind = isCaseInsensitive ? keywordArray[0].toLowerCase() : keywordArray[0];
  // Check if the keyword exists in the keywords object and return its value if found
  return Object.prototype.hasOwnProperty.call(keywordContainer.keywords, keywordToFind) && keywordContainer.keywords[keywordToFind];
}

module.exports = getKeywordValueIfExists;