/**
 * Converts an IPv4 address string (e.g., "192.168.1.1") into a Buffer containing its byte representation.
 *
 * @param {string} ipv4Address - The IPv4 address in dot-decimal notation (e.g., "192.168.1.1").
 * @returns {Buffer} a Buffer containing the 4 bytes of the IPv4 address.
 */
function ipv4StringToBuffer(ipv4Address) {
  // Split the IPv4 address string into an array of its octet strings
  const octetStrings = ipv4Address.split(".");

  // Convert each octet string to a number (byte)
  const octetNumbers = octetStrings.map(octet => Number.parseInt(octet, 10));

  // Create a Uint8Array from the array of octet numbers
  const octetBytes = Uint8Array.from(octetNumbers);

  // Create and return a Buffer from the Uint8Array
  return Buffer.from(octetBytes);
}

module.exports = ipv4StringToBuffer;