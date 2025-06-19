/**
 * Determines if the provided URL object is invalid as a base URL or uses the 'file' scheme.
 *
 * @param {Object} urlObject - The URL object to evaluate.
 * @param {string|null} urlObject.host - The host component of the URL. Can be null or an empty string.
 * @param {boolean} urlObject.cannotBeABaseURL - Indicates if the URL cannot be used as a base URL.
 * @param {string} urlObject.scheme - The scheme/protocol of the URL (e.g., 'http', 'file').
 * @returns {boolean} Returns true if the URL is invalid as a base URL or uses the 'file' scheme; otherwise, false.
 */
function isInvalidOrFileSchemeUrl(urlObject) {
  // Check if the host is null or an empty string,
  // or if the URL cannot be a base URL,
  // or if the scheme is 'file'.
  return (
    urlObject.host === null ||
    urlObject.host === "" ||
    urlObject.cannotBeABaseURL ||
    urlObject.scheme === "file"
  );
}

module.exports = isInvalidOrFileSchemeUrl;
