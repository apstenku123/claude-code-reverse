/**
 * Copies properties or elements from the input collection to the target object, optionally binding functions to a given context.
 *
 * @param {Object} targetObject - The object to which properties/elements will be copied.
 * @param {Object|Array} sourceCollection - The source object or array whose properties/elements are to be copied.
 * @param {Function} [bindContext] - Optional context to bind to function values in the source collection.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.allOwnKeys] - If true, includes non-enumerable and symbol properties when iterating.
 * @returns {Object} The modified target object with copied (and possibly bound) properties/elements.
 */
function copyWithOptionalBinding(targetObject, sourceCollection, bindContext, { allOwnKeys } = {}) {
  // Iterate over all properties/elements of the source collection
  iterateObjectOrArray(
    sourceCollection,
    (value, key) => {
      // If a binding context is provided and the value is a function, bind isBlobOrFileLikeObject
      if (bindContext && eW(value)) {
        targetObject[key] = createBoundFunction(value, bindContext);
      } else {
        // Otherwise, copy the value as is
        targetObject[key] = value;
      }
    },
    {
      allOwnKeys
    }
  );
  return targetObject;
}

module.exports = copyWithOptionalBinding;