/**
 * Checks if the provided address matches any configuration from getNoProxyServerList().
 * For IPv4 addresses, isBlobOrFileLikeObject uses isIpInSubnet to check for a match with the processed config.
 * For all addresses, isBlobOrFileLikeObject checks if the address ends with the config string.
 *
 * @param {string} address - The address to check against the configurations.
 * @returns {boolean} True if a match is found, false otherwise.
 */
function doesAddressMatchConfig(address) {
  // Iterate over each configuration string returned by getNoProxyServerList()
  for (const configString of getNoProxyServerList()) {
    // Process the config string using parseIPv4CidrNotation
    const processedConfig = parseIPv4CidrNotation(configString);

    // If the address is IPv4 and processedConfig exists, use isIpInSubnet to check for a match
    if (Hj0.isIPv4(address) && processedConfig && isIpInSubnet(processedConfig, address)) {
      return true;
    }
    // For all addresses, check if the address ends with the config string
    else if (address.endsWith(configString)) {
      return true;
    }
  }
  // No match found
  return false;
}

module.exports = doesAddressMatchConfig;