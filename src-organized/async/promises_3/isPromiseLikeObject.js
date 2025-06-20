/**
 * Determines if the provided value is a promise-like object.
 *
 * a value is considered promise-like if:
 *   - It is a non-null object (checked by isNonNullObject)
 *   - It passes the eW check (external predicate, likely type check)
 *   - It has 'then' and 'catch' properties that also pass the eW check (likely are functions)
 *
 * @param {*} possiblePromise - The value to check for promise-like behavior.
 * @returns {boolean} True if the value is promise-like, false otherwise.
 */
function isPromiseLikeObject(possiblePromise) {
  // Check if the value is a non-null object
  if (!isNonNullObject(possiblePromise)) {
    return false;
  }

  // Check if the value passes the eW predicate (external type check)
  if (!eW(possiblePromise)) {
    return false;
  }

  // Check if the 'then' property exists and passes the eW predicate
  if (!eW(possiblePromise.then)) {
    return false;
  }

  // Check if the 'catch' property exists and passes the eW predicate
  if (!eW(possiblePromise.catch)) {
    return false;
  }

  // All checks passed; the value is promise-like
  return true;
}

module.exports = isPromiseLikeObject;