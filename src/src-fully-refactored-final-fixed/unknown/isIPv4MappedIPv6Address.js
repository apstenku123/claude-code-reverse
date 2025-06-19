/**
 * Checks if the given IP address is an IPv4-mapped IPv6 address.
 *
 * An IPv4-mapped IPv6 address has the format ::ffff:<IPv4-address>.
 * This function verifies that the input is a valid IPv6 address,
 * starts with the ::ffff: prefix (case-insensitive), and that the
 * remainder is a valid IPv4 address.
 *
 * @param {string} ipAddress - The IP address string to check.
 * @returns {boolean} True if the input is an IPv4-mapped IPv6 address, otherwise false.
 */
function isIPv4MappedIPv6Address(ipAddress) {
  // Check if the input is a valid IPv6 address
  const isIPv6 = mZ1.isIPv6(ipAddress);

  // Convert to lowercase and check if isBlobOrFileLikeObject starts with '::ffff:'
  const hasIPv4MappedPrefix = ipAddress.toLowerCase().startsWith('::ffff:');

  // Extract the IPv4 part (after '::ffff:') and check if isBlobOrFileLikeObject'createInteractionAccessor a valid IPv4 address
  const ipv4Part = ipAddress.substring(7);
  const isValidIPv4 = mZ1.isIPv4(ipv4Part);

  // Return true only if all conditions are met
  return isIPv6 && hasIPv4MappedPrefix && isValidIPv4;
}

module.exports = isIPv4MappedIPv6Address;