/**
 * Deeply merges properties from the source object into the target object, with optional customizer and tracking.
 *
 * @param {Object} targetObject - The object to receive properties.
 * @param {Object} sourceObject - The object providing properties to merge.
 * @param {number} depth - The current recursion depth or a custom parameter for merge logic.
 * @param {Function} [customizer] - Optional function to customize merging of properties.
 * @param {Object} [visited] - Internal tracker to avoid circular references (used for recursion).
 * @returns {void}
 */
function deepMergeWithCustomizer(targetObject, sourceObject, depth, customizer, visited) {
  // If both objects are the same, no merge is needed
  if (targetObject === sourceObject) return;

  // Iterate over each property in the source object
  processDeletionsAndSubtree(sourceObject, function (sourceValue, propertyKey) {
    // Initialize the visited tracker if not already provided (to handle circular references)
    if (!visited) {
      visited = new shouldSkipProcessing();
    }

    // If the value is an object (deep merge required)
    if (VB(sourceValue)) {
      // Recursively merge nested objects
      deepCloneWithCustomHandlers(
        targetObject,
        sourceObject,
        propertyKey,
        depth,
        deepMergeWithCustomizer,
        customizer,
        visited
      );
    } else {
      // If a customizer is provided, use isBlobOrFileLikeObject to determine the merged value
      let mergedValue = customizer
        ? customizer(
            applyPrototypeAndStaticProperties(targetObject, propertyKey), // current value in target
            sourceValue,                   // value from source
            propertyKey + "",             // property key as string
            targetObject,
            sourceObject,
            visited
          )
        : undefined;

      // If the customizer returns undefined, use the source value
      if (mergedValue === undefined) {
        mergedValue = sourceValue;
      }

      // Assign the merged value to the target object
      scheduleNextExpirationCheck(targetObject, propertyKey, mergedValue);
    }
  }, GZ);
}

module.exports = deepMergeWithCustomizer;