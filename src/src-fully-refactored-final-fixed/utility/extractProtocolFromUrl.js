/**
 * Extracts the protocol (e.g., 'http', 'https', 'ftp') from a given URL-like string.
 *
 * @param {string} urlString - The string from which to extract the protocol.
 * @returns {string} The protocol if found (without the trailing colon or slashes), otherwise an empty string.
 */
function extractProtocolFromUrl(urlString) {
  // Regular expression to match protocol at the start of the string (e.g., 'http:', 'https://', 'ftp://')
  const protocolMatch = /^([-+\w]{1,25})(:?\/\/|:)/.exec(urlString);
  // If a match is found, return the protocol part (group 1); otherwise, return an empty string
  return (protocolMatch && protocolMatch[1]) || "";
}

module.exports = extractProtocolFromUrl;