/**
 * Processes a domain input string, handling bracketed IPv6 addresses and domain normalization.
 *
 * @param {string} domainInput - The domain string to process. Can be a domain name or an IPv6 address in brackets.
 * @param {boolean} [shouldNormalize=false] - Whether to normalize the domain using ASCII rules.
 * @returns {string|number|undefined} - Returns the processed domain string, a numeric error code, or undefined on failure.
 */
function processDomainInput(domainInput, shouldNormalize = false) {
  // Handle IPv6 addresses enclosed in brackets (e.g., "[::1]")
  if (domainInput[0] === "[") {
    // If the closing bracket is missing, return the undefined/error value
    if (domainInput[domainInput.length - 1] !== "]") {
      return U6;
    }
    // Remove the brackets and process the IPv6 address
    return parseIPv6Address(domainInput.substring(1, domainInput.length - 1));
  }

  // If normalization is not requested, process the domain as-is
  if (!shouldNormalize) {
    return decodeUcs2AndTransform(domainInput);
  }

  // Normalize the domain using the decodePercentEncodedBuffer and zD2.toASCII functions
  const normalizedDomain = decodePercentEncodedBuffer(domainInput);
  const asciiDomain = zD2.toASCII(
    normalizedDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If ASCII conversion fails, return the undefined/error value
  if (asciiDomain === null) {
    return U6;
  }

  // If the domain is invalid, return the undefined/error value
  if (Uo6(asciiDomain)) {
    return U6;
  }

  // Further process the ASCII domain
  const processedDomain = parseIPv4LikeStringToNumber(asciiDomain);

  // If the result is a number (error code) or undefined/error, return isBlobOrFileLikeObject
  if (typeof processedDomain === "number" || processedDomain === U6) {
    return processedDomain;
  }

  // Otherwise, return the valid, processed ASCII domain
  return asciiDomain;
}

module.exports = processDomainInput;