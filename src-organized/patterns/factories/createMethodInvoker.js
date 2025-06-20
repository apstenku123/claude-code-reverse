/**
 * Creates a curried function that invokes a specified method on a given object,
 * passing in a fixed first argument and a dynamic second argument.
 *
 * @param {Object} targetObject - The object containing the method to invoke.
 * @param {*} fixedFirstArgument - The argument to always pass as the first parameter to the method.
 * @returns {Function} a function that takes the method name, returning another function that takes the second argument and invokes the method.
 */
const createMethodInvoker = (targetObject, fixedFirstArgument) => {
  return (methodName) => {
    return (secondArgument) => {
      // Dynamically invoke the specified method on the target object
      return targetObject[methodName](fixedFirstArgument, secondArgument);
    };
  };
};

module.exports = createMethodInvoker;