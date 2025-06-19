/**
 * Copies properties from a source collection to a target object, optionally transforming values using a provided function.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object|Array} sourceCollection - The collection (object or array) whose properties will be copied.
 * @param {Function} [transformFn] - Optional function to transform each value before assignment. If provided and the value is an object, this function is applied.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.allOwnKeys] - If true, iterates over all own property names, including non-enumerable ones.
 * @returns {Object} The modified target object with copied (and possibly transformed) properties.
 */
const copyCollectionWithTransform = (
  targetObject,
  sourceCollection,
  transformFn,
  { allOwnKeys = false } = {}
) => {
  // Use iterateCollection to traverse the sourceCollection
  iterateCollection(
    sourceCollection,
    (value, key) => {
      // If a transform function is provided and the value is an object, apply the transform
      if (transformFn && isObject(value)) {
        targetObject[key] = transformValue(value, transformFn);
      } else {
        // Otherwise, assign the value directly
        targetObject[key] = value;
      }
    },
    { allOwnKeys }
  );
  return targetObject;
};

module.exports = copyCollectionWithTransform;