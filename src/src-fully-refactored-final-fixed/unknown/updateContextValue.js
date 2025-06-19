/**
 * Updates the current value of a context object and notifies listeners of the change.
 *
 * Depending on the value of the global flag `isPrimaryContext`, isBlobOrFileLikeObject updates either the primary or secondary value
 * of the provided context object, and notifies listeners using the `notifyListeners` function.
 *
 * @param {Object} contextObject - The context object whose value should be updated. Must have `_currentValue` and `_currentValue2` properties.
 * @param {Object} contextType - The context type object containing the current value(createInteractionAccessor) to be updated.
 * @param {any} newValue - The new value to set for the context.
 * @returns {void}
 */
function updateContextValue(contextObject, contextType, newValue) {
  // If the global flag isPrimaryContext is true, update the primary value
  if (isPrimaryContext) {
    notifyListeners(globalListenerRegistry, contextType._currentValue);
    contextType._currentValue = newValue;
  } else {
    // Otherwise, update the secondary value
    notifyListeners(globalListenerRegistry, contextType._currentValue2);
    contextType._currentValue2 = newValue;
  }
}

module.exports = updateContextValue;