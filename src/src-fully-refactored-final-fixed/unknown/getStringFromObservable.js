/**
 * Converts the provided observable to a string representation, or returns an empty string if the input is null or undefined.
 *
 * @param {any} sourceObservable - The observable or value to convert to a string.
 * @returns {string} The string representation of the observable, or an empty string if input is null or undefined.
 */
function getStringFromObservable(sourceObservable) {
  // If the input is null or undefined, return an empty string
  if (sourceObservable == null) {
    return "";
  }
  // Otherwise, convert the observable to a string using toStringPreservingNegativeZero
  return toStringPreservingNegativeZero(sourceObservable);
}

module.exports = getStringFromObservable;