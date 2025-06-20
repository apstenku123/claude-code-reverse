/**
 * Parses the input value into a UUID string and validates its format.
 *
 * @param {string} uuidString - The string to be parsed and validated as a UUID.
 * @param {number} [parseMode=0] - Optional parsing mode or configuration flag for parsing.
 * @returns {string} The validated UUID string.
 * @throws {TypeError} If the parsed string is not a valid UUID.
 */
function parseAndValidateUuidString(uuidString, parseMode = 0) {
  // Parse the input string into a UUID using the formatMgUuidFromByteArray utility function
  const parsedUuid = formatMgUuidFromByteArray(uuidString, parseMode);

  // Validate the parsed UUID using Bq4'createInteractionAccessor default validation method
  if (!Bq4.default(parsedUuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }

  // Return the validated UUID string
  return parsedUuid;
}

module.exports = parseAndValidateUuidString;