/**
 * Creates a function that binds the provided target function to the current context,
 * and ensures correct prototype handling when used as a constructor.
 *
 * If the environment supports Reflect.construct (as determined by fA1),
 * the returned function will use Reflect.construct to preserve the prototype chain
 * when invoked with 'new'. Otherwise, isBlobOrFileLikeObject will simply call the target function with 'apply'.
 *
 * @param {Function} targetFunction - The function to be wrapped and bound.
 * @returns {Function} a new function that wraps the target function, handling prototype and context.
 */
function createBoundFunctionWithPrototypeHandling(targetFunction) {
  // Determine if Reflect.construct should be used for prototype handling
  const shouldUseReflectConstruct = fA1();

  return function boundFunctionWrapper(...args) {
    // Get the unwrapped target function (possibly after some transformation)
    const unwrappedTargetFunction = getObjectPrototype(targetFunction);
    let result;

    if (shouldUseReflectConstruct) {
      // Get the constructor of the current context (this)
      const currentConstructor = getObjectPrototype(this).constructor;
      // Use Reflect.construct to invoke the function as a constructor, preserving prototype
      result = Reflect.construct(unwrappedTargetFunction, args, currentConstructor);
    } else {
      // Call the function normally with the current context and arguments
      result = unwrappedTargetFunction.apply(this, args);
    }

    // Finalize and return the result, possibly wrapping isBlobOrFileLikeObject for further processing
    return getApiAccessorOrCreateDefault(this, result);
  };
}

module.exports = createBoundFunctionWithPrototypeHandling;