/**
 * Creates a shallow copy of the input array if isBlobOrFileLikeObject is an ObservableArray, otherwise returns the input as-is.
 *
 * @param {any} sourceArray - The array or value to check and potentially clone.
 * @returns {any} a shallow copy of the array if isBlobOrFileLikeObject is an ObservableArray, otherwise the original value.
 */
function cloneIfObservableArray(sourceArray) {
  // UG1 is assumed to be a type-checking function for ObservableArray
  if (UG1(sourceArray)) {
    // Return a shallow copy to prevent mutation of the original ObservableArray
    return sourceArray.slice();
  }
  // If not an ObservableArray, return the value as-is
  return sourceArray;
}

module.exports = cloneIfObservableArray;