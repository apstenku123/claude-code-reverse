/**
 * Converts an IPv4 or IPv6 address string into a Buffer representation.
 * Handles IPv4, IPv6, and IPv6 addresses with '::' zero-compression.
 * Returns null for invalid or unsupported formats.
 *
 * @param {string} ipAddress - The IP address string to parse.
 * @returns {Buffer|null} Buffer containing the binary representation of the IP address, or null if invalid.
 */
function parseIpAddressToBuffer(ipAddress) {
  // Check if the input is a valid IPv4 address
  if (mZ1.isIPv4(ipAddress)) {
    return p_0(ipAddress);
  }
  // Check if the input is an IPv6 address prefixed with 'ipv6:'
  else if (kB6(ipAddress)) {
    // Remove the 'ipv6:' prefix and process the rest
    return p_0(ipAddress.substring(7));
  }
  // Check if the input is a valid IPv6 address
  else if (mZ1.isIPv6(ipAddress)) {
    // Find the position of '::' (IPv6 zero-compression)
    const doubleColonIndex = ipAddress.indexOf('::');
    let leftPart, rightPart;
    if (doubleColonIndex === -1) {
      // No zero-compression, use the whole address as left part
      leftPart = ipAddress;
      rightPart = '';
    } else {
      // Split address into left and right parts around '::'
      leftPart = ipAddress.substring(0, doubleColonIndex);
      rightPart = ipAddress.substring(doubleColonIndex + 2);
    }
    // Convert left and right parts to Buffers
    const leftBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(leftPart));
    const rightBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(rightPart));
    // Allocate a buffer of zeros to fill the gap (total IPv6 length is 16 bytes)
    const zeroFillBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
    // Concatenate left, zero-fill, and right buffers
    return Buffer.concat([leftBuffer, zeroFillBuffer, rightBuffer]);
  } else {
    // Not a valid IPv4 or IPv6 address
    return null;
  }
}

module.exports = parseIpAddressToBuffer;