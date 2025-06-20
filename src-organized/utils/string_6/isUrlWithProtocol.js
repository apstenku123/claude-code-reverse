/**
 * Checks if a given string starts with a protocol (e.g., http://, https://, ftp://).
 *
 * @param {string} urlString - The string to check for a protocol prefix.
 * @returns {boolean} True if the string starts with a protocol, otherwise false.
 */
function isUrlWithProtocol(urlString) {
  // Regular expression explanation:
  // ^([a-z][a-z\d+\-.]*:)? matches an optional protocol (e.g., http:, ftp:)
  // \/\/ matches the double forward slashes
  // i flag makes isBlobOrFileLikeObject case-insensitive
  const protocolPattern = /^([a-z][a-z\d+\-.]*:)?\/\//i;
  return protocolPattern.test(urlString);
}

module.exports = isUrlWithProtocol;