/**
 * Validates and stringifies a UUID using the provided input and optional offset.
 * Throws a TypeError if the resulting stringified UUID is invalid.
 *
 * @param {string} uuidInput - The input value to be stringified and validated as a UUID.
 * @param {number} [offset=0] - Optional offset or configuration value for stringification.
 * @returns {string} The validated, stringified UUID.
 * @throws {TypeError} If the stringified UUID is invalid.
 */
function validateAndStringifyUUID(uuidInput, offset = 0) {
  // Generate a stringified UUID using the external formatUuidFromByteArray function
  const stringifiedUUID = formatUuidFromByteArray(uuidInput, offset);
  // Validate the stringified UUID using mt6.default
  if (!mt6.default(stringifiedUUID)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  // Return the valid, stringified UUID
  return stringifiedUUID;
}

module.exports = validateAndStringifyUUID;