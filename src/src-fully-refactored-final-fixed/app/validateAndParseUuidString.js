/**
 * Validates and parses a stringified UUID. Throws an error if the UUID is invalid.
 *
 * @param {string} uuidString - The stringified UUID to validate and parse.
 * @param {number} [startIndex=0] - Optional starting index for parsing the UUID.
 * @returns {string} The validated and parsed UUID string.
 * @throws {TypeError} If the provided string is not a valid UUID.
 */
function validateAndParseUuidString(uuidString, startIndex = 0) {
  // Parse the UUID string starting from the specified index
  const parsedUuid = formatUuidFromByteArray(uuidString, startIndex);
  // Validate the parsed UUID using the external validator
  if (!yi6.default(parsedUuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return parsedUuid;
}

module.exports = validateAndParseUuidString;