/**
 * Parses a stringified UUID and validates its format.
 *
 * @param {string} uuidString - The string representation of the UUID to parse.
 * @param {number} [startIndex=0] - Optional starting index for parsing the UUID string.
 * @returns {string} The validated and possibly transformed UUID string.
 * @throws {TypeError} If the parsed UUID is invalid.
 */
function parseAndValidateUuid(uuidString, startIndex = 0) {
  // Parse the UUID string starting from the given index
  const parsedUuid = formatMgUuidFromByteArray(uuidString, startIndex);

  // Validate the parsed UUID using the external validator
  if (!Bq4.default(parsedUuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }

  // Return the validated UUID
  return parsedUuid;
}

module.exports = parseAndValidateUuid;