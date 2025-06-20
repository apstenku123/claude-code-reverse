/**
 * Sets the 'sec-fetch-mode' HTTP header on the provided headers list using the mode specified in the request options.
 *
 * @param {Object} createRequestOptions - The request options object containing the mode and headersList.
 * @param {string} createRequestOptions.mode - The fetch mode to set (e.g., 'cors', 'no-cors', 'same-origin').
 * @param {Object} createRequestOptions.headersList - The headers list object with a set method for setting headers.
 * @returns {void}
 */
function setSecFetchModeHeader(createRequestOptions) {
  // Extract the fetch mode from the request options
  const fetchMode = createRequestOptions.mode;
  // Set the 'sec-fetch-mode' header to the extracted mode value
  // The third argument 'true' may indicate overwriting existing header or similar behavior
  createRequestOptions.headersList.set("sec-fetch-mode", fetchMode, true);
}

module.exports = setSecFetchModeHeader;