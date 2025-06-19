/**
 * Recursively assigns properties from the source object to the target object, with optional customizer and tracking.
 *
 * @param {Object} target - The object to which properties will be assigned.
 * @param {Object} source - The object from which properties are copied.
 * @param {Function} [customizer] - Optional function to customize assigned values. Receives (targetValue, sourceValue, key, target, source, tracker).
 * @param {boolean} [isDeep=false] - Whether to perform a deep assignment (recursively assign nested objects).
 * @param {Object} [tracker] - Internal tracker to prevent circular references (used during recursion).
 * @returns {void}
 */
function deepAssignWithCustomizer(target, source, customizer, isDeep = false, tracker) {
  // If target and source are the same, do nothing
  if (target === source) return;

  // Iterate over each property in the source object
  processDeletionsAndSubtree(source, function (sourceValue, key) {
    // Initialize tracker if not already present (for circular reference tracking)
    if (!tracker) {
      tracker = new shouldSkipProcessing();
    }

    // If the source value is an object (needs deep assignment)
    if (VB(sourceValue)) {
      // Recursively assign nested objects
      deepCloneWithCustomHandlers(target, source, key, customizer, deepAssignWithCustomizer, isDeep, tracker);
    } else {
      // Determine the value to assign, using the customizer if provided
      const targetValue = isDeep ? isDeep(applyPrototypeAndStaticProperties(target, key), sourceValue, String(key), target, source, tracker) : noop;
      // If customizer returns undefined (noop), use the source value
      const valueToAssign = targetValue === noop ? sourceValue : targetValue;
      // Assign the value to the target object
      scheduleNextExpirationCheck(target, key, valueToAssign);
    }
  }, GZ);
}

module.exports = deepAssignWithCustomizer;