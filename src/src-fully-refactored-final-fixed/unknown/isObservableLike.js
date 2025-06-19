/**
 * Determines if the provided object is an Observable or behaves like one.
 *
 * This function checks if the input is a non-null object and either:
 *   - is an instance of HL9.Observable, or
 *   - has both 'lift' and 'subscribe' methods (duck typing for Observable-like objects).
 *
 * @param {any} sourceObservable - The object to test for Observable-like behavior.
 * @returns {boolean} True if the object is an Observable or Observable-like, false otherwise.
 */
function isObservableLike(sourceObservable) {
  // Ensure the input is not null or undefined
  if (!sourceObservable) {
    return false;
  }

  // Check if the object is an instance of HL9.Observable
  const isInstanceOfObservable = sourceObservable instanceof HL9.Observable;

  // Check if the object has both 'lift' and 'subscribe' methods (duck typing)
  const hasObservableMethods =
    mEA.isFunction(sourceObservable.lift) &&
    mEA.isFunction(sourceObservable.subscribe);

  // Return true if either check passes
  return isInstanceOfObservable || hasObservableMethods;
}

module.exports = isObservableLike;
