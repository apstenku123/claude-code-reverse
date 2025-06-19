/**
 * Determines if the provided observable emits values at a frequency of at least 500ms.
 *
 * This function delegates to the external `getObservableFrequency` function (originally `getHttpStatusCode`),
 * which should return the emission frequency (in milliseconds) of the given observable.
 *
 * @param {Observable} sourceObservable - The observable whose emission frequency is to be checked.
 * @returns {boolean} Returns true if the observable emits at least every 500ms, false otherwise.
 */
function isObservableEmittingFrequently(sourceObservable) {
  // Check if the observable'createInteractionAccessor emission frequency is at least 500ms
  return getObservableFrequency(sourceObservable) >= 500;
}

module.exports = isObservableEmittingFrequently;