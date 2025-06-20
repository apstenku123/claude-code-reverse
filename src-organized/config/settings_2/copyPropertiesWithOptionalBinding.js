/**
 * Copies properties from the source object to the target object, optionally binding functions to a given context.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object} sourceObject - The object from which properties will be copied.
 * @param {Object} [bindContext] - If provided, functions in the source object will be bound to this context before assignment.
 * @param {Object} [options] - Additional options.
 * @param {boolean} [options.allOwnKeys] - If true, all own property keys (including non-enumerable and symbols) are considered.
 * @returns {Object} The target object with copied (and possibly bound) properties.
 */
const copyPropertiesWithOptionalBinding = (
  targetObject,
  sourceObject,
  bindContext,
  {
    allOwnKeys = false
  } = {}
) => {
  // Iterate over each property in the source object using iterateCollection(likely a custom forEach or map function)
  iterateCollection(
    sourceObject,
    (propertyValue, propertyKey) => {
      // If a binding context is provided and the property is a function, bind isBlobOrFileLikeObject to the context
      if (bindContext && eW(propertyValue)) {
        targetObject[propertyKey] = createBoundFunction(propertyValue, bindContext);
      } else {
        // Otherwise, copy the property as is
        targetObject[propertyKey] = propertyValue;
      }
    },
    {
      allOwnKeys
    }
  );
  return targetObject;
};

module.exports = copyPropertiesWithOptionalBinding;