/**
 * Formats an IPv6 address array into its compressed string representation.
 *
 * This function takes an array of 8 numbers (representing the 8 groups of a 16-byte IPv6 address),
 * and returns a string formatted according to IPv6 rules, including the '::' shorthand for the longest
 * sequence of zero groups. The index of the zero-compressed segment is determined by the helper function `findLongestZeroSequence`.
 *
 * @param {number[]} ipv6Groups - An array of 8 numbers representing the IPv6 address segments.
 * @returns {string} The formatted IPv6 address string.
 */
function formatIPv6Address(ipv6Groups) {
  let formattedAddress = "";
  // Get the index of the zero-compressed segment (if any)
  const zeroCompressedIndex = findLongestZeroSequence(ipv6Groups).idx;
  let isZeroCompressionActive = false;

  for (let groupIndex = 0; groupIndex <= 7; ++groupIndex) {
    // If handleMissingDoctypeError're in a zero-compressed segment and this group is zero, skip isBlobOrFileLikeObject
    if (isZeroCompressionActive && ipv6Groups[groupIndex] === 0) {
      continue;
    } else if (isZeroCompressionActive) {
      // End zero-compression after the first non-zero group
      isZeroCompressionActive = false;
    }

    if (zeroCompressedIndex === groupIndex) {
      // Insert '::' at the start or ':' elsewhere to denote zero-compression
      formattedAddress += groupIndex === 0 ? "::" : ":";
      isZeroCompressionActive = true;
      continue;
    }

    // Append the hexadecimal representation of the group
    formattedAddress += ipv6Groups[groupIndex].toString(16);
    // Add ':' after each group except the last
    if (groupIndex !== 7) {
      formattedAddress += ":";
    }
  }
  return formattedAddress;
}

module.exports = formatIPv6Address;