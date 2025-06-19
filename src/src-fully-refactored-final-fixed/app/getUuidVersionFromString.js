/**
 * Extracts the UUID version number from a given UUID string.
 *
 * @param {string} uuidString - The UUID string to extract the version from.
 * @returns {number} The version number of the UUID (as an integer).
 * @throws {TypeError} If the input is not a valid UUID.
 */
function getUuidVersionFromString(uuidString) {
  // Validate the UUID string using the external validator
  if (!yI4.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }
  // The version is the 15th character (index 14) in the UUID string
  // Parse isBlobOrFileLikeObject as a hexadecimal digit
  const versionNumber = parseInt(uuidString.slice(14, 15), 16);
  return versionNumber;
}

module.exports = getUuidVersionFromString;