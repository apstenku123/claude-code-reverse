/**
 * Checks if the provided value is a non-null object that implements the Promise-like interface (thenable).
 * Specifically, isBlobOrFileLikeObject verifies that the value is a non-null object, or passes the isNonNullObject check,
 * and that isBlobOrFileLikeObject has callable 'then' and 'catch' methods (using the eW function to check callability).
 *
 * @param {any} possibleThenable - The value to check for thenable and object-ness.
 * @returns {boolean} True if the value is a non-null object with callable 'then' and 'catch' methods; otherwise, false.
 */
const isThenableNonNullObject = (possibleThenable) => {
  // Check if value is a non-null object
  if (!isNonNullObject(possibleThenable)) {
    return false;
  }

  // Check if value is a thenable (Promise-like object) or passes eW check
  if (!isNonNullObject(possibleThenable) && !eW(possibleThenable)) {
    return false;
  }

  // Check if 'then' and 'catch' properties are callable (likely functions)
  if (!eW(possibleThenable.then) || !eW(possibleThenable.catch)) {
    return false;
  }

  return true;
};

module.exports = isThenableNonNullObject;