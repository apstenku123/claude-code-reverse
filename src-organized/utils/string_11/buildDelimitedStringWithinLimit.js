/**
 * Builds a comma-delimited string from an array of strings, ensuring the total length does not exceed the HB4 limit.
 * Iterates through the input array and appends each string to the result, separated by commas, until adding another string would exceed the maximum allowed length.
 *
 * @param {string[]} entries - Array of strings to concatenate.
 * @returns {string} Comma-separated string of entries within the HB4 length limit.
 */
function buildDelimitedStringWithinLimit(entries) {
  let delimitedString = "";
  for (const entry of entries) {
    // Check if adding this entry (plus comma if needed) will exceed the HB4 limit
    const additionalLength = delimitedString.length ? 1 + entry.length : entry.length;
    if (delimitedString.length + additionalLength <= HB4) {
      // Add comma if this is not the first entry
      delimitedString += delimitedString.length ? "," + entry : entry;
      continue;
    }
    // Stop adding entries if the limit would be exceeded
    break;
  }
  return delimitedString;
}

module.exports = buildDelimitedStringWithinLimit;