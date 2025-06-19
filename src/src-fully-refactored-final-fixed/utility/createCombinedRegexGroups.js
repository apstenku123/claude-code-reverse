/**
 * Generates a combined regular expression group string by mapping each input value
 * through the createRegexGroupFromMappedValues function and concatenating the results.
 *
 * @param {...string} inputValues - The values to be converted into regex groups.
 * @returns {string} The concatenated regex group strings.
 */
function createCombinedRegexGroups(...inputValues) {
  // Map each input value to its regex group representation
  const regexGroups = inputValues.map(value => createRegexGroupFromMappedValues(value));
  // Concatenate all regex group strings into a single string
  return regexGroups.join("");
}

module.exports = createCombinedRegexGroups;