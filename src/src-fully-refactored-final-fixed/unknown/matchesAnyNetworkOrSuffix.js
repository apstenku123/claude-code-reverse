/**
 * Checks if the given address matches any network from the list or ends with any network suffix.
 *
 * Iterates over all networks returned by getNoProxyServerList(). For each network:
 *   - If the input is an IPv4 address and the network is valid, checks if isIpInSubnet(subscription, address) returns true.
 *   - Otherwise, checks if the address ends with the network string.
 * Returns true if any match is found, false otherwise.
 *
 * @param {string} address - The address (possibly an IP or hostname) to check against the network list.
 * @returns {boolean} True if the address matches any network or suffix, false otherwise.
 */
function matchesAnyNetworkOrSuffix(address) {
  for (const network of getNoProxyServerList()) {
    const subscription = parseIPv4CidrNotation(network);
    // If address is IPv4 and subscription is valid, check for a match using isIpInSubnet
    if (Hj0.isIPv4(address) && subscription && isIpInSubnet(subscription, address)) {
      return true;
    } else if (address.endsWith(network)) {
      // Otherwise, check if address ends with the network string
      return true;
    }
  }
  return false;
}

module.exports = matchesAnyNetworkOrSuffix;