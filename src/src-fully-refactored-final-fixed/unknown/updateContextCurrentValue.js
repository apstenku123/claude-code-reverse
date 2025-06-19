/**
 * Updates the current value of a context object based on the current value from r2.
 *
 * Depending on the value of the global flag isPrimaryContext (MA),
 * isBlobOrFileLikeObject assigns the current value to either _currentValue or _currentValue2 property of the context object.
 *
 * @param {Object} contextObject - The context object whose current value needs to be updated.
 * @returns {void}
 */
function updateContextCurrentValue(contextObject) {
  // Retrieve the current value from the context source
  const currentContextValue = r2.current;

  // Perform any necessary side effects or bookkeeping
  restoreCurrentFromResourceArray(r2);

  // Assign the current value to the appropriate property based on isPrimaryContext flag
  if (MA) {
    contextObject._currentValue = currentContextValue;
  } else {
    contextObject._currentValue2 = currentContextValue;
  }
}

module.exports = updateContextCurrentValue;