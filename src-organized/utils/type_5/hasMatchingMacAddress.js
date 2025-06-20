/**
 * Checks if any network interface on the system has a MAC address matching a specific pattern.
 *
 * @returns {boolean} True if at least one MAC address matches the pattern, otherwise false.
 */
function hasMatchingMacAddress() {
  // Retrieve all network interfaces from the MW2 module
  const networkInterfaces = MW2.networkInterfaces();

  // Iterate over each network interface (could be multiple per device)
  for (const interfaceList of Object.values(networkInterfaces)) {
    if (!interfaceList) continue; // Skip if the interface list is undefined or null

    // Each interface may have multiple addresses (IPv4, IPv6, etc.)
    for (const { mac: macAddress } of interfaceList) {
      // Check if the MAC address matches the C15 pattern
      if (C15.test(macAddress)) {
        return true;
      }
    }
  }
  // No matching MAC address found
  return false;
}

module.exports = hasMatchingMacAddress;