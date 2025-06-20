/**
 * Returns the default port number for a given protocol string.
 *
 * @param {string} protocol - The protocol string (e.g., 'https:' or 'http:').
 * @returns {number} The default port number for the specified protocol. Returns 443 for 'https:', otherwise 80.
 */
function getDefaultPortForProtocol(protocol) {
  // If the protocol is HTTPS, return port 443; otherwise, return port 80
  return protocol === "https:" ? 443 : 80;
}

module.exports = getDefaultPortForProtocol;