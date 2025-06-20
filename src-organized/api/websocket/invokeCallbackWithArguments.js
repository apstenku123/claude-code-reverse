/**
 * Invokes the provided callback function with the given arguments.
 *
 * @function invokeCallbackWithArguments
 * @description Calls the 'callbackFunction' with 'callbackArguments'.
 * @param {Function} callbackFunction - The function to be invoked.
 * @param {...any} callbackArguments - The arguments to pass to the callback function.
 * @returns {any} The result of invoking the callback function.
 */
function invokeCallbackWithArguments(callbackFunction, ...callbackArguments) {
  // Call the callback function with the provided arguments
  return callbackFunction(...callbackArguments);
}

module.exports = invokeCallbackWithArguments;