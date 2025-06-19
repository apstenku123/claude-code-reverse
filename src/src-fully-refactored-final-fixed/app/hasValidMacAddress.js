/**
 * Checks if any network interface on the system has a MAC address matching the C15 pattern.
 *
 * @returns {boolean} True if a matching MAC address is found, otherwise false.
 */
function hasValidMacAddress() {
  // Retrieve all network interfaces from the MW2 module
  const networkInterfaces = MW2.networkInterfaces();

  // Iterate over each network interface (could be an array of interfaces per key)
  for (const interfaceList of Object.values(networkInterfaces)) {
    if (!interfaceList) continue; // Skip if the interface list is undefined or null

    // Each interface may have a 'mac' property; check each one
    for (const { mac: macAddress } of interfaceList) {
      // If the MAC address matches the C15 pattern, return true
      if (C15.test(macAddress)) {
        return true;
      }
    }
  }
  // No matching MAC address found
  return false;
}

module.exports = hasValidMacAddress;