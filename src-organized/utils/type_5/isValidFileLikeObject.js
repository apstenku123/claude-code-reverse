/**
 * Determines if the provided value is a valid File-like object.
 *
 * Checks that the value is a non-null object, has a string 'name' property,
 * a numeric 'lastModified' property, and passes the isFileLikeObject structural check.
 *
 * @param {any} value - The value to check for File-like object structure.
 * @returns {boolean} True if the value is a valid File-like object, false otherwise.
 */
function isValidFileLikeObject(value) {
  // Ensure the value is a non-null object
  if (value == null || typeof value !== "object") {
    return false;
  }

  // Check for a string 'name' property
  if (typeof value.name !== "string") {
    return false;
  }

  // Check for a numeric 'lastModified' property
  if (typeof value.lastModified !== "number") {
    return false;
  }

  // Use the dependency to check for additional File-like structure
  // (e.g., presence of methods like 'slice', 'size', etc.)
  if (!isFileLikeObject(value)) {
    return false;
  }

  return true;
}

module.exports = isValidFileLikeObject;