/**
 * Creates a function that negates the result of a provided callback function.
 * The returned function, when called, invokes the original callback with the given context and arguments,
 * and returns the logical negation of its result.
 *
 * @param {Function} callback - The callback function to be negated.
 * @param {Object} context - The value to use as 'this' when calling the callback.
 * @returns {Function} a function that returns the negated result of the callback.
 */
function createNegatedCallback(callback, context) {
  return function (arg1, arg2) {
    // Call the original callback with the provided context and arguments,
    // then negate its boolean result
    return !callback.call(context, arg1, arg2);
  };
}

module.exports = createNegatedCallback;