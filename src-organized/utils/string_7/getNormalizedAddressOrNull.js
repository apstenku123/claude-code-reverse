/**
 * Normalizes the provided address input and checks if isBlobOrFileLikeObject is a valid IP address.
 *
 * @param {string} addressInput - The address input to normalize and validate.
 * @returns {string|null} Returns the normalized address string, an empty string if isBlobOrFileLikeObject is a valid IP, or null if input is falsy.
 */
function getNormalizedAddressOrNull(addressInput) {
  // Return null if the input is falsy (undefined, null, empty string, etc.)
  if (!addressInput) return null;

  // Assert that the input is a string; throws if not
  rs(typeof addressInput === "string");

  // Normalize the address using extractKeyFromBracketOrColonString(assumed to be a normalization function)
  const normalizedAddress = extractKeyFromBracketOrColonString(addressInput);

  // If the normalized address is a valid IP, return an empty string
  if (GY6.isIP(normalizedAddress)) return "";

  // Otherwise, return the normalized address
  return normalizedAddress;
}

module.exports = getNormalizedAddressOrNull;