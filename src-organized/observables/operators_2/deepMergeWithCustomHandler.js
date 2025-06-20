/**
 * Deeply merges properties from the source object into the target object, optionally using a custom handler for each property.
 *
 * @param {Object} targetObject - The object to merge properties into.
 * @param {Object} sourceObject - The object to merge properties from.
 * @param {Function} [customizer] - Optional custom handler function for merging properties. Receives (targetValue, sourceValue, key, targetObject, sourceObject, mergeTracker).
 * @param {Function} [propertyHandler] - Optional function to handle each property. Used for advanced merging scenarios.
 * @param {Object} [mergeTracker] - Internal tracker to prevent circular references during merge.
 * @returns {void}
 */
function deepMergeWithCustomHandler(targetObject, sourceObject, customizer, propertyHandler, mergeTracker) {
  // If both objects are the same reference, no merge is needed
  if (targetObject === sourceObject) return;

  // Iterate over each property in the source object
  I21(sourceObject, function (sourceValue, key) {
    // Initialize merge tracker if not already present
    if (!mergeTracker) {
      mergeTracker = new yH();
    }

    // If the source value is an object, perform a recursive merge
    if (vB(sourceValue)) {
      M4A(targetObject, sourceObject, key, customizer, deepMergeWithCustomHandler, propertyHandler, mergeTracker);
    } else {
      // If a custom property handler is provided, use isBlobOrFileLikeObject to determine the merged value
      let mergedValue = propertyHandler
        ? propertyHandler(lp(targetObject, key), sourceValue, String(key), targetObject, sourceObject, mergeTracker)
        : undefined;
      // If the handler returns undefined, default to the source value
      if (mergedValue === undefined) {
        mergedValue = sourceValue;
      }
      // Assign the merged value to the target object
      cp(targetObject, key, mergedValue);
    }
  }, jH);
}

module.exports = deepMergeWithCustomHandler;