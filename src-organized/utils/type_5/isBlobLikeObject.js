/**
 * Checks if the provided value is a Blob-like object.
 *
 * a Blob-like object is defined as an object that:
 *   - Is not null
 *   - Is of type 'object'
 *   - Has a numeric 'size' property
 *   - Has a string 'type' property
 *   - Has 'text', 'slice', and 'arrayBuffer' methods
 *
 * @param {any} value - The value to check for Blob-like structure.
 * @returns {boolean} True if the value matches the Blob-like structure, false otherwise.
 */
const isBlobLikeObject = (value) => {
  // Ensure value is not null and is an object
  if (value == null || typeof value !== 'object') {
    return false;
  }

  // Check for numeric 'size' property
  if (typeof value.size !== 'number') {
    return false;
  }

  // Check for string 'type' property
  if (typeof value.type !== 'string') {
    return false;
  }

  // Check for required methods: 'text', 'slice', 'arrayBuffer'
  if (
    typeof value.text !== 'function' ||
    typeof value.slice !== 'function' ||
    typeof value.arrayBuffer !== 'function'
  ) {
    return false;
  }

  // All checks passed; value is Blob-like
  return true;
};

module.exports = isBlobLikeObject;
