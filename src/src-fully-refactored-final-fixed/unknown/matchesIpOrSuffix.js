/**
 * Checks if the provided address matches any IPv4 address or string suffix from a configured list.
 *
 * Iterates over a list of configuration entries. For each entry:
 *   - If the input is an IPv4 address, attempts to extract a value from the config and compare using a custom matcher.
 *   - Otherwise, checks if the input string ends with the config entry.
 *
 * @param {string} address - The address or string to check against the configuration list.
 * @returns {boolean} True if a match is found (either IPv4 match or suffix match), false otherwise.
 */
function matchesIpOrSuffix(address) {
  // Iterate over each configuration entry returned by getNoProxyServerList()
  for (const configEntry of getNoProxyServerList()) {
    // Attempt to extract a value from the config entry
    const extractedValue = parseIPv4CidrNotation(configEntry);

    // If the address is IPv4 and the extracted value exists, use custom matcher isIpInSubnet
    if (Hj0.isIPv4(address) && extractedValue && isIpInSubnet(extractedValue, address)) {
      return true;
    }
    // Otherwise, check if the address ends with the config entry (suffix match)
    else if (address.endsWith(configEntry)) {
      return true;
    }
  }
  // No match found
  return false;
}

module.exports = matchesIpOrSuffix;