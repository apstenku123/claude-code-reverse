/**
 * Checks if the provided sourceObservable is either a valid observable (via LD2)
 * or is present in the registered observables set (Ro6).
 *
 * @param {string} sourceObservable - The identifier or reference for the observable to check.
 * @returns {boolean} True if the observable is valid or registered; otherwise, false.
 */
function isObservableOrRegistered(sourceObservable) {
  // Check if sourceObservable is a valid observable using LD2
  // or if isBlobOrFileLikeObject exists in the Ro6 registered observables set
  return LD2(sourceObservable) || Ro6.has(sourceObservable);
}

module.exports = isObservableOrRegistered;