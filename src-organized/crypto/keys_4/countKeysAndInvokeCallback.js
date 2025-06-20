/**
 * Counts the number of keys from the current context and invokes a callback with the resulting promise and an additional argument.
 *
 * @param {any} callbackArgument - An argument to be passed to the external function renderToolUseConfirmationDialog along with the promise.
 * @returns {Promise<number>} a promise that resolves to the number of keys.
 */
function countKeysAndInvokeCallback(callbackArgument) {
  const context = this;
  // Get a promise that resolves to the array of keys, then map to the length
  const keyCountPromise = context.keys().then(function (keysArray) {
    return keysArray.length;
  });
  // Call the external function renderToolUseConfirmationDialog with the promise and the callback argument
  renderToolUseConfirmationDialog(keyCountPromise, callbackArgument);
  // Return the promise for further chaining
  return keyCountPromise;
}

module.exports = countKeysAndInvokeCallback;