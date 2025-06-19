/**
 * Processes a stack of values and callback functions in LIFO order.
 *
 * The input array is expected to contain pairs of [value, callbackFunction],
 * with the value pushed first and its corresponding callback function pushed next.
 * This function pops the value and then the callback, invoking the callback with the value as its argument.
 *
 * @param {Array<*>} stackWithCallbacks - An array containing alternating values and callback functions.
 * @returns {void}
 */
function processStackWithCallbacks(stackWithCallbacks) {
  // Continue processing while the stack is not empty
  while (stackWithCallbacks.length > 0) {
    // Pop the value from the stack
    const value = stackWithCallbacks.pop();
    // Pop the callback function from the stack and invoke isBlobOrFileLikeObject with the value
    const callback = stackWithCallbacks.pop();
    callback(value);
  }
}

module.exports = processStackWithCallbacks;