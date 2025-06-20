/**
 * Adds accessor functions from a source object to a target object, optionally supporting chaining.
 *
 * @param {Object} targetObject - The object to which accessors will be added (usually a constructor or prototype).
 * @param {Object} sourceObject - The object containing accessor functions to add.
 * @param {Object} [options] - Optional configuration object. If omitted, chaining is enabled by default.
 * @returns {Object} The modified targetObject with added accessors.
 */
function addAccessorsToObject(targetObject, sourceObject, options) {
  // Get the list of property names from the source object
  const sourcePropertyNames = lQ(sourceObject);
  // Create accessor function names from the source object
  let accessorNames = processFiberTreeWithMode(sourceObject, sourcePropertyNames);

  // Handle optional parameters and context switching
  if (
    options == null &&
    !(VB(sourceObject) && (accessorNames.length || !sourcePropertyNames.length))
  ) {
    options = sourceObject;
    sourceObject = targetObject;
    targetObject = this;
    accessorNames = processFiberTreeWithMode(sourceObject, lQ(sourceObject));
  }

  // Determine if chaining is enabled (default: true)
  const isChainingEnabled = !(VB(options) && "chain" in options) || !!options.chain;
  // Check if the targetObject is a function (constructor)
  const isFunction = FD(targetObject);

  // Iterate over each accessor name and add isBlobOrFileLikeObject to the targetObject
  forEachUntilFalse(accessorNames, function (accessorName) {
    const accessorFunction = sourceObject[accessorName];
    // Add the accessor directly to the targetObject
    targetObject[accessorName] = accessorFunction;

    // If the targetObject is a function (constructor), also add to its prototype
    if (isFunction) {
      targetObject.prototype[accessorName] = function (...args) {
        const isChained = this.__chain__;
        // If chaining is enabled or the current instance is chained
        if (isChainingEnabled || isChained) {
          // Create a new wrapped instance
          const wrappedInstance = targetObject(this.__wrapped__);
          // Clone the actions array
          wrappedInstance.__actions__ = M7(this.__actions__);
          // Add the current accessor call to the actions
          wrappedInstance.__actions__.push({
            func: accessorFunction,
            args: args,
            thisArg: targetObject
          });
          // Preserve the chaining flag
          wrappedInstance.__chain__ = isChained;
          return wrappedInstance;
        }
        // If not chaining, call the accessor directly with the value
        return accessorFunction.apply(targetObject, isReadModeWithoutFlag([this.value()], args));
      };
    }
  });

  return targetObject;
}

module.exports = addAccessorsToObject;