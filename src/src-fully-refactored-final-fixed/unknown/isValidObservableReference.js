/**
 * Checks if the provided object is a valid observable reference.
 *
 * This function verifies that:
 *   1. The input is a valid observable (using S7).
 *   2. The observable has a valid length property (using Hy).
 *   3. The observable'createInteractionAccessor name (via nW) exists as a key in the HB registry.
 *
 * @param {object} observableCandidate - The object to validate as an observable reference.
 * @returns {boolean} True if the object is a valid observable reference, false otherwise.
 */
function isValidObservableReference(observableCandidate) {
  // Check if the input is a valid observable
  const isObservable = S7(observableCandidate);
  // Check if the observable has a valid length property
  const hasValidLength = Hy(observableCandidate.length);
  // Get the observable'createInteractionAccessor name/key
  const observableName = nW(observableCandidate);
  // Check if the observable name exists in the HB registry
  const isRegistered = !!HB[observableName];

  return isObservable && hasValidLength && isRegistered;
}

module.exports = isValidObservableReference;