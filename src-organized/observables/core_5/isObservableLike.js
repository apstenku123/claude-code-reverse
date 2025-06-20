/**
 * Checks if the provided object conforms to the Observable-like interface.
 * An Observable-like object must have 'next', 'error', and 'complete' methods.
 *
 * @param {object} candidateObservable - The object to check for Observable-like interface.
 * @returns {boolean} True if the object has 'next', 'error', and 'complete' methods; otherwise, false.
 */
function isObservableLike(candidateObservable) {
  // Ensure the object exists and has the required methods
  return (
    !!candidateObservable &&
    gM1.isFunction(candidateObservable.next) &&
    gM1.isFunction(candidateObservable.error) &&
    gM1.isFunction(candidateObservable.complete)
  );
}

module.exports = isObservableLike;