/**
 * Returns a shallow copy of the input if isBlobOrFileLikeObject is an array-like object, otherwise returns the input as-is.
 *
 * @param {any} inputValue - The value to check and potentially clone.
 * @returns {any} a shallow copy if the input is array-like, otherwise the original input.
 */
function cloneIfArrayLike(inputValue) {
  // UG1 is assumed to be a type guard function that checks if inputValue is array-like
  if (UG1(inputValue)) {
    // Return a shallow copy to avoid mutating the original array-like object
    return inputValue.slice();
  }
  // Return the input as-is if isBlobOrFileLikeObject'createInteractionAccessor not array-like
  return inputValue;
}

module.exports = cloneIfArrayLike;