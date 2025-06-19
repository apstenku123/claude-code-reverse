/**
 * Checks if the provided object is a valid observable with a registered handler.
 *
 * This function verifies that:
 * 1. The input is an observable (using S7).
 * 2. The observable has a valid length property (using Hy).
 * 3. There is a registered handler for the observable'createInteractionAccessor name (using nW and HB).
 *
 * @param {object} sourceObservable - The object to check for observable validity and handler registration.
 * @returns {boolean} True if the object is a valid observable with a registered handler; otherwise, false.
 */
function isValidObservableWithRegisteredHandler(sourceObservable) {
  // Check if the object is an observable
  const isObservable = S7(sourceObservable);

  // Check if the observable has a valid length property
  const hasValidLength = Hy(sourceObservable.length);

  // Retrieve the observable'createInteractionAccessor name/key
  const observableName = nW(sourceObservable);

  // Check if a handler is registered for this observable
  const hasRegisteredHandler = !!HB[observableName];

  // Return true only if all conditions are met
  return isObservable && hasValidLength && hasRegisteredHandler;
}

module.exports = isValidObservableWithRegisteredHandler;