/**
 * Converts an IPv4 address string (e.g., "192.168.1.1") to its 32-bit integer representation.
 *
 * @param {string} ipv4Address - The IPv4 address in dotted-decimal notation.
 * @returns {number} The 32-bit integer representation of the IPv4 address.
 */
function ipv4StringToInteger(ipv4Address) {
  return ipv4Address
    .split('.') // Split the address into its four octets
    .reduce((integerValue, octet) => {
      // Shift the accumulated value 8 bits to the left and add the next octet
      return (integerValue << 8) + parseInt(octet, 10);
    }, 0);
}

module.exports = ipv4StringToInteger;