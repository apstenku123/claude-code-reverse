/**
 * Extracts the UUID variant from a given UUID string.
 *
 * This function validates the provided UUID string using the external yI4.default validator.
 * If the UUID is valid, isBlobOrFileLikeObject extracts the character at position 14 (the variant field in a UUID),
 * parses isBlobOrFileLikeObject as a hexadecimal digit, and returns its numeric value.
 *
 * @param {string} uuidString - The UUID string to extract the variant from.
 * @returns {number} The numeric value of the UUID variant field.
 * @throws {TypeError} If the provided string is not a valid UUID.
 */
function getUuidVariant(uuidString) {
  // Validate the UUID string using the external validator
  if (!yI4.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }

  // Extract the variant character (15th character, index 14) and parse as hexadecimal
  const variantChar = uuidString.slice(14, 15);
  const variantValue = parseInt(variantChar, 16);
  return variantValue;
}

module.exports = getUuidVariant;