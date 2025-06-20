/**
 * Replaces X-Ranges in a whitespace-separated string using a provided configuration.
 *
 * This function logs the replacement operation, splits the input string by whitespace,
 * processes each segment with the expandXRangeSpecifier function (using the provided config), and then
 * joins the processed segments back into a single string.
 *
 * @param {string} inputString - The whitespace-separated string to process.
 * @param {object} config - Configuration object passed to the replacement logic.
 * @returns {string} The processed string with X-Ranges replaced according to the config.
 */
function replaceXRangesInString(inputString, config) {
  // Log the replacement operation for debugging or tracking
  wB("replaceXRanges", inputString, config);

  // Split the input string by whitespace, process each segment, and join back
  return inputString
    .split(/\s+/)
    .map(segment => expandXRangeSpecifier(segment, config))
    .join(" ");
}

module.exports = replaceXRangesInString;
