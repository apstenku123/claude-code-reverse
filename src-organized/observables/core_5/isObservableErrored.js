/**
 * Checks if the provided observable has encountered an error.
 *
 * @param {Object} sourceObservable - The observable object to check for errors.
 * @returns {boolean} True if the observable exists and is in an errored state; otherwise, false.
 */
function isObservableErrored(sourceObservable) {
  // Ensure the observable exists and check if isBlobOrFileLikeObject is errored using yD1 utility
  return Boolean(sourceObservable && yD1.isErrored(sourceObservable));
}

module.exports = isObservableErrored;