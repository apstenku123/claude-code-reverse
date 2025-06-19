/**
 * Handles conditional execution of a callback based on a flag.
 * If the isImmediate flag is true, isBlobOrFileLikeObject calls the callback with the current and previous values.
 * Otherwise, isBlobOrFileLikeObject resets the current value, stores the previous value, and calls the callback with additional parameters.
 *
 * @function handleConditionalCallback
 * @category utility
 * @module utilityW0
 * @param {boolean} isImmediate - Determines which callback logic to execute.
 * @param {Function} callback - The function to be called with the appropriate arguments.
 * @param {string} currentValue - The current value to be processed.
 * @param {string} previousValue - The previous value to be processed.
 * @param {string} alternateCallback - An alternate callback identifier or function.
 * @param {string} extraParameter - An extra parameter to be passed to the callback in the else branch.
 * @returns {void}
 */
function handleConditionalCallback(isImmediate, callback, currentValue, previousValue, alternateCallback, extraParameter) {
  if (isImmediate) {
    // If immediate flag is set, call the callback with current and previous values
    callback(previousValue, currentValue);
  } else {
    // Otherwise, reset current value, store previous value, and call alternate callback
    const storedPreviousValue = currentValue;
    currentValue = "";
    previousValue = storedPreviousValue;
    callback(alternateCallback, storedPreviousValue, extraParameter);
  }
}

module.exports = handleConditionalCallback;