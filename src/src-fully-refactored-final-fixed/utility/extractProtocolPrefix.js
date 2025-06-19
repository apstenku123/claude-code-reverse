/**
 * Extracts the protocol or scheme prefix from a given string, such as a URL or URI.
 *
 * This function uses a regular expression to match and extract the leading protocol or scheme
 * (e.g., 'http', 'ftp', 'mailto') from the input string, if present. The protocol must be 1-25
 * characters long and consist of alphanumeric characters, plus, minus, or underscore. It must be
 * followed by either '://' or ':'.
 *
 * @param {string} inputString - The string from which to extract the protocol or scheme prefix.
 * @returns {string} The extracted protocol or scheme prefix if found; otherwise, an empty string.
 */
function extractProtocolPrefix(inputString) {
  // Regular expression to match protocol/scheme at the start of the string
  const protocolMatch = /^([-+\w]{1,25})(:?\/\/|:)/.exec(inputString);
  // If a match is found, return the protocol/scheme part; otherwise, return an empty string
  return (protocolMatch && protocolMatch[1]) || "";
}

module.exports = extractProtocolPrefix;