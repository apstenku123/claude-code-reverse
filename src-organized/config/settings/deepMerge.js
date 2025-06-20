/**
 * Deeply merges two objects or arrays, using customizable merge strategies.
 *
 * @param {Object|Array} target - The target object or array to merge into.
 * @param {Object|Array} source - The source object or array to merge from.
 * @param {Object} [options] - Optional merge options:
 *   - arrayMerge: Function to merge arrays (default: ry4)
 *   - isMergeableObject: Function to determine if an object is mergeable (default: py4)
 *   - cloneUnlessOtherwiseSpecified: Function to clone values (default: Ma)
 * @returns {Object|Array} The merged result.
 */
function deepMerge(target, source, options) {
  // Set default options if not provided
  options = options || {};
  options.arrayMerge = options.arrayMerge || ry4;
  options.isMergeableObject = options.isMergeableObject || py4;
  options.cloneUnlessOtherwiseSpecified = Ma;

  const isSourceArray = Array.isArray(source);
  const isTargetArray = Array.isArray(target);
  const areBothArrays = isSourceArray === isTargetArray;

  // If types differ (one is array, one is object), clone the source
  if (!areBothArrays) {
    return Ma(source, options);
  } else if (isSourceArray) {
    // If both are arrays, merge using the provided arrayMerge function
    return options.arrayMerge(target, source, options);
  } else {
    // If both are objects, merge using the object merge function
    return mergeObjectsWithCustomLogic(target, source, options);
  }
}

module.exports = deepMerge;