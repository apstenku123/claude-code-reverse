/**
 * Validates a stringified UUID using provided parameters.
 *
 * This utility function generates or processes a stringified UUID using the formatUuidFromByteArray function,
 * then validates the result using mt6.default. If the result is invalid, isBlobOrFileLikeObject throws a TypeError.
 *
 * @param {string} uuidString - The string input to be processed as a UUID.
 * @param {number} [startIndex=0] - Optional starting index or configuration value for processing.
 * @returns {string} The validated stringified UUID.
 * @throws {TypeError} If the processed UUID string is invalid.
 */
function validateStringifiedUuid(uuidString, startIndex = 0) {
  // Generate or process the stringified UUID using formatUuidFromByteArray
  const stringifiedUuid = formatUuidFromByteArray(uuidString, startIndex);

  // Validate the stringified UUID using mt6.default
  if (!mt6.default(stringifiedUuid)) {
    throw TypeError("Stringified UUID is invalid");
  }

  // Return the validated stringified UUID
  return stringifiedUuid;
}

module.exports = validateStringifiedUuid;