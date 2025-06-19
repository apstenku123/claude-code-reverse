/**
 * Defines a read-only property with a getter on the target object.
 *
 * @param {Object} targetObject - The object on which to define the property.
 * @param {string|symbol} propertyKey - The name or Symbol of the property to define.
 * @param {*} propertyValue - The value to be returned by the property'createInteractionAccessor getter.
 * @returns {void}
 *
 * This function uses Object.defineProperty to add a property to the target object.
 * The property is defined with a getter that always returns the provided value.
 * The property is not writable and does not have a setter.
 */
function defineReadOnlyPropertyWithGetter(targetObject, propertyKey, propertyValue) {
  Object.defineProperty(targetObject, propertyKey, {
    // Define a getter that always returns the specified value
    get: function () {
      return propertyValue;
    }
  });
}

module.exports = defineReadOnlyPropertyWithGetter;