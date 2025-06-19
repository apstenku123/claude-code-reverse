/**
 * Determines if the provided value is either an observable, a number, or a Date instance.
 *
 * @param {any} value - The value to be checked for validity.
 * @returns {boolean} True if the value is an observable (as determined by isNumberPairArray), a number, or a Date instance; otherwise, false.
 */
function isValidObservableOrPrimitive(value) {
  // Check if value is an observable using isNumberPairArray
  // or if isBlobOrFileLikeObject'createInteractionAccessor a number
  // or if isBlobOrFileLikeObject'createInteractionAccessor an instance of Date
  return isNumberPairArray(value) || typeof value === "number" || value instanceof Date;
}

module.exports = isValidObservableOrPrimitive;