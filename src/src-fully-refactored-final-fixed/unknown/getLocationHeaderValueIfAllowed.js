/**
 * Checks if the provided header source is allowed, then searches for a 'location' header in the headers array and returns its value if found.
 *
 * @param {string} headerSource - The source identifier to check against the allowed list (lX6).
 * @param {Array} headersArray - An array of header key-value pairs, where keys are at even indices and values at odd indices.
 * @returns {string|null} The value of the 'location' header if found and allowed, otherwise null.
 */
function getLocationHeaderValueIfAllowed(headerSource, headersArray) {
  // Check if the header source is in the allowed list
  if (lX6.indexOf(headerSource) === -1) {
    return null;
  }

  // Iterate through the headers array in steps of 2 (key-value pairs)
  for (let headerIndex = 0; headerIndex < headersArray.length; headerIndex += 2) {
    const headerKey = headersArray[headerIndex];
    const headerValue = headersArray[headerIndex + 1];
    // Check if the header key is 8 characters long and its string representation is 'location'
    if (headerKey.length === 8 && Vw.headerNameToString(headerKey) === "location") {
      return headerValue;
    }
  }
  // Return undefined implicitly if no matching header is found (could also explicitly return null)
}

module.exports = getLocationHeaderValueIfAllowed;