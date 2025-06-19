/**
 * Splits and trims all comma-separated string elements from an array of strings.
 *
 * Given an array of strings (where each string may contain comma-separated values),
 * this function splits each string by commas, trims whitespace from each resulting value,
 * and returns a flat array of all non-empty, trimmed strings.
 *
 * @param {string[]} arrayOfCommaSeparatedStrings - Array of strings, each possibly containing comma-separated values.
 * @returns {string[]} Flat array of trimmed, non-empty strings extracted from the input.
 */
function splitAndTrimCommaSeparatedArrays(arrayOfCommaSeparatedStrings) {
  // Return an empty array if input is falsy (null, undefined, etc.)
  if (!arrayOfCommaSeparatedStrings) return [];

  return arrayOfCommaSeparatedStrings
    // For each string, split by comma and flatten the resulting arrays
    .flatMap((commaSeparatedString) => commaSeparatedString.split(','))
    // Trim whitespace from each value
    .map((value) => value.trim())
    // Remove any empty strings resulting from trimming
    .filter(Boolean);
}

module.exports = splitAndTrimCommaSeparatedArrays;