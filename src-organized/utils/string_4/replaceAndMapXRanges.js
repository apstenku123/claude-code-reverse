/**
 * Replaces X ranges in a space-separated string and maps each range using a transformation function.
 *
 * This function first logs or processes the replacement action using the external `wB` function,
 * then splits the input string into individual substrings (by whitespace),
 * applies the `expandXRangeSpecifier` transformation to each substring with the provided configuration,
 * and finally joins the results back into a single space-separated string.
 *
 * @param {string} inputString - The space-separated string containing X ranges to process.
 * @param {object} config - Configuration object passed to both `wB` and `expandXRangeSpecifier` functions.
 * @returns {string} The processed string with each X range replaced and mapped.
 */
function replaceAndMapXRanges(inputString, config) {
  // Notify or log the replacement operation (side effect)
  wB("replaceXRanges", inputString, config);

  // Split the input string by whitespace, process each part, and rejoin
  const processedRanges = inputString
    .split(/\s+/)
    .map(range => expandXRangeSpecifier(range, config))
    .join(" ");

  return processedRanges;
}

module.exports = replaceAndMapXRanges;
