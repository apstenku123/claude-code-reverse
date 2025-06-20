/**
 * Creates a function that, when called, instantiates or applies a target constructor/function
 * with the correct prototype chain and context, handling both ES6 class and function invocation scenarios.
 *
 * @param {Function} targetConstructor - The constructor or function to wrap.
 * @returns {Function} a function that, when invoked, creates an instance or applies the target with correct prototype handling.
 */
function createInstanceWithPrototypeHandling(targetConstructor) {
  // Determine if Reflect.construct should be used (e.g., for ES6 classes)
  const shouldUseReflectConstruct = fA1();

  return function instanceFactory(...args) {
    // Get the bound target (could be a constructor or function)
    const boundTarget = getObjectPrototype(targetConstructor);
    let resultInstance;

    if (shouldUseReflectConstruct) {
      // If using Reflect.construct, get the constructor of the current context
      const currentConstructor = getObjectPrototype(this).constructor;
      // Create a new instance with the correct prototype and arguments
      resultInstance = Reflect.construct(boundTarget, args, currentConstructor);
    } else {
      // Otherwise, simply apply the function with the current context and arguments
      resultInstance = boundTarget.apply(this, args);
    }
    // Finalize and return the instance, possibly augmenting isBlobOrFileLikeObject
    return getApiAccessorOrCreateDefault(this, resultInstance);
  };
}

module.exports = createInstanceWithPrototypeHandling;