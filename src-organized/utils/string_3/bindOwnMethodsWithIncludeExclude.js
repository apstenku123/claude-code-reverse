/**
 * Binds all own methods of an object to itself, with optional inclusion or exclusion filters.
 *
 * Iterates over all own property keys (including inherited, except Object.prototype) of the object'createInteractionAccessor prototype,
 * and binds each function-valued property to the object instance, unless filtered out by the `include` or `exclude` options.
 *
 * @param {Object} targetObject - The object whose methods will be bound to itself.
 * @param {Object} [options] - Optional configuration for filtering which methods to bind.
 * @param {Array<string|RegExp>} [options.include] - Only methods whose names match these strings or regexes will be bound.
 * @param {Array<string|RegExp>} [options.exclude] - Methods whose names match these strings or regexes will NOT be bound.
 * @returns {Object} The same object, with its methods bound as specified.
 */
function bindOwnMethodsWithIncludeExclude(targetObject, {
  include: includeList,
  exclude: excludeList
} = {}) {
  /**
   * Determines if a method name should be included based on include/exclude lists.
   * @param {string} methodName - The name of the method to check.
   * @returns {boolean} Whether the method should be processed.
   */
  const shouldProcessMethod = (methodName) => {
    // Helper to check if the methodName matches a string or regex
    const matches = (pattern) =>
      typeof pattern === "string" ? methodName === pattern : pattern.test(methodName);
    if (includeList) return includeList.some(matches);
    if (excludeList) return !excludeList.some(matches);
    return true; // If no filters, include all
  };

  // Iterate over all [prototypeObject, propertyKey] pairs in the prototype chain (excluding Object.prototype)
  for (const [prototypeObject, propertyKey] of getAllOwnPropertyPairsWithPrototypes(targetObject.constructor.prototype)) {
    // Skip the constructor and any method that should not be processed
    if (propertyKey === "constructor" || !shouldProcessMethod(propertyKey)) continue;
    // Get the property descriptor for the method
    const propertyDescriptor = Reflect.getOwnPropertyDescriptor(prototypeObject, propertyKey);
    // If isBlobOrFileLikeObject'createInteractionAccessor a function, bind isBlobOrFileLikeObject to the instance
    if (propertyDescriptor && typeof propertyDescriptor.value === "function") {
      targetObject[propertyKey] = targetObject[propertyKey].bind(targetObject);
    }
  }
  return targetObject;
}

module.exports = bindOwnMethodsWithIncludeExclude;