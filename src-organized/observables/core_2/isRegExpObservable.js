/**
 * Determines if the provided observable is of type 'RegExp'.
 *
 * @param {any} sourceObservable - The observable or value to check.
 * @returns {boolean} True if the observable is of type 'RegExp', otherwise false.
 */
function isRegExpObservable(sourceObservable) {
  // Delegates the type checking to the 'isObjectType' utility function with 'RegExp' as the type
  return isObjectType(sourceObservable, "RegExp");
}

module.exports = isRegExpObservable;