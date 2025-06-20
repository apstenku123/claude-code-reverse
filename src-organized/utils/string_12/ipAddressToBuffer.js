/**
 * Converts an IPv4 or IPv6 address string to a Buffer representation.
 * Supports IPv4, IPv6, and IPv6-mapped IPv4 addresses.
 *
 * @param {string} ipAddress - The IP address string to convert.
 * @returns {Buffer|null} The Buffer representation of the IP address, or null if invalid.
 */
function ipAddressToBuffer(ipAddress) {
  // Handle IPv4 addresses
  if (mZ1.isIPv4(ipAddress)) {
    return p_0(ipAddress);
  }
  // Handle IPv6-mapped IPv4 addresses (e.g., '::ffff:192.0.2.128')
  else if (kB6(ipAddress)) {
    // Remove the '::ffff:' prefix before processing
    return p_0(ipAddress.substring(7));
  }
  // Handle IPv6 addresses
  else if (mZ1.isIPv6(ipAddress)) {
    // Find the position of the double colon '::', which indicates a zero-compression in IPv6
    const doubleColonIndex = ipAddress.indexOf("::");
    let head = "";
    let tail = "";
    if (doubleColonIndex === -1) {
      // No zero-compression, entire address is the head
      head = ipAddress;
      tail = "";
    } else {
      // Split the address into head and tail around '::'
      head = ipAddress.substring(0, doubleColonIndex);
      tail = ipAddress.substring(doubleColonIndex + 2);
    }
    // Convert head and tail to Buffers
    const headBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(head));
    const tailBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(tail));
    // Allocate a buffer filled with zeros for the compressed section
    const zeroFillLength = 16 - headBuffer.length - tailBuffer.length;
    const zeroFillBuffer = Buffer.alloc(zeroFillLength, 0);
    // Concatenate head, zero fill, and tail to form the full IPv6 buffer
    return Buffer.concat([headBuffer, zeroFillBuffer, tailBuffer]);
  }
  // Return null for invalid or unsupported addresses
  else {
    return null;
  }
}

module.exports = ipAddressToBuffer;