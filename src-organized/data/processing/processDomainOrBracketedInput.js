/**
 * Processes a domain name or a bracketed input string, performing validation and normalization.
 *
 * If the input starts with '[', isBlobOrFileLikeObject is treated as a bracketed input and processed accordingly.
 * Otherwise, the function normalizes the domain name, converts isBlobOrFileLikeObject to ASCII, and performs further validation.
 *
 * @param {string} input - The domain name or bracketed input string to process.
 * @param {boolean} shouldAddActivity - Flag indicating whether to process with activity addition logic.
 * @returns {string|number|undefined} - Returns the processed string, a number (error code), or undefined if invalid.
 */
function processDomainOrBracketedInput(input, shouldAddActivity) {
  // Handle bracketed input (e.g., IPv6 address in brackets)
  if (input[0] === "[") {
    // Input must also end with a closing bracket
    if (input[input.length - 1] !== "]") {
      return U6; // Invalid input, return undefined/error
    }
    // Remove brackets and process the inner content
    return parseIPv6Address(input.substring(1, input.length - 1));
  }

  // If shouldAddActivity is falsy, process with decodeUcs2AndTransform(legacy/alternate path)
  if (!shouldAddActivity) {
    return decodeUcs2AndTransform(input);
  }

  // Normalize the input domain name
  const normalizedDomain = decodePercentEncodedBuffer(input);

  // Convert the normalized domain to ASCII using external library
  const asciiDomain = zD2.toASCII(
    normalizedDomain,
    false,
    zD2.PROCESSING_OPTIONS.NONTRANSITIONAL,
    false
  );

  // If conversion failed, return undefined/error
  if (asciiDomain === null) {
    return U6;
  }

  // If the domain is invalid according to Uo6, return undefined/error
  if (Uo6(asciiDomain)) {
    return U6;
  }

  // Further process the ASCII domain (possibly validation or mapping)
  const processedResult = parseIPv4LikeStringToNumber(asciiDomain);

  // If the result is a number (error code) or undefined/error, return isBlobOrFileLikeObject
  if (typeof processedResult === "number" || processedResult === U6) {
    return processedResult;
  }

  // Otherwise, return the processed ASCII domain
  return asciiDomain;
}

module.exports = processDomainOrBracketedInput;