/**
 * Converts a dot-separated IPv4 address string to its 32-bit integer representation.
 *
 * @param {string} ipAddress - The IPv4 address in dot-decimal notation (e.g., "192.168.1.1").
 * @returns {number} The 32-bit integer representation of the IPv4 address.
 */
function ipAddressToInteger(ipAddress) {
  // Split the IP address into its four octets
  const octets = ipAddress.split(".");

  // Reduce the octets into a single integer by shifting and adding each octet
  const integerRepresentation = octets.reduce((accumulator, octet) => {
    // Shift the accumulator 8 bits to the left and add the current octet as an integer
    return (accumulator << 8) + parseInt(octet, 10);
  }, 0);

  return integerRepresentation;
}

module.exports = ipAddressToInteger;