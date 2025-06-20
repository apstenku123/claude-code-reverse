/**
 * Retrieves the value associated with a keyword in the provided keywords object,
 * using the first character of the input string as the key. The lookup can be
 * case-insensitive based on the hljs.case_insensitive flag.
 *
 * @param {Object} hljs - The highlight.js instance with case_insensitive property.
 * @param {Object} keywordContainer - An object containing a 'keywords' property (object mapping keyword keys to values).
 * @param {string} inputString - The string whose first character is used for the keyword lookup.
 * @returns {any} The value associated with the keyword if found; otherwise, undefined.
 */
function getKeywordValueByFirstCharacter(hljs, keywordContainer, inputString) {
  // Determine the key for lookup: case-insensitive or as-is, based on hljs.case_insensitive
  const firstCharacter = inputString[0];
  const lookupKey = hljs.case_insensitive ? firstCharacter.toLowerCase() : firstCharacter;

  // Check if the keywords object has the lookupKey as its own property
  const hasKeyword = Object.prototype.hasOwnProperty.call(keywordContainer.keywords, lookupKey);

  // Return the value if found, otherwise undefined
  return hasKeyword && keywordContainer.keywords[lookupKey];
}

module.exports = getKeywordValueByFirstCharacter;