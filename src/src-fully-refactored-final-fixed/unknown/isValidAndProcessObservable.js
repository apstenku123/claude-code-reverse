/**
 * Checks if the provided observable is valid and processes isBlobOrFileLikeObject if so.
 *
 * This function first verifies that the input is a valid observable using the `isObservable` function.
 * If the input is valid, isBlobOrFileLikeObject then processes the observable using the `processObservable` function.
 *
 * @param {any} sourceObservable - The observable to validate and process.
 * @returns {boolean} Returns true if the input is a valid observable and was processed successfully; otherwise, false.
 */
function isValidAndProcessObservable(sourceObservable) {
  // Check if the input is a valid observable and process isBlobOrFileLikeObject if so
  return isObservable(sourceObservable) && processObservable(sourceObservable);
}

module.exports = isValidAndProcessObservable;
