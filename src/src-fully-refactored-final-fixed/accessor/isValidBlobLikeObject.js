/**
 * Checks if the provided value is a valid Blob-like object.
 *
 * a valid Blob-like object must:
 *   - Not be null
 *   - Be of type 'object'
 *   - Have a 'name' property of type string
 *   - Have a 'lastModified' property of type number
 *   - Pass the isBlobLikeObject structural check
 *
 * @param {object} value - The value to validate as a Blob-like object.
 * @returns {boolean} True if the value is a valid Blob-like object, false otherwise.
 */
const isValidBlobLikeObject = (value) => {
  // Ensure the value is not null and is an object
  if (value == null || typeof value !== 'object') {
    return false;
  }

  // Check that 'name' is a string
  if (typeof value.name !== 'string') {
    return false;
  }

  // Check that 'lastModified' is a number
  if (typeof value.lastModified !== 'number') {
    return false;
  }

  // Use the dependency to check for Blob-like structure
  // isBlobLikeObject is assumed to be imported or defined elsewhere
  return isBlobLikeObject(value);
};

module.exports = isValidBlobLikeObject;