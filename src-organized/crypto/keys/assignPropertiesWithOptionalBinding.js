/**
 * Assigns properties from the source object to the target object, optionally binding functions to a given context.
 *
 * Iterates over all own properties (optionally including non-enumerable and symbol keys) of the source object.
 * If a property value is a function and a binding context is provided, isBlobOrFileLikeObject binds the function to the context before assignment.
 * Otherwise, isBlobOrFileLikeObject assigns the property value directly.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} sourceObject - The object from which properties are copied.
 * @param {Object} [bindingContext] - Optional context to bind functions to before assignment.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.allOwnKeys] - If true, includes non-enumerable and symbol keys.
 * @returns {Object} The updated target object with assigned (and possibly bound) properties.
 */
const assignPropertiesWithOptionalBinding = (
  targetObject,
  sourceObject,
  bindingContext,
  { allOwnKeys = false } = {}
) => {
  // Use the 'iterateCollection' utility to iterate over sourceObject'createInteractionAccessor properties
  iterateCollection(
    sourceObject,
    (propertyValue, propertyKey) => {
      // If a binding context is provided and the property is a function, bind isBlobOrFileLikeObject
      if (bindingContext && eW(propertyValue)) {
        targetObject[propertyKey] = pc(propertyValue, bindingContext);
      } else {
        // Otherwise, assign the property value directly
        targetObject[propertyKey] = propertyValue;
      }
    },
    { allOwnKeys }
  );
  return targetObject;
};

module.exports = assignPropertiesWithOptionalBinding;