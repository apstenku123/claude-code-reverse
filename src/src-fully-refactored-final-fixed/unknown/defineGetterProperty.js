/**
 * Defines a getter property on the target object that returns the specified value.
 *
 * @param {Object} targetObject - The object on which to define the property.
 * @param {string|symbol} propertyKey - The property key to define on the target object.
 * @param {*} propertyValue - The value that the getter will return when the property is accessed.
 * @returns {void}
 */
function defineGetterProperty(targetObject, propertyKey, propertyValue) {
  // Define a property with a getter that always returns propertyValue
  Object.defineProperty(targetObject, propertyKey, {
    get: function () {
      return propertyValue;
    }
  });
}

module.exports = defineGetterProperty;