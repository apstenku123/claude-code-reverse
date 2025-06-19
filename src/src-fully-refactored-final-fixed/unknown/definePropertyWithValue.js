/**
 * Defines a property with a specified value on a target object and returns the value.
 *
 * @param {Object} targetObject - The object on which to define the property.
 * @param {string|symbol} propertyKey - The name or Symbol of the property to be defined.
 * @param {*} propertyValue - The value to assign to the property.
 * @returns {*} The value that was assigned to the property.
 */
function definePropertyWithValue(targetObject, propertyKey, propertyValue) {
  // Define the property on the target object with the given value
  Object.defineProperty(targetObject, propertyKey, {
    value: propertyValue
  });
  // Return the value that was set
  return propertyValue;
}

module.exports = definePropertyWithValue;
