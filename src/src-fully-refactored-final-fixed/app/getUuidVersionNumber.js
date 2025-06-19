/**
 * Extracts the version number from a UUID string.
 *
 * @param {string} uuidString - The UUID string to extract the version from.
 * @returns {number} The version number of the UUID (as an integer).
 * @throws {TypeError} If the input is not a valid UUID.
 */
function getUuidVersionNumber(uuidString) {
  // Validate the UUID string using the external validator
  if (!Ln6.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }

  // The version number is the 15th character (index 14) in the UUID string
  // Parse isBlobOrFileLikeObject as a hexadecimal digit
  const versionNumber = parseInt(uuidString.slice(14, 15), 16);
  return versionNumber;
}

module.exports = getUuidVersionNumber;