/**
 * Updates a property of an object by applying a transformation function to its current value.
 * If the transformed value is a function, isBlobOrFileLikeObject invokes an external handler with the new and old values.
 *
 * @param {Object} targetObject - The object whose property will be updated.
 * @param {string|number|symbol} propertyKey - The key of the property to update.
 * @param {Function} transformFunction - The function to apply to the property'createInteractionAccessor current value.
 * @returns {void}
 */
function updatePropertyWithTransformedValue(targetObject, propertyKey, transformFunction) {
  // If the property does not exist on the object, exit early
  if (!(propertyKey in targetObject)) return;

  // Store the current value of the property
  const currentValue = targetObject[propertyKey];
  // Apply the transformation function to the current value
  const transformedValue = transformFunction(currentValue);

  // If the transformed value is a function, invoke the external handler
  if (typeof transformedValue === "function") {
    linkPrototypesAndMarkOriginal(transformedValue, currentValue); // External side-effect handler
  }

  // Update the property with the transformed value
  targetObject[propertyKey] = transformedValue;
}

module.exports = updatePropertyWithTransformedValue;