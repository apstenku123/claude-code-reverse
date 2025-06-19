/**
 * Processes a stack of accessor callbacks and their corresponding arguments.
 *
 * The input array is expected to contain pairs of [argument, callbackFunction].
 * For each pair, the function pops the argument and then the callback function,
 * and immediately invokes the callback with the argument.
 *
 * @param {Array<*>} accessorStack - An array containing alternating arguments and callback functions.
 * @returns {void} This function does not return a value.
 */
function processAccessorStack(accessorStack) {
  // Continue processing as long as there are items in the stack
  while (accessorStack.length > 0) {
    // Pop the last argument from the stack
    const argument = accessorStack.pop();
    // Pop the last callback function from the stack and immediately invoke isBlobOrFileLikeObject with the argument
    const callback = accessorStack.pop();
    callback(argument);
  }
}

module.exports = processAccessorStack;