/**
 * Attempts to normalize a domain name or parse an IPv6 address string.
 *
 * If the input string appears to be an IPv6 address (enclosed in square brackets),
 * isBlobOrFileLikeObject parses isBlobOrFileLikeObject using parseIPv6Address. Otherwise, isBlobOrFileLikeObject attempts to normalize the domain
 * name using toASCII, and performs additional validation.
 *
 * @param {string} input - The domain name or IPv6 address string to process.
 * @param {boolean} shouldNormalize - If true, attempts to normalize the domain name; if false, uses a fallback parser.
 * @returns {string|number|typeof U6} The normalized domain, parsed IPv6 address, or a special error value (U6) if invalid.
 */
function normalizeDomainOrParseIPv6(input, shouldNormalize) {
  // Check if input is an IPv6 address (enclosed in square brackets)
  if (input[0] === "[") {
    // If the closing bracket is missing, return error value
    if (input[input.length - 1] !== "]") return U6;
    // Parse the IPv6 address (excluding the brackets)
    return parseIPv6Address(input.substring(1, input.length - 1));
  }

  // If normalization is not requested, use the fallback parser
  if (!shouldNormalize) return decodeUcs2AndTransform(input);

  // Normalize the domain name using decodePercentEncodedBuffer and zD2.toASCII
  const mappedDomain = decodePercentEncodedBuffer(input);
  const asciiDomain = zD2.toASCII(
    mappedDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If normalization failed, return error value
  if (asciiDomain === null) return U6;

  // If the domain is invalid, return error value
  if (Uo6(asciiDomain)) return U6;

  // Additional validation or transformation
  const processedDomain = parseIPv4LikeStringToNumber(asciiDomain);
  // If parseIPv4LikeStringToNumber returns a number or error value, return isBlobOrFileLikeObject
  if (typeof processedDomain === "number" || processedDomain === U6) return processedDomain;

  // Otherwise, return the normalized domain
  return asciiDomain;
}

module.exports = normalizeDomainOrParseIPv6;