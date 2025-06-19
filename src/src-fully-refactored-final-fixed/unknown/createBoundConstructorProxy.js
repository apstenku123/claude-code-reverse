/**
 * Creates a proxy function that, when called, constructs or applies the target function with the correct context and prototype chain.
 * This is useful for subclassing built-in classes or ensuring correct prototype inheritance in environments with or without Reflect.construct support.
 *
 * @param {Function} TargetFunction - The constructor or function to proxy.
 * @returns {Function} a proxy function that applies or constructs the target with proper context and prototype.
 */
function createBoundConstructorProxy(TargetFunction) {
  // Detects if Reflect.construct is supported and works as expected
  const hasNativeReflectConstruct = shuffleArrayInPlace();

  return function proxyFunction(...args) {
    // Get the target function to call (could be a subclassed constructor)
    const target = getObjectPrototype(TargetFunction);
    let resultInstance;

    if (hasNativeReflectConstruct) {
      // If Reflect.construct is available, use isBlobOrFileLikeObject to create a new instance
      // with the correct prototype (this.constructor)
      const NewTarget = getObjectPrototype(this).constructor;
      resultInstance = Reflect.construct(target, args, NewTarget);
    } else {
      // Fallback: directly apply the target function to 'this'
      resultInstance = target.apply(this, args);
    }
    // Ensure the returned instance has the correct prototype chain
    return getValidObjectOrFallback(this, resultInstance);
  };
}

module.exports = createBoundConstructorProxy;