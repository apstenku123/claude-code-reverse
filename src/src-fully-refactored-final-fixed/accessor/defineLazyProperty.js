/**
 * Defines a lazy-initialized property on the given object. The property is computed only once, on first access,
 * using the provided valueGenerator function. After the first access, the property is replaced with a standard property
 * holding the computed value, making subsequent accesses faster.
 *
 * @param {Object} targetObject - The object on which to define the lazy property.
 * @param {string|symbol} propertyKey - The property name (or symbol) to define on the object.
 * @param {Function} valueGenerator - a function that generates the property'createInteractionAccessor value when first accessed.
 */
function defineLazyProperty(targetObject, propertyKey, valueGenerator) {
  Object.defineProperty(targetObject, propertyKey, {
    get: () => {
      // Compute the value using the provided generator function
      const computedValue = valueGenerator();
      // Redefine the property as a standard value property for faster subsequent access
      Object.defineProperty(targetObject, propertyKey, {
        value: computedValue,
        enumerable: true,
        configurable: true
      });
      return computedValue;
    },
    enumerable: true,
    configurable: true
  });
}

module.exports = defineLazyProperty;