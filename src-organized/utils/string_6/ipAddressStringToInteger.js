/**
 * Converts a dot-separated IPv4 address string to its 32-bit integer representation.
 *
 * @param {string} ipAddress - The IPv4 address in dot-decimal notation (e.g., "192.168.1.1").
 * @returns {number} The 32-bit integer representation of the IPv4 address.
 */
function ipAddressStringToInteger(ipAddress) {
  return ipAddress
    .split(".")
    .reduce(
      // For each octet, shift the accumulated value 8 bits left and add the parsed octet
      (integerValue, octetString) => (integerValue << 8) + parseInt(octetString, 10),
      0
    );
}

module.exports = ipAddressStringToInteger;