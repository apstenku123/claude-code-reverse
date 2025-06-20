/**
 * Checks if the provided value is an observable or is registered in the Lo6 registry.
 *
 * @param {any} candidateObservable - The value to check for observability or registration.
 * @returns {boolean} True if the value is an observable or is registered; otherwise, false.
 */
function isObservableOrRegistered(candidateObservable) {
  // Check if the value is an observable using isNonPrintableAsciiCode
  // If not, check if isBlobOrFileLikeObject exists in the Lo6 registry
  return isNonPrintableAsciiCode(candidateObservable) || Lo6.has(candidateObservable);
}

module.exports = isObservableOrRegistered;