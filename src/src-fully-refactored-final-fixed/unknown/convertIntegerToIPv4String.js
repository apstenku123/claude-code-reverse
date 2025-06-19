/**
 * Converts a 32-bit integer to its corresponding IPv4 address string in dotted-decimal notation.
 *
 * @param {number} integerValue - The 32-bit integer to convert to an IPv4 address.
 * @returns {string} The IPv4 address in dotted-decimal notation (e.g., '192.168.1.1').
 */
function convertIntegerToIPv4String(integerValue) {
  let ipv4String = "";
  let remainingValue = integerValue;

  // Extract each of the 4 octets (from least significant to most significant)
  for (let octetIndex = 1; octetIndex <= 4; ++octetIndex) {
    // Get the current octet (last 8 bits)
    const octet = String(remainingValue % 256);
    // Prepend the octet to the IPv4 string, adding a dot if not the last octet
    ipv4String = octet + ipv4String;
    if (octetIndex !== 4) {
      ipv4String = "." + ipv4String;
    }
    // Shift right by 8 bits to process the next octet
    remainingValue = Math.floor(remainingValue / 256);
  }

  return ipv4String;
}

module.exports = convertIntegerToIPv4String;