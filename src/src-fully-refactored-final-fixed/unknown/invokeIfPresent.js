/**
 * Invokes the processDeletionsAndSubtree function with the provided arguments if the sourceFunction is truthy.
 *
 * @param {Function} sourceFunction - The function to check before invoking processDeletionsAndSubtree.
 * @param {any} argument - The argument to pass to processDeletionsAndSubtree if sourceFunction is present.
 * @returns {any} The result of processDeletionsAndSubtree if sourceFunction is truthy; otherwise, undefined.
 */
function invokeIfPresent(sourceFunction, argument) {
  // Only invoke processDeletionsAndSubtree if sourceFunction is truthy
  return sourceFunction && processDeletionsAndSubtree(sourceFunction, argument, lQ);
}

module.exports = invokeIfPresent;