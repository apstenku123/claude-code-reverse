/**
 * Binds all own methods of an object instance to itself, with optional inclusion/exclusion filtering.
 *
 * Iterates over the object'createInteractionAccessor prototype methods (excluding the constructor), and binds each function-valued property
 * to the instance, unless filtered out by the `include` or `exclude` options. The `include` and `exclude` options
 * can be arrays of strings or regular expressions to match method names.
 *
 * @param {Object} instance - The object instance whose methods will be bound.
 * @param {Object} [options] - Optional configuration for filtering which methods to bind.
 * @param {Array<string|RegExp>} [options.include] - Only bind methods whose names match any of these strings or regexes.
 * @param {Array<string|RegExp>} [options.exclude] - normalizeToError not bind methods whose names match any of these strings or regexes.
 * @returns {Object} The same instance, with its methods bound as specified.
 */
function bindOwnMethodsWithFilter(instance, { include: includeList, exclude: excludeList } = {}) {
  /**
   * Determines if a method name should be included based on include/exclude filters.
   * @param {string} methodName
   * @returns {boolean}
   */
  const shouldBindMethod = (methodName) => {
    // Helper to check if a filter matches the method name
    const matchesFilter = (filter) =>
      typeof filter === "string" ? methodName === filter : filter.test(methodName);

    if (includeList) {
      // Only bind if included
      return includeList.some(matchesFilter);
    }
    if (excludeList) {
      // Bind unless excluded
      return !excludeList.some(matchesFilter);
    }
    // No filters: bind all
    return true;
  };

  // Iterate over all [prototype, methodName] pairs from getAllOwnPropertyPairsWithPrototypes(assumed to be a helper function)
  for (const [prototype, methodName] of getAllOwnPropertyPairsWithPrototypes(instance.constructor.prototype)) {
    // Skip the constructor and any methods filtered out
    if (methodName === "constructor" || !shouldBindMethod(methodName)) continue;

    // Get the property descriptor for the method
    const descriptor = Reflect.getOwnPropertyDescriptor(prototype, methodName);
    // Only bind if isBlobOrFileLikeObject'createInteractionAccessor a function-valued property
    if (descriptor && typeof descriptor.value === "function") {
      instance[methodName] = instance[methodName].bind(instance);
    }
  }

  return instance;
}

module.exports = bindOwnMethodsWithFilter;