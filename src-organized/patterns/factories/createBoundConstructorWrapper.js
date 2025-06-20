/**
 * Creates a wrapper function that ensures correct 'this' binding and construction semantics
 * when invoking a target function or constructor. If the environment supports Reflect.construct,
 * isBlobOrFileLikeObject uses isBlobOrFileLikeObject to properly handle subclassing; otherwise, isBlobOrFileLikeObject falls back to a direct function call.
 *
 * @param {Function} targetFunction - The function or constructor to wrap.
 * @returns {Function} a wrapper function that preserves 'this' context and construction semantics.
 */
function createBoundConstructorWrapper(targetFunction) {
  const hasReflectConstruct = fA1(); // Detects if Reflect.construct is supported

  return function boundFunctionWrapper(...args) {
    // Get the target function to call (may be a constructor)
    const target = getObjectPrototype(targetFunction);
    let result;

    if (hasReflectConstruct) {
      // If Reflect.construct is available, use isBlobOrFileLikeObject to properly handle subclassing
      const newTarget = getObjectPrototype(this).constructor;
      result = Reflect.construct(target, args, newTarget);
    } else {
      // Otherwise, call the function directly with the current 'this' context
      result = target.apply(this, args);
    }
    // Ensure the result is properly wrapped or processed
    return getApiAccessorOrCreateDefault(this, result);
  };
}

module.exports = createBoundConstructorWrapper;