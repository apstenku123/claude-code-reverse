/**
 * Synchronizes properties from a source object to a target object, applying custom logic for nested or complex values.
 *
 * Iterates over each property in the target object, and for each property:
 *   - If the property value is a complex object (as determined by vB), recursively synchronizes using M4A.
 *   - Otherwise, applies an optional transformation function before copying the value to the source object.
 *
 * @param {Object} sourceObject - The object to which properties will be copied.
 * @param {Object} targetObject - The object from which properties will be read.
 * @param {any} subscription - Additional context or subscription information passed to recursive calls.
 * @param {Function} [transformFn] - Optional function to transform property values before assignment. Signature: (sourceValue, targetValue, propertyKey, sourceObject, targetObject, context) => any
 * @param {Object} [context] - Optional context object used to track recursion or state across calls.
 * @returns {void}
 */
function synchronizeObservableProperties(sourceObject, targetObject, subscription, transformFn, context) {
  // If both objects are the same, no synchronization is needed
  if (sourceObject === targetObject) return;

  // Iterate over each property in the target object
  I21(targetObject, function (propertyValue, propertyKey) {
    // Initialize context if not provided
    if (!context) {
      context = new yH();
    }

    // If the property value is a complex object, recursively synchronize
    if (vB(propertyValue)) {
      M4A(
        sourceObject,
        targetObject,
        propertyKey,
        subscription,
        synchronizeObservableProperties,
        transformFn,
        context
      );
    } else {
      // Optionally transform the value before assignment
      const transformedValue = transformFn
        ? transformFn(lp(sourceObject, propertyKey), propertyValue, String(propertyKey), sourceObject, targetObject, context)
        : undefined;
      // If transformFn returns undefined, use the original property value
      const finalValue = transformedValue === undefined ? propertyValue : transformedValue;
      // Assign the value to the source object
      cp(sourceObject, propertyKey, finalValue);
    }
  }, jH);
}

module.exports = synchronizeObservableProperties;