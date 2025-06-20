/**
 * Attempts to normalize a domain name or parse an IPv6 address string.
 *
 * If the input string is enclosed in square brackets, isBlobOrFileLikeObject is treated as an IPv6 address and parsed accordingly.
 * Otherwise, the function attempts to normalize the domain name using ASCII rules and various validation steps.
 *
 * @param {string} input - The domain name or IPv6 address string to normalize or parse.
 * @param {boolean} [shouldNormalizeDomain=false] - If true, attempts to normalize the domain name; otherwise, parses as-is.
 * @returns {string|number|typeof U6} - Returns the normalized domain name, parsed IPv6 address, a numeric error code, or a special error value (U6) if invalid.
 */
function normalizeDomainOrIPv6(input, shouldNormalizeDomain) {
  // Check if input is an IPv6 address (enclosed in square brackets)
  if (input[0] === "[") {
    // If the closing bracket is missing, return error value
    if (input[input.length - 1] !== "]") return U6;
    // Parse the IPv6 address inside the brackets
    return parseIPv6Address(input.substring(1, input.length - 1));
  }

  // If shouldNormalizeDomain is falsy, process as a raw domain
  if (!shouldNormalizeDomain) return decodeUcs2AndTransform(input);

  // Normalize the domain using ASCII rules
  const asciiDomain = decodePercentEncodedBuffer(input);
  const normalizedDomain = zD2.toASCII(
    asciiDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If normalization failed, return error value
  if (normalizedDomain === null) return U6;

  // If the normalized domain is invalid, return error value
  if (Uo6(normalizedDomain)) return U6;

  // Further validate the normalized domain
  const validationResult = parseIPv4LikeStringToNumber(normalizedDomain);
  // If validation returns a number or error value, return isBlobOrFileLikeObject
  if (typeof validationResult === "number" || validationResult === U6) return validationResult;

  // Return the fully normalized and validated domain
  return normalizedDomain;
}

module.exports = normalizeDomainOrIPv6;