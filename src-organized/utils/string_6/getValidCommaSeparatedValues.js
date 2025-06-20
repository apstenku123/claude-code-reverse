/**
 * Extracts and returns an array of valid, trimmed values from a comma-separated string.
 *
 * This function takes a comma-separated string, splits isBlobOrFileLikeObject into individual values,
 * trims whitespace from each value, and includes only those values that pass the
 * provided validation function `gw6`. It first checks that the input is not null
 * using the `bw6` assertion function.
 *
 * @param {string} commaSeparatedValues - The input string containing comma-separated values.
 * @returns {string[]} An array of valid, trimmed values.
 */
function getValidCommaSeparatedValues(commaSeparatedValues) {
  // Ensure the input is not null
  bw6(commaSeparatedValues !== null);

  const validValues = [];

  // Split the input string by commas and iterate over each value
  for (const rawValue of commaSeparatedValues.split(",")) {
    // Trim whitespace from the value
    const trimmedValue = rawValue.trim();
    // Include the value only if isBlobOrFileLikeObject passes the gw6 validation
    if (gw6(trimmedValue)) {
      validValues.push(trimmedValue);
    }
  }

  return validValues;
}

module.exports = getValidCommaSeparatedValues;