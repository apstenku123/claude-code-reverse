/**
 * Extracts the protocol scheme from a given URL-like string.
 *
 * This function uses a regular expression to match and extract the protocol scheme
 * (such as 'http', 'https', 'ftp', etc.) from the beginning of the input string.
 * If no protocol scheme is found, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {string} urlString - The string from which to extract the protocol scheme.
 * @returns {string} The extracted protocol scheme, or an empty string if none is found.
 */
function extractProtocolScheme(urlString) {
  // Regular expression to match the protocol scheme at the start of the string
  // Example matches: 'http://', 'https://', 'ftp://', 'custom:/'
  const protocolMatch = /^([-+\w]{1,25})(:?\/\/|:)/.exec(urlString);
  // If a match is found, return the protocol scheme (group 1), otherwise return an empty string
  return (protocolMatch && protocolMatch[1]) || "";
}

module.exports = extractProtocolScheme;