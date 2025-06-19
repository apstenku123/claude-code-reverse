/**
 * Converts an IPv4 or IPv6 address string (optionally with a 'ipv6://' prefix) into a 16-byte Buffer representation.
 * Returns null if the input is not a valid IPv4 or IPv6 address.
 *
 * @param {string} ipAddress - The IP address string to normalize. Can be IPv4, IPv6, or IPv6 with a 'ipv6://' prefix.
 * @returns {Buffer|null} a 16-byte Buffer containing the normalized IP address, or null if invalid.
 */
function normalizeIpAddressToBuffer(ipAddress) {
  // Check if the input is a valid IPv4 address
  if (mZ1.isIPv4(ipAddress)) {
    // Convert IPv4 to buffer using p_0
    return p_0(ipAddress);
  }
  // Check if the input is an IPv6 address with a 'ipv6://' prefix
  else if (kB6(ipAddress)) {
    // Remove the 'ipv6://' prefix and convert to buffer
    return p_0(ipAddress.substring(7));
  }
  // Check if the input is a valid IPv6 address
  else if (mZ1.isIPv6(ipAddress)) {
    // Find the position of the '::' shorthand (if present)
    const doubleColonIndex = ipAddress.indexOf("::");
    let leftPart, rightPart;
    if (doubleColonIndex === -1) {
      // No '::' present; the address is complete
      leftPart = ipAddress;
      rightPart = "";
    } else {
      // Split the address at '::' into left and right parts
      leftPart = ipAddress.substring(0, doubleColonIndex);
      rightPart = ipAddress.substring(doubleColonIndex + 2);
    }
    // Convert both parts to buffers
    const leftBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(leftPart));
    const rightBuffer = Buffer.from(parseAndFlattenColonSeparatedEntries(rightPart));
    // Allocate a buffer of zeros to fill the gap (total length must be 16 bytes)
    const zeroFillBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
    // Concatenate left, zero fill, and right buffers
    return Buffer.concat([leftBuffer, zeroFillBuffer, rightBuffer]);
  } else {
    // Not a valid IPv4 or IPv6 address
    return null;
  }
}

module.exports = normalizeIpAddressToBuffer;