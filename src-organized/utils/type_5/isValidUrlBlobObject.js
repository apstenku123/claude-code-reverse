/**
 * Checks whether the provided object is a valid URL/blob accessor object.
 *
 * The object is considered valid if:
 *   - It is not null
 *   - It is of type 'object'
 *   - It has a 'url' property of type 'string'
 *   - It has a 'blob' property that is a function
 *
 * @param {object} candidateObject - The object to validate.
 * @returns {boolean} True if the object meets all criteria, false otherwise.
 */
const isValidUrlBlobObject = (candidateObject) => {
  // Ensure the object is not null and is of type 'object'
  if (candidateObject == null || typeof candidateObject !== 'object') {
    return false;
  }

  // Check that 'url' is a string property
  if (typeof candidateObject.url !== 'string') {
    return false;
  }

  // Check that 'blob' is a function property
  if (typeof candidateObject.blob !== 'function') {
    return false;
  }

  // All checks passed
  return true;
};

module.exports = isValidUrlBlobObject;
