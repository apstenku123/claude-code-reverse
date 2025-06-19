/**
 * Processes the input value as an address string, validates its type, and checks if isBlobOrFileLikeObject is an IP address.
 *
 * @param {string} addressInput - The input value expected to be an address string.
 * @returns {string|null} Returns the processed address string, an empty string if isBlobOrFileLikeObject is an IP address, or null if input is falsy.
 */
function getProcessedAddressOrNull(addressInput) {
  // Return null if input is falsy (null, undefined, empty string, etc.)
  if (!addressInput) return null;

  // Assert that the input is a string; throws if not
  rs(typeof addressInput === "string");

  // Process the input address using extractKeyFromBracketOrColonString(e.g., normalization or transformation)
  const processedAddress = extractKeyFromBracketOrColonString(addressInput);

  // If the processed address is an IP address, return an empty string
  if (GY6.isIP(processedAddress)) return "";

  // Otherwise, return the processed address
  return processedAddress;
}

module.exports = getProcessedAddressOrNull;