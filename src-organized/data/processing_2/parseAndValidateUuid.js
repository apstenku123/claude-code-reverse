/**
 * Parses a stringified UUID and validates its format.
 *
 * @param {string} uuidString - The string representation of the UUID to parse and validate.
 * @param {number} [options=0] - Optional parameter for parsing configuration (passed to formatUuidFromByteArray).
 * @returns {string} The validated, parsed UUID string.
 * @throws {TypeError} If the parsed UUID is invalid.
 */
function parseAndValidateUuid(uuidString, options = 0) {
  // Parse the UUID string using the external formatUuidFromByteArray function
  const parsedUuid = formatUuidFromByteArray(uuidString, options);

  // Validate the parsed UUID using mt6.default
  if (!mt6.default(parsedUuid)) {
    throw TypeError("Stringified UUID is invalid");
  }

  // Return the validated UUID
  return parsedUuid;
}

module.exports = parseAndValidateUuid;
