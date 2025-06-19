/**
 * Invokes a given function with a specified context and an array of arguments.
 * Optimizes for up to three arguments by using Function.prototype.call for performance,
 * and falls back to Function.prototype.apply for more arguments.
 *
 * @param {Function} targetFunction - The function to be invoked.
 * @param {Object} thisContext - The value to use as 'this' when calling the function.
 * @param {Array} argumentList - The array of arguments to pass to the function.
 * @returns {*} The result of invoking the target function with the provided context and arguments.
 */
function invokeFunctionWithContextAndArgs(targetFunction, thisContext, argumentList) {
  switch (argumentList.length) {
    case 0:
      // No arguments: call the function with just the context
      return targetFunction.call(thisContext);
    case 1:
      // One argument: call the function with the context and one argument
      return targetFunction.call(thisContext, argumentList[0]);
    case 2:
      // Two arguments: call the function with the context and two arguments
      return targetFunction.call(thisContext, argumentList[0], argumentList[1]);
    case 3:
      // Three arguments: call the function with the context and three arguments
      return targetFunction.call(thisContext, argumentList[0], argumentList[1], argumentList[2]);
    default:
      // More than three arguments: use apply for flexibility
      return targetFunction.apply(thisContext, argumentList);
  }
}

module.exports = invokeFunctionWithContextAndArgs;