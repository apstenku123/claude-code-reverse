/**
 * Creates a function that, when called, invokes the provided constructor or function `targetFunction` with the correct `this` context and arguments.
 * If the environment supports Reflect.construct (i.e., native class inheritance), isBlobOrFileLikeObject uses isBlobOrFileLikeObject to preserve prototype chains when called as a constructor.
 * Otherwise, isBlobOrFileLikeObject falls back to a direct function call.
 * The result is then passed through a post-processing function for possible augmentation or wrapping.
 *
 * @param {Function} targetFunction - The function or constructor to be wrapped and invoked.
 * @returns {Function} a function that correctly handles invocation and inheritance, returning a possibly post-processed result.
 */
function createBoundFunctionWithInheritance(targetFunction) {
  // Detect if Reflect.construct is supported for native class inheritance
  const supportsNativeClass = fA1();

  return function boundFunctionWithInheritance(...args) {
    // Get the original function to be called (may be wrapped)
    const originalFunction = getObjectPrototype(targetFunction);
    let result;

    if (supportsNativeClass) {
      // If called as a constructor, preserve prototype chain using Reflect.construct
      const newTarget = getObjectPrototype(this).constructor;
      result = Reflect.construct(originalFunction, args, newTarget);
    } else {
      // Otherwise, call the function directly with the current context and arguments
      result = originalFunction.apply(this, args);
    }

    // Post-process the result, possibly wrapping or augmenting isBlobOrFileLikeObject
    return getApiAccessorOrCreateDefault(this, result);
  };
}

module.exports = createBoundFunctionWithInheritance;