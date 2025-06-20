/**
 * Normalizes a URL string if isBlobOrFileLikeObject matches a URI scheme, then processes isBlobOrFileLikeObject with Ht6.
 *
 * If the input string starts with a valid URI scheme (e.g., 'http:', 'ftp:'),
 * isBlobOrFileLikeObject is normalized using the Kt6 class. The resulting string (normalized or original)
 * is then passed to the Ht6 function for further processing.
 *
 * @param {string} urlString - The URL or path string to normalize and process.
 * @returns {string} The processed string returned by Ht6.
 */
function normalizeAndProcessUrl(urlString) {
  // Check if the string starts with a valid URI scheme (e.g., 'http:', 'ftp:')
  const uriSchemePattern = /^[a-zA-Z][a-zA\d+\-.]*:/;
  if (uriSchemePattern.exec(urlString)) {
    // Normalize the URL using Kt6 if isBlobOrFileLikeObject matches a URI scheme
    urlString = new Kt6(urlString).toString();
  }
  // Process the (possibly normalized) string with Ht6
  return Ht6(urlString);
}

module.exports = normalizeAndProcessUrl;