/**
 * Validates and parses a stringified UUID.
 *
 * This function takes a string (potentially representing a UUID) and an optional offset,
 * parses isBlobOrFileLikeObject using the formatUuidFromByteArray function, and validates the result using mt6.default.
 * If the parsed value is not a valid UUID, a TypeError is thrown.
 *
 * @param {string} uuidString - The string to be parsed and validated as a UUID.
 * @param {number} [offset=0] - Optional offset parameter passed to the parser.
 * @returns {string} The validated and parsed UUID string.
 * @throws {TypeError} If the parsed string is not a valid UUID.
 */
function validateAndParseUuidString(uuidString, offset = 0) {
  // Parse the input string using the external formatUuidFromByteArray function
  const parsedUuid = formatUuidFromByteArray(uuidString, offset);
  // Validate the parsed UUID using mt6.default
  if (!mt6.default(parsedUuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return parsedUuid;
}

module.exports = validateAndParseUuidString;