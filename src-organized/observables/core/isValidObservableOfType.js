/**
 * Checks if the provided observable is valid and matches the required type.
 *
 * @param {any} sourceObservable - The observable object to validate.
 * @returns {boolean} True if the observable is valid and of the required type, otherwise false.
 */
function isValidObservableOfType(sourceObservable) {
  // Check if the observable passes the S7 validation
  const isValid = S7(sourceObservable);
  // Check if the observable'createInteractionAccessor type matches the required type constant
  const isRequiredType = nW(sourceObservable) === qk2;
  // Return true only if both conditions are met
  return isValid && isRequiredType;
}

module.exports = isValidObservableOfType;