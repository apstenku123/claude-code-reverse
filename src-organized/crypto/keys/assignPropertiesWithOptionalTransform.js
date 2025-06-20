/**
 * Assigns properties from a source object to a target object, optionally transforming values using a subscription function.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} sourceObject - The object containing properties to assign.
 * @param {Function} [transformFunction] - Optional function to transform property values before assignment.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.allOwnKeys] - If true, includes non-enumerable and symbol properties.
 * @returns {Object} The updated target object with assigned (and possibly transformed) properties.
 */
const assignPropertiesWithOptionalTransform = (
  targetObject,
  sourceObject,
  transformFunction,
  { allOwnKeys = false } = {}
) => {
  // Iterate over each property in sourceObject using iterateCollection(likely a custom forEach or map function)
  iterateCollection(
    sourceObject,
    (propertyValue, propertyKey) => {
      // If a transformFunction is provided and propertyValue is an object (checked by eW),
      // transform the propertyValue before assignment
      if (transformFunction && eW(propertyValue)) {
        targetObject[propertyKey] = pc(propertyValue, transformFunction);
      } else {
        // Otherwise, assign the propertyValue directly
        targetObject[propertyKey] = propertyValue;
      }
    },
    {
      allOwnKeys
    }
  );
  return targetObject;
};

module.exports = assignPropertiesWithOptionalTransform;