/**
 * Updates a property of an object using a callback function, and optionally applies a handler if the result is a function.
 *
 * @param {Object} targetObject - The object whose property will be updated.
 * @param {string|symbol} propertyKey - The key of the property to update.
 * @param {Function} updateCallback - a function that receives the current property value and returns the new value.
 * @returns {void}
 */
function updatePropertyWithCallback(targetObject, propertyKey, updateCallback) {
  // If the property does not exist on the object, exit early
  if (!(propertyKey in targetObject)) return;

  // Get the current value of the property
  const currentValue = targetObject[propertyKey];

  // Compute the new value using the provided callback
  const updatedValue = updateCallback(currentValue);

  // If the new value is a function, apply the external handler linkPrototypesAndMarkOriginal
  if (typeof updatedValue === "function") {
    linkPrototypesAndMarkOriginal(updatedValue, currentValue);
  }

  // Update the property with the new value
  targetObject[propertyKey] = updatedValue;
}

module.exports = updatePropertyWithCallback;