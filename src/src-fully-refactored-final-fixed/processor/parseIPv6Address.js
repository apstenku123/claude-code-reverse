/**
 * Parses a string as an IPv6 address and returns an array of 8 16-bit numbers representing the address.
 * Returns a special error value (U6) if the input is invalid.
 *
 * @param {string} ipv6String - The IPv6 address string to parse (in UCS2 encoding).
 * @returns {number[]|typeof U6} An array of 8 numbers (each 0-65535) representing the IPv6 address, or U6 on error.
 */
function parseIPv6Address(ipv6String) {
  // Initialize the address segments array (8 segments, each 16 bits)
  const addressSegments = [0, 0, 0, 0, 0, 0, 0, 0];
  let segmentIndex = 0; // Current segment being filled
  let doubleColonIndex = null; // Index where '::' was found (for zero compression)
  let charIndex = 0; // Current character index in the input string

  // Decode the input string from UCS2 encoding
  const decoded = Zd.ucs2.decode(ipv6String);

  // Handle leading '::' (zero compression at the start)
  if (decoded[charIndex] === 58 /* ':' */) {
    if (decoded[charIndex + 1] !== 58) return U6; // Invalid if not a double colon
    charIndex += 2;
    ++segmentIndex;
    doubleColonIndex = segmentIndex;
  }

  while (charIndex < decoded.length) {
    if (segmentIndex === 8) return U6; // Too many segments

    // Handle '::' (zero compression)
    if (decoded[charIndex] === 58 /* ':' */) {
      if (doubleColonIndex !== null) return U6; // Only one '::' allowed
      ++charIndex;
      ++segmentIndex;
      doubleColonIndex = segmentIndex;
      continue;
    }

    // Parse up to 4 hex digits for a segment
    let segmentValue = 0;
    let hexDigitCount = 0;
    while (
      hexDigitCount < 4 &&
      isAsciiHexDigit(decoded[charIndex]) // Is this a valid hex digit?
    ) {
      segmentValue = segmentValue * 16 + parseInt(getUnicodeCharacterFromArray(decoded, charIndex), 16);
      ++charIndex;
      ++hexDigitCount;
    }

    // Handle embedded IPv4 address (e.g., ::ffff:192.168.1.1)
    if (decoded[charIndex] === 46 /* '.' */) {
      if (hexDigitCount === 0) return U6; // Must have at least one hex digit before '.'
      charIndex -= hexDigitCount; // Rewind to start of IPv4 part
      if (segmentIndex > 6) return U6; // IPv4 can only fit in last 2 segments
      let ipv4PartIndex = 0;
      while (decoded[charIndex] !== void 0) {
        let ipv4Byte = null;
        // Dots must separate bytes, but not at the start
        if (ipv4PartIndex > 0) {
          if (decoded[charIndex] === 46 /* '.' */ && ipv4PartIndex < 4) {
            ++charIndex;
          } else {
            return U6;
          }
        }
        // Parse decimal digits for each IPv4 byte
        if (!isAsciiDigit(decoded[charIndex])) return U6;
        while (isAsciiDigit(decoded[charIndex])) {
          const digit = parseInt(getUnicodeCharacterFromArray(decoded, charIndex));
          if (ipv4Byte === null) {
            ipv4Byte = digit;
          } else if (ipv4Byte === 0) {
            return U6;
          } else {
            ipv4Byte = ipv4Byte * 10 + digit;
          }
          if (ipv4Byte > 255) return U6;
          ++charIndex;
        }
        // Store the IPv4 byte in the correct segment
        addressSegments[segmentIndex] = addressSegments[segmentIndex] * 256 + ipv4Byte;
        ++ipv4PartIndex;
        if (ipv4PartIndex === 2 || ipv4PartIndex === 4) ++segmentIndex;
      }
      if (ipv4PartIndex !== 4) return U6; // Must have exactly 4 IPv4 bytes
      break; // IPv4 ends the address
    } else if (decoded[charIndex] === 58 /* ':' */) {
      ++charIndex;
      if (decoded[charIndex] === void 0) return U6; // Trailing ':' is invalid
    } else if (decoded[charIndex] !== void 0) {
      return U6; // Invalid character
    }
    addressSegments[segmentIndex] = segmentValue;
    ++segmentIndex;
  }

  // Handle zero compression ('::') by shifting segments as needed
  if (doubleColonIndex !== null) {
    let numToMove = segmentIndex - doubleColonIndex;
    let lastIndex = 7;
    while (lastIndex !== 0 && numToMove > 0) {
      // Move segments after '::' to the end
      const temp = addressSegments[doubleColonIndex + numToMove - 1];
      addressSegments[doubleColonIndex + numToMove - 1] = addressSegments[lastIndex];
      addressSegments[lastIndex] = temp;
      --lastIndex;
      --numToMove;
    }
  } else if (doubleColonIndex === null && segmentIndex !== 8) {
    // If no '::' and not exactly 8 segments, invalid
    return U6;
  }

  return addressSegments;
}

module.exports = parseIPv6Address;