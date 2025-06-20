/**
 * Extracts and returns an array of valid, trimmed values from a comma-separated string.
 *
 * The function first checks that the input is not null. It then splits the input string by commas,
 * trims each resulting value, and includes only those values that pass the `isValidValue` check.
 *
 * @param {string} commaSeparatedValues - The input string containing comma-separated values.
 * @returns {string[]} An array of valid, trimmed values.
 */
function extractValidCommaSeparatedValues(commaSeparatedValues) {
  // Ensure the input is not null
  bw6(commaSeparatedValues !== null);

  const validValues = [];

  // Split the input string by commas and iterate over each value
  for (const rawValue of commaSeparatedValues.split(",")) {
    const trimmedValue = rawValue.trim();
    // Only include values that pass the isValidValue check
    if (gw6(trimmedValue)) {
      validValues.push(trimmedValue);
    }
  }

  return validValues;
}

module.exports = extractValidCommaSeparatedValues;