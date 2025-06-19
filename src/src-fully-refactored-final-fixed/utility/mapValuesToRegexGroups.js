/**
 * Maps each input value to a regex group string using createRegexGroupFromMappedValues,
 * then concatenates all resulting group strings into a single string.
 *
 * @param {...string} values - The input values to be mapped and grouped.
 * @returns {string} The concatenated regex group strings.
 */
function mapValuesToRegexGroups(...values) {
  // Map each value to a regex group string
  const regexGroups = values.map(value => createRegexGroupFromMappedValues(value));
  // Concatenate all regex group strings into a single string
  return regexGroups.join("");
}

module.exports = mapValuesToRegexGroups;