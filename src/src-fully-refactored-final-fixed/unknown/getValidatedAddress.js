/**
 * Validates and processes an input address string.
 *
 * This function checks if the provided address is valid, ensures isBlobOrFileLikeObject is a string,
 * normalizes or transforms isBlobOrFileLikeObject using `extractKeyFromBracketOrColonString`, and then checks if the result is an IP address.
 * If the input is falsy, returns null. If the normalized address is an IP, returns an empty string.
 * Otherwise, returns the normalized address.
 *
 * @param {string} addressInput - The address to validate and process.
 * @returns {string|null} The normalized address, an empty string if isBlobOrFileLikeObject'createInteractionAccessor an IP, or null if input is falsy.
 */
function getValidatedAddress(addressInput) {
  // Return null if the input is falsy (undefined, null, empty string, etc.)
  if (!addressInput) return null;

  // Ensure the input is a string; throws if not
  rs(typeof addressInput === "string");

  // Normalize or transform the address using extractKeyFromBracketOrColonString
  const normalizedAddress = extractKeyFromBracketOrColonString(addressInput);

  // If the normalized address is an IP address, return an empty string
  if (GY6.isIP(normalizedAddress)) return "";

  // Otherwise, return the normalized address
  return normalizedAddress;
}

module.exports = getValidatedAddress;