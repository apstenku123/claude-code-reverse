/**
 * Checks if the given observable is registered either by the LD2 function or within the Ro6 set.
 *
 * @param {string} observableName - The name of the observable to check.
 * @returns {boolean} True if the observable is registered by LD2 or exists in Ro6, otherwise false.
 */
function isObservableRegistered(observableName) {
  // Check if the observable is registered via LD2 or present in the Ro6 set
  return LD2(observableName) || Ro6.has(observableName);
}

module.exports = isObservableRegistered;