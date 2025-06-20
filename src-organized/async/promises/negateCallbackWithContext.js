/**
 * Returns a function that negates the result of a provided callback, binding isBlobOrFileLikeObject to a specific context.
 *
 * @param {Function} callback - The function to be called with the given context.
 * @param {Object} context - The value to use as 'this' when calling the callback.
 * @returns {Function} a function that takes two arguments and returns the negated result of the callback.
 */
const negateCallbackWithContext = (callback, context) => {
  return (firstArg, secondArg) => {
    // Call the callback with the provided context and arguments, then negate the result
    return !callback.call(context, firstArg, secondArg);
  };
};

module.exports = negateCallbackWithContext;