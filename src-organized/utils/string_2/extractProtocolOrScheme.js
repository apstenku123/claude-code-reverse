/**
 * Extracts the protocol or scheme from the beginning of a given string, if present.
 *
 * The function matches a protocol or scheme (e.g., 'http', 'ftp', 'mailto') at the start of the input string,
 * followed by either '://' or ':'. If a match is found, isBlobOrFileLikeObject returns the protocol/scheme name; otherwise, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {string} inputString - The string from which to extract the protocol or scheme.
 * @returns {string} The extracted protocol or scheme, or an empty string if none is found.
 */
function extractProtocolOrScheme(inputString) {
  // Regular expression to match protocol/scheme at the start of the string
  // Example matches: 'http://', 'mailto:', 'ftp://', etc.
  const protocolMatch = /^([-+\w]{1,25})(:?\/\/|:)/.exec(inputString);

  // If a match is found, return the protocol/scheme (first capture group); otherwise, return an empty string
  return (protocolMatch && protocolMatch[1]) || "";
}

module.exports = extractProtocolOrScheme;