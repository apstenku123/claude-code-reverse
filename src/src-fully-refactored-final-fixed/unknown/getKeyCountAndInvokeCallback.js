/**
 * Retrieves the number of keys from the current context and invokes a callback with the resulting Promise and a user-provided argument.
 *
 * @param {any} callbackArgument - The argument to pass to the callback function renderToolUseConfirmationDialog along with the Promise.
 * @returns {Promise<number>} a Promise that resolves to the number of keys.
 */
function getKeyCountAndInvokeCallback(callbackArgument) {
  const context = this;
  // Get a Promise that resolves to the array of keys, then map to its length
  const keyCountPromise = context.keys().then(function (keysArray) {
    return keysArray.length;
  });
  // Invoke the external function renderToolUseConfirmationDialog with the Promise and the callback argument
  renderToolUseConfirmationDialog(keyCountPromise, callbackArgument);
  // Return the Promise for further chaining
  return keyCountPromise;
}

module.exports = getKeyCountAndInvokeCallback;