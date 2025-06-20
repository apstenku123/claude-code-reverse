/**
 * Checks if the provided object is a valid number accessor.
 *
 * a valid number accessor must:
 *   - Not be null
 *   - Be of type 'object'
 *   - Have a 'name' property of type 'string'
 *   - Have a 'lastModified' property of type 'number'
 *   - Pass the custom validation function 'isBlobLikeObject'
 *
 * @param {object} numberAccessor - The object to validate as a number accessor.
 * @returns {boolean} True if the object is a valid number accessor, false otherwise.
 */
function isValidNumberAccessor(numberAccessor) {
  // Ensure the object is not null and is of type 'object'
  if (numberAccessor == null || typeof numberAccessor !== 'object') {
    return false;
  }

  // Check that the 'name' property exists and is a string
  if (typeof numberAccessor.name !== 'string') {
    return false;
  }

  // Check that the 'lastModified' property exists and is a number
  if (typeof numberAccessor.lastModified !== 'number') {
    return false;
  }

  // Perform additional custom validation using isBlobLikeObject
  // (Assumes isBlobLikeObject is a function imported from elsewhere)
  return isBlobLikeObject(numberAccessor);
}

module.exports = isValidNumberAccessor;