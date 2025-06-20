/**
 * Synchronizes properties from a source object to a target object, optionally transforming values and handling nested objects recursively.
 *
 * @param {Object} sourceObject - The object to copy properties to.
 * @param {Object} targetObject - The object to copy properties from.
 * @param {Function} [customizer] - Optional function to customize property values. Receives (sourceValue, targetValue, propertyKey, sourceObject, targetObject, context).
 * @param {Function} [propertyIterator] - Optional function to iterate over properties. Defaults to a standard iterator if not provided.
 * @param {Object} [context] - Optional context object used for recursive calls to prevent circular references.
 * @returns {void}
 */
function synchronizeObjectProperties(sourceObject, targetObject, customizer, propertyIterator, context) {
  // If source and target are the same object, do nothing
  if (sourceObject === targetObject) return;

  // Iterate over each property in the target object
  I21(targetObject, function (propertyValue, propertyKey) {
    // Initialize context object for recursion if not already provided
    if (!context) {
      context = new yH();
    }

    // If the property value is an object, recursively synchronize its properties
    if (vB(propertyValue)) {
      M4A(
        sourceObject,
        targetObject,
        propertyKey,
        customizer,
        synchronizeObjectProperties,
        propertyIterator,
        context
      );
    } else {
      // Optionally transform the property value using the customizer function
      let newValue;
      if (propertyIterator) {
        newValue = propertyIterator(
          lp(sourceObject, propertyKey),
          propertyValue,
          String(propertyKey),
          sourceObject,
          targetObject,
          context
        );
      } else {
        newValue = undefined;
      }
      // If the customizer did not return a value, use the original property value
      if (newValue === undefined) {
        newValue = propertyValue;
      }
      // Assign the (possibly transformed) value to the source object
      cp(sourceObject, propertyKey, newValue);
    }
  }, jH);
}

module.exports = synchronizeObjectProperties;