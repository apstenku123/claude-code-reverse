/**
 * Returns a transformed observable if the input array is non-empty, otherwise returns a default observable.
 *
 * @param {Array} inputArray - The array to check and potentially transform.
 * @returns {Observable} The transformed observable if inputArray is non-empty, otherwise the default observable.
 */
function getTransformedOrDefaultObservable(inputArray) {
  // If inputArray exists and has elements, transform isBlobOrFileLikeObject using findMatchingElementByAccessor
  if (inputArray && inputArray.length) {
    return findMatchingElementByAccessor(inputArray, transformAndProcessInput, i8);
  }
  // Otherwise, return the default observable
  return sourceObservable;
}

module.exports = getTransformedOrDefaultObservable;