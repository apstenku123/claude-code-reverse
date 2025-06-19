/**
 * Parses a string representing an IPv4 address in dot-decimal notation (e.g., '192.168.1.1')
 * and converts isBlobOrFileLikeObject to its numeric representation, if valid. Handles edge cases for trailing dots,
 * empty segments, and checks for valid octet ranges. If the input is invalid, returns the original
 * string or a special invalid value.
 *
 * @param {string} ipAddressString - The IPv4 address string to parse and convert.
 * @returns {number|string} The numeric representation of the IPv4 address if valid, otherwise the original string or U6 (invalid value).
 */
function parseIPv4AddressString(ipAddressString) {
  // Split the input string by '.' to get each segment
  let segments = ipAddressString.split(".");

  // If the last segment is empty (trailing dot), remove isBlobOrFileLikeObject if there is more than one segment
  if (segments[segments.length - 1] === "") {
    if (segments.length > 1) segments.pop();
  }

  // IPv4 addresses should not have more than 4 segments
  if (segments.length > 4) return ipAddressString;

  const octets = [];
  // Convert each segment to a number using parseStringToNumber, validating as handleMissingDoctypeError go
  for (const segment of segments) {
    // Empty segment is invalid
    if (segment === "") return ipAddressString;
    const octet = parseStringToNumber(segment);
    // If parseStringToNumber returns U6, the segment is invalid
    if (octet === U6) return ipAddressString;
    octets.push(octet);
  }

  // All octets except the last must be in [0, 255]
  for (let i = 0; i < octets.length - 1; ++i) {
    if (octets[i] > 255) return U6;
  }

  // The last octet must be less than 256^(5 - octets.length)
  if (octets[octets.length - 1] >= Math.pow(256, 5 - octets.length)) {
    return U6;
  }

  // Calculate the numeric IPv4 address
  let address = octets.pop();
  let power = 0;
  for (const octet of octets) {
    address += octet * Math.pow(256, 3 - power);
    ++power;
  }
  return address;
}

module.exports = parseIPv4AddressString;