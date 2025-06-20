/**
 * Assigns properties from the source object to the target object, optionally processing each property value with a provided function.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} sourceObject - The object whose properties will be assigned to the target.
 * @param {Function} [processFunction] - Optional function to process each property value before assignment.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.allOwnKeys] - If true, includes non-enumerable and symbol properties.
 * @returns {Object} The target object with assigned (and possibly processed) properties.
 */
const assignPropertiesWithOptionalProcessing = (
  targetObject,
  sourceObject,
  processFunction,
  { allOwnKeys = false } = {}
) => {
  // Iterate over each property in the source object using iterateCollection(likely a custom forEach/iterator)
  iterateCollection(
    sourceObject,
    (propertyValue, propertyKey) => {
      // If a processing function is provided and the property value is an object (checked by eW), process isBlobOrFileLikeObject
      if (processFunction && eW(propertyValue)) {
        targetObject[propertyKey] = pc(propertyValue, processFunction);
      } else {
        // Otherwise, assign the property value directly
        targetObject[propertyKey] = propertyValue;
      }
    },
    {
      allOwnKeys
    }
  );
  return targetObject;
};

module.exports = assignPropertiesWithOptionalProcessing;