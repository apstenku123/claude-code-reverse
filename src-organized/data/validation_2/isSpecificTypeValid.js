/**
 * Checks if the provided value is valid and matches one of the specific allowed types.
 *
 * @param {any} value - The value to validate and check its type.
 * @returns {boolean} True if the value is valid and its type matches one of the allowed types; otherwise, false.
 */
function isSpecificTypeValid(value) {
  // First, check if the value passes the validity check
  if (!isValueValid(value)) return false;

  // Retrieve the type identifier for the value
  const typeIdentifier = getTypeIdentifier(value);

  // Check if the type identifier matches any of the allowed types
  return (
    typeIdentifier === ALLOWED_TYPE_1 ||
    typeIdentifier === ALLOWED_TYPE_2 ||
    typeIdentifier === ALLOWED_TYPE_3 ||
    typeIdentifier === ALLOWED_TYPE_4
  );
}

module.exports = isSpecificTypeValid;
