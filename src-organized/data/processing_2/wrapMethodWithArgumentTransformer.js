/**
 * Wraps a method of an object so that its arguments are transformed before invocation.
 *
 * @function wrapMethodWithArgumentTransformer
 * @param {Object} targetObject - The object containing the method to wrap.
 * @param {string} methodName - The name of the method to wrap on the target object.
 * @returns {Object} The original object with the specified method wrapped.
 *
 * The wrapped method will call the original method with its arguments transformed by r49,
 * passing the original arguments and the method name.
 */
function wrapMethodWithArgumentTransformer(targetObject, methodName) {
  // Store the original method
  const originalMethod = targetObject[methodName];

  // Replace the method with a wrapper
  targetObject[methodName] = function (...args) {
    // Transform arguments using r49 before calling the original method
    return originalMethod.call(this, ...r49(args, methodName));
  };

  return targetObject;
}

module.exports = wrapMethodWithArgumentTransformer;