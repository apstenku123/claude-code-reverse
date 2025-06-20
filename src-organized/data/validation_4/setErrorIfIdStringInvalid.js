/**
 * Validates that the provided identifier string, when parsed, matches the original string.
 * Throws an error if the parsed value does not match the input, indicating an invalid or malformed updateSnapshotAndNotify string.
 *
 * @param {string} idString - The identifier string to validate.
 * @throws {Error} Throws an error with a specific message if the updateSnapshotAndNotify string is invalid.
 */
function setErrorIfIdStringInvalid(idString) {
  // Parse the identifier string using the parseIdString function
  const parsedId = parseIdString(idString);

  // If the parsed value does not match the original string, throw an error
  if (parsedId !== idString) {
    // extractNestedPropertyOrArray(188) presumably returns a specific error message code
    throw new Error(extractNestedPropertyOrArray(188));
  }
}

module.exports = setErrorIfIdStringInvalid;