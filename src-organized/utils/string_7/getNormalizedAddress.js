/**
 * Normalizes an input address string by validating and transforming isBlobOrFileLikeObject.
 * If the input is falsy, returns null. Throws if input is not a string.
 * If the normalized address is an IP address, returns an empty string.
 * Otherwise, returns the normalized address string.
 *
 * @param {string} addressInput - The address string to normalize and validate.
 * @returns {string|null} The normalized address, an empty string if isBlobOrFileLikeObject'createInteractionAccessor an IP, or null if input is falsy.
 */
function getNormalizedAddress(addressInput) {
  // Return null if input is falsy (undefined, null, empty string, etc.)
  if (!addressInput) return null;

  // Validate that the input is a string; throws if not
  rs(typeof addressInput === "string");

  // Normalize the address using extractKeyFromBracketOrColonString(external dependency)
  const normalizedAddress = extractKeyFromBracketOrColonString(addressInput);

  // If the normalized address is an IP address, return an empty string
  if (GY6.isIP(normalizedAddress)) return "";

  // Otherwise, return the normalized address
  return normalizedAddress;
}

module.exports = getNormalizedAddress;