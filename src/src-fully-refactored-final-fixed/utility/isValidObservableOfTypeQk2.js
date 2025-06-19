/**
 * Checks if the provided observable is valid and of the specific type 'qk2'.
 *
 * This utility function first verifies that the given observable passes the S7 validation,
 * and then checks if its type (as determined by nW) matches the constant qk2.
 *
 * @param {Object} sourceObservable - The observable object to validate and check type for.
 * @returns {boolean} True if the observable is valid and of type 'qk2', otherwise false.
 */
function isValidObservableOfTypeQk2(sourceObservable) {
  // Validate the observable using S7
  const isValid = S7(sourceObservable);

  // Determine the type of the observable using nW
  const observableType = nW(sourceObservable);

  // Check if the observable is valid and of the required type
  return isValid && observableType === qk2;
}

module.exports = isValidObservableOfTypeQk2;