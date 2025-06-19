/**
 * Converts an IPv4 or IPv6 address string into a Buffer representation.
 * Handles IPv4, IPv6, and IPv6 addresses with zero compression (::).
 *
 * @param {string} ipAddress - The IP address to convert (IPv4 or IPv6).
 * @returns {Buffer|null} Buffer containing the binary representation of the IP address, or null if invalid.
 */
function convertIpAddressToBuffer(ipAddress) {
  // Check if the address is IPv4
  if (mZ1.isIPv4(ipAddress)) {
    // Convert IPv4 address to Buffer using p_0
    return p_0(ipAddress);
  }
  // Check if the address is an IPv4-mapped IPv6 address (e.g., '::ffff:192.0.2.128')
  else if (kB6(ipAddress)) {
    // Remove the '::ffff:' prefix and convert the IPv4 part
    return p_0(ipAddress.substring(7));
  }
  // Check if the address is IPv6
  else if (mZ1.isIPv6(ipAddress)) {
    // Find the position of '::' (zero compression)
    const doubleColonIndex = ipAddress.indexOf("::");
    let leftPart, rightPart;
    if (doubleColonIndex === -1) {
      // No zero compression; entire address is the left part
      leftPart = ipAddress;
      rightPart = "";
    } else {
      // Split address into left and right parts around '::'
      leftPart = ipAddress.substring(0, doubleColonIndex);
      rightPart = ipAddress.substring(doubleColonIndex + 2);
    }
    // Convert left and right parts to Buffers
    const leftBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(leftPart));
    const rightBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(rightPart));
    // Allocate a zero-filled Buffer to fill the gap (total length must be 16 bytes)
    const zeroFillBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
    // Concatenate left, zero fill, and right buffers
    return Buffer.concat([leftBuffer, zeroFillBuffer, rightBuffer]);
  } else {
    // Not a valid IPv4 or IPv6 address
    return null;
  }
}

module.exports = convertIpAddressToBuffer;