/**
 * Checks if the given address matches any of the patterns provided by getNoProxyServerList().
 * For each pattern, if the address is IPv4 and matches the pattern via isIpInSubnet, or if the address ends with the pattern, returns true.
 *
 * @param {string} address - The address (e.g., IP or hostname) to check against the patterns.
 * @returns {boolean} True if the address matches any pattern, false otherwise.
 */
function doesAddressMatchAnyPattern(address) {
  // Iterate through each pattern returned by getNoProxyServerList()
  for (const pattern of getNoProxyServerList()) {
    // Transform the pattern using parseIPv4CidrNotation
    const transformedPattern = parseIPv4CidrNotation(pattern);

    // If the address is IPv4 and transformedPattern is truthy, check with isIpInSubnet
    if (Hj0.isIPv4(address) && transformedPattern && isIpInSubnet(transformedPattern, address)) {
      return true;
    }
    // Otherwise, check if the address ends with the pattern string
    else if (address.endsWith(pattern)) {
      return true;
    }
  }
  // No matches found
  return false;
}

module.exports = doesAddressMatchAnyPattern;