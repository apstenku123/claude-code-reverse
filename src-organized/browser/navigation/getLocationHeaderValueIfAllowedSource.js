/**
 * Checks if the provided source is in the allowed sources list, and if so,
 * searches the headers array for a header named "location" (with exactly 8 characters in its name),
 * returning its associated value if found.
 *
 * @param {string} sourceName - The name of the source to check against the allowed sources list.
 * @param {Array} headersArray - An array representing header name/value pairs, where even indices are header names and odd indices are values.
 * @returns {string|null} The value of the "location" header if found and the source is allowed, otherwise null.
 */
function getLocationHeaderValueIfAllowedSource(sourceName, headersArray) {
  // Check if the source is in the list of allowed sources
  if (lX6.indexOf(sourceName) === -1) {
    return null;
  }

  // Iterate through the headers array in steps of 2 (name/value pairs)
  for (let headerIndex = 0; headerIndex < headersArray.length; headerIndex += 2) {
    const headerName = headersArray[headerIndex];
    const headerValue = headersArray[headerIndex + 1];

    // Check if the header name is exactly 8 characters and is 'location'
    if (
      headerName.length === 8 &&
      Vw.headerNameToString(headerName) === "location"
    ) {
      return headerValue;
    }
  }
  // If no matching header is found, return undefined (implicit)
}

module.exports = getLocationHeaderValueIfAllowedSource;