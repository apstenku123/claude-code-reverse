/**
 * Validates and parses a stringified UUID.
 *
 * This function attempts to parse the provided string as a UUID using the `parseUuid` function.
 * It then validates the parsed result using the `isValidUuid` utility. If the UUID is invalid,
 * a TypeError is thrown.
 *
 * @param {string} uuidString - The string representation of the UUID to validate and parse.
 * @param {number} [parseOptions=0] - Optional parsing options to pass to the parser.
 * @returns {string} The validated and parsed UUID string.
 * @throws {TypeError} If the provided string is not a valid UUID.
 */
function validateAndParseUuid(uuidString, parseOptions = 0) {
  // Parse the UUID string using the provided options
  const parsedUuid = parseUuid(uuidString, parseOptions);
  // Validate the parsed UUID using the external validator
  if (!isValidUuid.default(parsedUuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return parsedUuid;
}

module.exports = validateAndParseUuid;