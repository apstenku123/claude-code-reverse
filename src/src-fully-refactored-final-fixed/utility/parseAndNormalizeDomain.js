/**
 * Parses and normalizes a domain string, handling bracketed IPv6 addresses and applying ASCII normalization.
 *
 * @param {string} domainInput - The domain string to parse and normalize. Can be a domain name or an IPv6 address in brackets.
 * @param {boolean} shouldNormalize - If true, applies ASCII normalization to the domain. If false, performs a simple normalization.
 * @returns {string|number|undefined} - The normalized domain string, a number (if parseIPv4LikeStringToNumber returns a number), or U6 (undefined/invalid indicator) on error.
 */
function parseAndNormalizeDomain(domainInput, shouldNormalize) {
  // Handle IPv6 address in brackets (e.g., "[::1]")
  if (domainInput[0] === "[") {
    if (domainInput[domainInput.length - 1] !== "]") {
      // Invalid IPv6 address format
      return U6;
    }
    // Remove brackets and process the IPv6 address
    return parseIPv6Address(domainInput.substring(1, domainInput.length - 1));
  }

  // If normalization is not requested, perform a simple normalization
  if (!shouldNormalize) {
    return decodeUcs2AndTransform(domainInput);
  }

  // Normalize the domain using decodePercentEncodedBuffer and zD2.toASCII
  const normalizedDomain = decodePercentEncodedBuffer(domainInput);
  const asciiDomain = zD2.toASCII(
    normalizedDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If ASCII conversion failed, return invalid indicator
  if (asciiDomain === null) {
    return U6;
  }

  // If the domain is invalid according to Uo6, return invalid indicator
  if (Uo6(asciiDomain)) {
    return U6;
  }

  // Further process the ASCII domain
  const processedDomain = parseIPv4LikeStringToNumber(asciiDomain);

  // If parseIPv4LikeStringToNumber returns a number or the invalid indicator, return isBlobOrFileLikeObject
  if (typeof processedDomain === "number" || processedDomain === U6) {
    return processedDomain;
  }

  // Otherwise, return the normalized ASCII domain
  return asciiDomain;
}

module.exports = parseAndNormalizeDomain;