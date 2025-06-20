/**
 * Deeply merges two objects or arrays, using customizable merge strategies.
 *
 * @param {Object|Array} target - The target object or array to merge into.
 * @param {Object|Array} source - The source object or array to merge from.
 * @param {Object} [options={}] - Optional configuration for merging behavior.
 * @param {Function} [options.arrayMerge] - Custom function to merge arrays. Defaults to ry4.
 * @param {Function} [options.isMergeableObject] - Function to determine if a value is mergeable. Defaults to py4.
 * @param {Function} [options.cloneUnlessOtherwiseSpecified] - Function to clone values unless specified. Defaults to Ma.
 * @returns {Object|Array} - The merged object or array.
 */
function deepMergeObjects(target, source, options = {}) {
  // Set default merge options if not provided
  options.arrayMerge = options.arrayMerge || ry4;
  options.isMergeableObject = options.isMergeableObject || py4;
  options.cloneUnlessOtherwiseSpecified = Ma;

  const isSourceArray = Array.isArray(source);
  const isTargetArray = Array.isArray(target);
  const areBothArrays = isSourceArray === isTargetArray;

  // If one is array and the other is not, clone the source
  if (!areBothArrays) {
    return Ma(source, options);
  }
  // If both are arrays, use the arrayMerge strategy
  if (isSourceArray) {
    return options.arrayMerge(target, source, options);
  }
  // If both are objects, use the object merge strategy
  return mergeObjectsWithCustomLogic(target, source, options);
}

module.exports = deepMergeObjects;