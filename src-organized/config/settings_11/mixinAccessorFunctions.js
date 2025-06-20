/**
 * Mixes accessor functions from a source object into a target object, optionally enabling chaining.
 *
 * This function copies specified methods from a source object to a target object. If the target is a constructor,
 * isBlobOrFileLikeObject also adds chainable versions of these methods to the prototype, enabling fluent chaining of method calls.
 *
 * @param {Object} targetObject - The object or constructor to which methods will be added.
 * @param {Object} sourceObject - The object containing methods to be mixed in.
 * @param {Object} [options] - Optional configuration object. If omitted, arguments are shifted for backward compatibility.
 * @returns {Object} The modified targetObject with mixed-in methods.
 */
function mixinAccessorFunctions(targetObject, sourceObject, options) {
  // Get the list of method names from the source object
  const sourceMethodNames = getOwnPropertyNames(sourceObject);
  // Get the list of method names to mix in (may be filtered)
  let methodsToMixin = getMethodsToMixin(sourceObject, sourceMethodNames);

  // Handle optional options parameter and argument shifting for backward compatibility
  if (
    options == null &&
    !(isFunction(sourceObject) && (methodsToMixin.length || !sourceMethodNames.length))
  ) {
    options = sourceObject;
    sourceObject = targetObject;
    targetObject = this;
    methodsToMixin = getMethodsToMixin(sourceObject, getOwnPropertyNames(sourceObject));
  }

  // Determine if chaining is enabled (default: true)
  const enableChaining = !(isFunction(options) && "chain" in options) || !!options.chain;
  // Check if the target is a constructor (for prototype extension)
  const isTargetConstructor = isConstructor(targetObject);

  // Iterate over each method to mix in
  forEach(methodsToMixin, function(methodName) {
    const methodFunction = sourceObject[methodName];
    // Assign the method directly to the target object
    targetObject[methodName] = methodFunction;

    // If the target is a constructor, add a chainable version to its prototype
    if (isTargetConstructor) {
      targetObject.prototype[methodName] = function(...args) {
        const isChained = this.__chain__;
        // If chaining is enabled or already in a chain, return a wrapped chainable object
        if (enableChaining || isChained) {
          // Create a new wrapped instance
          const wrappedInstance = targetObject(this.__wrapped__);
          // Clone the current actions array
          wrappedInstance.__actions__ = cloneActions(this.__actions__);
          // Add the current method call as an action
          wrappedInstance.__actions__.push({
            func: methodFunction,
            args: args,
            thisArg: targetObject
          });
          // Preserve the chain state
          wrappedInstance.__chain__ = isChained;
          return wrappedInstance;
        }
        // If not chaining, invoke the method directly with the unwrapped value
        return methodFunction.apply(targetObject, mergeArguments([this.value()], args));
      };
    }
  });

  return targetObject;
}

// Dependency function placeholders (to be replaced with actual implementations)
// These are referenced in the original minified code as lQ, processFiberTreeWithMode, VB, FD, forEachUntilFalse, M7, isReadModeWithoutFlag
const getOwnPropertyNames = lQ; // lQ($)
const getMethodsToMixin = processFiberTreeWithMode;   // processFiberTreeWithMode($, c)
const isFunction = VB;          // VB($)
const isConstructor = FD;       // FD(H)
const forEach = forEachUntilFalse;             // forEachUntilFalse(accessorFunctionProxy, ...)
const cloneActions = M7;        // M7(this.__actions__)
const mergeArguments = isReadModeWithoutFlag;      // isReadModeWithoutFlag([this.value()], arguments)

module.exports = mixinAccessorFunctions;