/**
 * Assigns properties from a source object to a target object for a given list of property keys,
 * optionally using a customizer function to determine the assigned value for each property.
 * If the target object is not provided (falsy), a new empty object is created.
 * Uses either $q or qq to assign the property, depending on whether the target object was provided.
 *
 * @param {Object} sourceObject - The object containing properties to assign.
 * @param {Array<string>} propertyKeys - Array of property names to assign from the source object.
 * @param {Object} [targetObject] - The object to assign properties to. If falsy, a new object is created.
 * @param {Function} [customizer] - Optional function to customize assigned values. Receives (targetValue, sourceValue, key, targetObject, sourceObject).
 * @returns {Object} The target object with assigned properties.
 */
function assignPropertiesWithCustomizer(sourceObject, propertyKeys, targetObject, customizer) {
  // If targetObject is falsy, create a new object
  const isCreatingNewObject = !targetObject;
  if (!targetObject) {
    targetObject = {};
  }

  // Iterate over each property key to assign
  for (let index = 0; index < propertyKeys.length; index++) {
    const key = propertyKeys[index];
    // Use customizer if provided, otherwise assign source value
    let assignedValue = customizer ? customizer(targetObject[key], sourceObject[key], key, targetObject, sourceObject) : undefined;
    if (assignedValue === undefined) {
      assignedValue = sourceObject[key];
    }
    // Use $q if creating a new object, otherwise use qq
    if (isCreatingNewObject) {
      $q(targetObject, key, assignedValue);
    } else {
      qq(targetObject, key, assignedValue);
    }
  }
  return targetObject;
}

module.exports = assignPropertiesWithCustomizer;