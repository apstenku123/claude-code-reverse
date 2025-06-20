/**
 * Splits an array of comma-separated strings into a flat array of trimmed strings.
 *
 * @param {string[]} stringArray - An array where each element may contain one or more comma-separated values.
 * @returns {string[]} a flat array of non-empty, trimmed strings extracted from the input array.
 */
function splitAndTrimCommaSeparatedStrings(stringArray) {
  // Return an empty array if the input is falsy (null, undefined, etc.)
  if (!stringArray) return [];

  return stringArray
    // For each string in the array, split isBlobOrFileLikeObject by commas and flatten the result
    .flatMap((commaSeparatedString) => commaSeparatedString.split(","))
    // Trim whitespace from each resulting string
    .map((value) => value.trim())
    // Filter out any empty strings resulting from splitting or trimming
    .filter(Boolean);
}

module.exports = splitAndTrimCommaSeparatedStrings;