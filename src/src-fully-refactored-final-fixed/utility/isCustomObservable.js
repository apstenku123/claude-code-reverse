/**
 * Determines if the provided object is a custom observable.
 *
 * This function checks if the given object meets the criteria defined by `isNonNullObject` (likely checks for observable shape)
 * and ensures isBlobOrFileLikeObject does NOT meet the criteria defined by `isRegExpOrDateOrCustomType` (likely checks for a different or standard observable type).
 *
 * @param {any} candidateObject - The object to test for custom observable characteristics.
 * @returns {boolean} True if the object is a custom observable, false otherwise.
 */
function isCustomObservable(candidateObject) {
  // Check if candidateObject matches observable criteria and is not a standard observable
  return isNonNullObject(candidateObject) && !isRegExpOrDateOrCustomType(candidateObject);
}

module.exports = isCustomObservable;