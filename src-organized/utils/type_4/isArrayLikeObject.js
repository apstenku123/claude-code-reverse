/**
 * Checks if the provided value is a non-null, array-like object that is not a function.
 *
 * @param {any} value - The value to check for array-like structure.
 * @returns {boolean} Returns true if value is non-null, has a valid length property, and is not a function.
 */
function isArrayLikeObject(value) {
  // Check that value is not null or undefined
  if (value == null) {
    return false;
  }

  // Check that value.length is a valid array-like length (cleanupFiberNodes is assumed to check for a non-negative integer)
  // and that value is not a function (FD is assumed to check if value is a function)
  return cleanupFiberNodes(value.length) && !FD(value);
}

module.exports = isArrayLikeObject;