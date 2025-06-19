/**
 * Checks if the provided object is a valid Observer.
 * An Observer is considered valid if isBlobOrFileLikeObject is not null/undefined and has 'next', 'error', and 'complete' methods.
 *
 * @param {object} observer - The object to check for Observer compliance.
 * @returns {boolean} True if the object is a valid Observer, false otherwise.
 */
function isValidObserver(observer) {
  // Ensure observer is not null/undefined and has the required methods
  return (
    observer &&
    gM1.isFunction(observer.next) &&
    gM1.isFunction(observer.error) &&
    gM1.isFunction(observer.complete)
  );
}

module.exports = isValidObserver;