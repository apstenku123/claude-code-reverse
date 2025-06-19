/**
 * Interleaves IPv6 TCP subchannel addresses with other addresses from the input array.
 *
 * Given an array of address objects, this function separates them into two groups:
 *   1. Addresses that are TCP subchannel addresses with IPv6 hosts
 *   2. All other addresses
 * It then interleaves the two groups, starting with the group matching the type of the first address.
 *
 * @param {Array<Object>} addresses - Array of address objects to process. Each object should have a 'host' property.
 * @returns {Array<Object>} - New array with addresses interleaved as described above.
 */
function interleaveIpv6AndOtherAddresses(addresses) {
  if (addresses.length === 0) return [];

  /**
   * Group 1: TCP subchannel addresses with IPv6 hosts
   * Group 2: All other addresses
   */
  const ipv6TcpAddresses = [];
  const otherAddresses = [];

  // Determine if the first address is a TCP subchannel address with an IPv6 host
  const firstIsIpv6Tcp = Ky0.isTcpSubchannelAddress(addresses[0]) && Hy0.isIPv6(addresses[0].host);

  // Partition the addresses into the two groups
  for (const address of addresses) {
    if (Ky0.isTcpSubchannelAddress(address) && Hy0.isIPv6(address.host)) {
      ipv6TcpAddresses.push(address);
    } else {
      otherAddresses.push(address);
    }
  }

  // Decide which group comes first based on the first address
  const primaryGroup = firstIsIpv6Tcp ? ipv6TcpAddresses : otherAddresses;
  const secondaryGroup = firstIsIpv6Tcp ? otherAddresses : ipv6TcpAddresses;

  // Interleave addresses from both groups
  const interleavedAddresses = [];
  const maxLength = Math.max(primaryGroup.length, secondaryGroup.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < primaryGroup.length) {
      interleavedAddresses.push(primaryGroup[i]);
    }
    if (i < secondaryGroup.length) {
      interleavedAddresses.push(secondaryGroup[i]);
    }
  }

  return interleavedAddresses;
}

module.exports = interleaveIpv6AndOtherAddresses;