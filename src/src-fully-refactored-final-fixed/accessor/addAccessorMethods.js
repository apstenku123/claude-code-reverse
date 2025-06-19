/**
 * Adds accessor methods from a source object to a target object, optionally supporting chaining.
 *
 * @param {Object} targetObject - The object to which accessor methods will be added.
 * @param {Object} sourceObject - The object containing methods to add as accessors.
 * @param {Object} [options] - Optional configuration object. If omitted, chaining is enabled by default.
 * @returns {Object} The target object with accessor methods added.
 */
function addAccessorMethods(targetObject, sourceObject, options) {
  // Get the list of method names from the source object
  const sourceMethodNames = getMethodNames(sourceObject);
  // Determine which methods to add as accessors
  let accessorMethodNames = getAccessorFunctionNames(sourceObject, sourceMethodNames);

  // Handle optional parameters and support for chaining
  if (
    options == null &&
    !(isObject(sourceObject) && (accessorMethodNames.length || !sourceMethodNames.length))
  ) {
    options = sourceObject;
    sourceObject = targetObject;
    targetObject = this;
    accessorMethodNames = getAccessorFunctionNames(sourceObject, getMethodNames(sourceObject));
  }

  // Determine if chaining is enabled (default: true)
  const isChainingEnabled =
    !(isObject(options) && "chain" in options) || !!options.chain;
  const isFunction = isFunctionObject(targetObject);

  // Add each accessor method to the target object
  forEach(accessorMethodNames, function (methodName) {
    const sourceMethod = sourceObject[methodName];
    // Assign the method directly to the target object
    targetObject[methodName] = sourceMethod;

    // If the target is a function, also add to its prototype for chaining
    if (isFunction) {
      targetObject.prototype[methodName] = function (...args) {
        const isChained = this.__chain__;
        if (isChainingEnabled || isChained) {
          // Create a new wrapper instance for chaining
          const wrapper = targetObject(this.__wrapped__);
          wrapper.__actions__ = cloneActions(this.__actions__);
          wrapper.__actions__.push({
            func: sourceMethod,
            args: args,
            thisArg: targetObject
          });
          wrapper.__chain__ = isChained;
          return wrapper;
        }
        // Directly invoke the method if not chaining
        return sourceMethod.apply(targetObject, mergeArguments([this.value()], args));
      };
    }
  });

  return targetObject;
}

// Export the function for use in other modules
module.exports = addAccessorMethods;

// --- Helper function placeholders (to be replaced with actual implementations) ---
// These are referenced in the refactored code and should be provided by the surrounding codebase.
// function getMethodNames(obj) { ... }
// function getAccessorFunctionNames(obj, methodNames) { ... }
// function isObject(val) { ... }
// function isFunctionObject(val) { ... }
// function forEach(arr, fn) { ... }
// function cloneActions(actions) { ... }
// function mergeArguments(arr1, arr2) { ... }