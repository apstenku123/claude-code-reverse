/**
 * Extracts the numeric 'code' property from an error-like object, if present.
 *
 * @param {object} possibleErrorObject - The object to check for a numeric 'code' property.
 * @returns {number|null} The numeric code if found, otherwise null.
 */
function extractErrorCode(possibleErrorObject) {
  // Check if the input is a non-null object and has a numeric 'code' property
  if (
    typeof possibleErrorObject === "object" &&
    possibleErrorObject !== null &&
    "code" in possibleErrorObject &&
    typeof possibleErrorObject.code === "number"
  ) {
    return possibleErrorObject.code;
  }
  // Return null if the conditions are not met
  return null;
}

module.exports = extractErrorCode;
