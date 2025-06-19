/**
 * Converts a 32-bit integer to its corresponding IPv4 address string in dot-decimal notation.
 *
 * @param {number} ipAddressInt - The 32-bit integer representing the IPv4 address.
 * @returns {string} The IPv4 address in dot-decimal notation (e.g., '192.168.0.1').
 */
function intToIPv4String(ipAddressInt) {
  let ipv4String = "";
  let remainingValue = ipAddressInt;

  // Extract each of the 4 octets (from least significant to most significant)
  for (let octetIndex = 1; octetIndex <= 4; ++octetIndex) {
    // Get the current octet value (0-255)
    const octet = remainingValue % 256;
    // Prepend the octet to the IPv4 string
    ipv4String = String(octet) + ipv4String;
    // Add a dot separator between octets, except before the first octet
    if (octetIndex !== 4) {
      ipv4String = "." + ipv4String;
    }
    // Prepare for the next octet
    remainingValue = Math.floor(remainingValue / 256);
  }

  return ipv4String;
}

module.exports = intToIPv4String;