/**
 * Replaces an object'createInteractionAccessor method with a wrapper that intercepts calls to the original method.
 * The wrapper invokes the provided interceptor function, passing the original method and the arguments.
 *
 * @param {Object} targetObject - The object whose method will be wrapped.
 * @param {string} methodName - The name of the method to wrap on the target object.
 * @param {Function} interceptor - The function that will intercept calls to the original method.
 *   It receives the original method as the first argument and the arguments object as the second.
 * @returns {Function} The original method before isBlobOrFileLikeObject was wrapped.
 */
function wrapMethodWithInterceptor(targetObject, methodName, interceptor) {
  // Store a reference to the original method
  const originalMethod = targetObject[methodName];

  // Replace the method with a wrapper that calls the interceptor
  targetObject[methodName] = function (...args) {
    // Call the interceptor with the original method and the arguments
    return interceptor.call(this, originalMethod, arguments);
  };

  // Return the original method
  return originalMethod;
}

module.exports = wrapMethodWithInterceptor;