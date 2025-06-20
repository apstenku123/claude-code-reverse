/**
 * Converts a dot-separated IPv4 address string to its 32-bit integer representation.
 *
 * @param {string} ipAddress - The IPv4 address in dot-decimal notation (e.g., "192.168.0.1").
 * @returns {number} The 32-bit integer representation of the IP address.
 */
function ipStringToInteger(ipAddress) {
  // Split the IP address into its four octets
  const octets = ipAddress.split(".");

  // Reduce the octets to a single integer by shifting and adding each octet
  const integerRepresentation = octets.reduce((accumulator, octet) => {
    // Shift the accumulator by 8 bits (one octet) and add the current octet
    return (accumulator << 8) + parseInt(octet, 10);
  }, 0);

  return integerRepresentation;
}

module.exports = ipStringToInteger;
