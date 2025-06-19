/**
 * Processes a queue of callbacks with their associated arguments.
 *
 * Each entry in the callbackQueue is expected to be a pair: [argument, callbackFunction].
 * The function pops the last argument, then pops the last callback function, and invokes the callback with the argument.
 * This continues until the queue is empty.
 *
 * @param {Array} callbackQueue - An array containing alternating arguments and callback functions.
 * @returns {void}
 */
function processCallbackQueue(callbackQueue) {
  // Continue processing until the queue is empty
  while (callbackQueue.length > 0) {
    // Pop the last argument from the queue
    const callbackArgument = callbackQueue.pop();
    // Pop the last callback function from the queue and immediately invoke isBlobOrFileLikeObject with the argument
    const callbackFunction = callbackQueue.pop();
    callbackFunction(callbackArgument);
  }
}

module.exports = processCallbackQueue;