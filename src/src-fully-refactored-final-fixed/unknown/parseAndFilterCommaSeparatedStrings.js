/**
 * Parses a comma-separated string, trims each value, and returns an array of valid entries based on a filter function.
 * Throws an error if the input is null.
 *
 * @param {string} commaSeparatedValues - The input string containing comma-separated values.
 * @returns {string[]} An array of trimmed and validated strings.
 */
function parseAndFilterCommaSeparatedStrings(commaSeparatedValues) {
  // Ensure the input is not null
  bw6(commaSeparatedValues !== null);

  const filteredValues = [];

  // Split the input string by commas, trim each value, and filter using gw6
  for (const value of commaSeparatedValues.split(",")) {
    const trimmedValue = value.trim();
    // Only include values that pass the gw6 filter
    if (gw6(trimmedValue)) {
      filteredValues.push(trimmedValue);
    }
  }

  return filteredValues;
}

module.exports = parseAndFilterCommaSeparatedStrings;