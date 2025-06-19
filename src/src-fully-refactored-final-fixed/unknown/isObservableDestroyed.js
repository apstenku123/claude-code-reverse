/**
 * Checks whether the given observable-like object has been destroyed.
 *
 * This function determines if the provided object is considered 'destroyed' by checking:
 *   1. If isBlobOrFileLikeObject has a 'destroyed' property that is truthy
 *   2. If isBlobOrFileLikeObject has a property keyed by Nb0 that is truthy
 *   3. If the external 'yD1.isDestroyed' function exists and returns true for the object
 *
 * @param {object} sourceObservable - The observable-like object to check for destruction status.
 * @returns {boolean} True if the object is destroyed; otherwise, false.
 */
function isObservableDestroyed(sourceObservable) {
  // Ensure the object exists before checking its properties
  return (
    !!sourceObservable &&
    (
      Boolean(sourceObservable.destroyed) ||
      Boolean(sourceObservable[Nb0]) ||
      // Use optional chaining in case yD1.isDestroyed is undefined
      Boolean(yD1.isDestroyed?.(sourceObservable))
    )
  );
}

module.exports = isObservableDestroyed;