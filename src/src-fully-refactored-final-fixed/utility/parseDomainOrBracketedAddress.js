/**
 * Parses a domain name or a bracketed address (e.g., IPv6) and returns its ASCII representation or a processed value.
 *
 * @param {string} input - The domain name or bracketed address to parse.
 * @param {boolean} [processDomain=false] - Whether to process the domain name (true) or treat as a bracketed address (false).
 * @returns {string|number|undefined} The processed domain or address, or a special error/undefined value if invalid.
 */
function parseDomainOrBracketedAddress(input, processDomain) {
  // Handle bracketed addresses (e.g., [IPv6:...])
  if (input[0] === "[") {
    // If the input does not end with ']', isBlobOrFileLikeObject'createInteractionAccessor invalid
    if (input[input.length - 1] !== "]") return U6;
    // Remove the brackets and process the inner value
    return parseIPv6Address(input.substring(1, input.length - 1));
  }

  // If not processing as a domain, use fallback processing
  if (!processDomain) return decodeUcs2AndTransform(input);

  // Normalize the domain using decodePercentEncodedBuffer
  const normalizedDomain = decodePercentEncodedBuffer(input);
  // Convert the domain to ASCII using zD2.toASCII with NONTRANSITIONAL processing
  const asciiDomain = zD2.toASCII(
    normalizedDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If conversion failed, return error value
  if (asciiDomain === null) return U6;
  // If the ASCII domain is invalid, return error value
  if (Uo6(asciiDomain)) return U6;

  // Further process the ASCII domain
  const processedDomain = parseIPv4LikeStringToNumber(asciiDomain);
  // If the result is a number or error value, return isBlobOrFileLikeObject
  if (typeof processedDomain === "number" || processedDomain === U6) return processedDomain;

  // Otherwise, return the ASCII domain
  return asciiDomain;
}

module.exports = parseDomainOrBracketedAddress;