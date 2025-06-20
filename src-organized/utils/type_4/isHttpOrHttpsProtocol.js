/**
 * Determines if the given protocol string is either 'http' or 'https'.
 *
 * @param {string} protocol - The protocol string to check (e.g., 'http', 'https', 'ftp').
 * @returns {boolean} Returns true if the protocol is 'http' or 'https', otherwise false.
 */
function isHttpOrHttpsProtocol(protocol) {
  // Check if the protocol is exactly 'http' or 'https'
  return protocol === "http" || protocol === "https";
}

module.exports = isHttpOrHttpsProtocol;