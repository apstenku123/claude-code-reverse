/**
 * Determines if a given IP address belongs to a specified subnet.
 *
 * @param {Object} subnet - The subnet definition object.
 * @param {number} subnet.ip - The base IP address of the subnet (as a 32-bit integer).
 * @param {number} subnet.prefixLength - The prefix length of the subnet mask (e.g., 24 for a /24 subnet).
 * @param {any} ipAddress - The IP address to check, in a format accepted by wj0 (e.g., string or integer).
 * @returns {boolean} True if the IP address is within the subnet, false otherwise.
 */
function isIpInSubnet(subnet, ipAddress) {
  // Extract the base IP address and prefix length from the subnet object
  const subnetIp = subnet.ip;
  const prefixLength = subnet.prefixLength;

  // Create the subnet mask by shifting -1 left by (32 - prefixLength) bits
  // For example, a /24 subnet mask would be 0xFFFFFF00
  const subnetMask = -1 << (32 - prefixLength);

  // Convert the input IP address to a 32-bit integer using wj0
  // (Assumes wj0 is a utility function for parsing IP addresses)
  const ipAsInt = wj0(ipAddress);

  // Check if the network portion of the IP matches the subnet
  return (ipAsInt & subnetMask) === (subnetIp & subnetMask);
}

module.exports = isIpInSubnet;