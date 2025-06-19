/**
 * Parses an IPv4 address in CIDR notation (e.g., '192.168.1.1/24') and returns an object with the IP and prefix length.
 *
 * @param {string} cidrString - The IPv4 address in CIDR notation (e.g., '192.168.1.1/24').
 * @returns {{ ip: any, prefixLength: number } | null} An object with the parsed IP and prefix length, or null if invalid.
 */
function parseIPv4CidrNotation(cidrString) {
  // Split the input string into IP and prefix length parts
  const parts = cidrString.split("/");
  if (parts.length !== 2) {
    // Input must contain exactly one '/'
    return null;
  }

  const ipAddress = parts[0];
  const prefixLength = parseInt(parts[1], 10);

  // Validate: IP must be valid IPv4, prefix must be a number between 0 and 32
  if (!Hj0.isIPv4(ipAddress) || Number.isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) {
    return null;
  }

  return {
    ip: wj0(ipAddress), // Convert or process the IP address as needed
    prefixLength: prefixLength
  };
}

module.exports = parseIPv4CidrNotation;