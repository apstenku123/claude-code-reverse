/**
 * Checks if the provided array contains exactly one element and if that element is an observable (as determined by xO9).
 * If so, returns the single observable element; otherwise, returns the original array.
 *
 * @param {Array<any>} possibleObservableArray - An array that may contain a single observable element.
 * @returns {any} The single observable if the array contains exactly one observable element, otherwise the original array.
 */
function unwrapSingleElementIfObservable(possibleObservableArray) {
  // Check if the array has exactly one element and that element is an observable
  if (possibleObservableArray.length === 1 && xO9(possibleObservableArray[0])) {
    return possibleObservableArray[0];
  }
  // Otherwise, return the original array
  return possibleObservableArray;
}

module.exports = unwrapSingleElementIfObservable;