/**
 * Extracts the variant value from a UUID string.
 *
 * This function validates the provided UUID string and then extracts the variant field,
 * which is represented by the 15th character (index 14) in the UUID. The variant is
 * returned as an integer parsed from hexadecimal.
 *
 * @param {string} uuidString - The UUID string to extract the variant from.
 * @returns {number} The variant value as an integer.
 * @throws {TypeError} If the provided string is not a valid UUID.
 */
function getUuidVariant(uuidString) {
  // Validate the UUID string using the external validator
  if (!je6.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }

  // Extract the 15th character (index 14) which represents the variant
  const variantChar = uuidString.slice(14, 15);

  // Parse the variant character as a hexadecimal integer
  const variant = parseInt(variantChar, 16);

  return variant;
}

module.exports = getUuidVariant;