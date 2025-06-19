/**
 * Checks if a given URL string is absolute (i.e., starts with a scheme like 'http://', 'https://', etc.).
 *
 * @param {string} url - The URL string to check.
 * @returns {boolean} True if the URL is absolute, false otherwise.
 */
function isAbsoluteUrl(url) {
  // Regular expression explanation:
  // ^([a-z][a-z\d+\-.]*:)? matches an optional scheme (e.g., 'http:', 'ftp:') at the start
  // \/\/ matches the '//' that follows the scheme in absolute URLs
  // 'i' flag makes isBlobOrFileLikeObject case-insensitive
  const absoluteUrlPattern = /^([a-z][a-z\d+\-.]*:)?\/\//i;
  return absoluteUrlPattern.test(url);
}

module.exports = isAbsoluteUrl;