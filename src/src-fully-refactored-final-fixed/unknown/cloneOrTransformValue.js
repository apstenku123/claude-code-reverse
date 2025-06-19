/**
 * Attempts to clone or transform a value from a source object to a target object, handling various data types and custom transformation logic.
 *
 * @param {any} sourceValue - The value from the source object to be cloned or transformed.
 * @param {any} targetValue - The value from the target object to be cloned or transformed.
 * @param {string|number} propertyKey - The property key being processed.
 * @param {Function} processProperty - Callback to process the cloned/transformed value.
 * @param {Function} [customizer] - Optional customizer function for custom transformation logic.
 * @param {Map} cloneMap - Map used to track already cloned values to handle circular references.
 * @param {Function} assignProperty - Function to assign the processed value to the source object.
 * @returns {void}
 */
function cloneOrTransformValue(
  sourceValue,
  targetValue,
  propertyKey,
  processProperty,
  customizer,
  cloneMap,
  assignProperty
) {
  // Compute the keys for source and target using lp (likely a property accessor or key normalizer)
  const sourceKey = lp(sourceValue, propertyKey);
  const targetKey = lp(targetValue, propertyKey);

  // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this value (to handle circular references)
  const existingClone = cloneMap.get(targetKey);
  if (existingClone) {
    assignProperty(sourceValue, propertyKey, existingClone);
    return;
  }

  // Attempt to use a customizer function if provided
  const customizedValue = customizer ? customizer(sourceKey, targetKey, String(propertyKey), sourceValue, targetValue, cloneMap) : undefined;
  let shouldRecurse = customizedValue === undefined;
  let result;

  if (shouldRecurse) {
    const isTargetArray = J8(targetKey);
    const isTargetSet = !isTargetArray && SH(targetKey);
    const isTargetMap = !isTargetArray && !isTargetSet && Ey(targetKey);

    result = targetKey;

    // Handle Array, Set, and Map types
    if (isTargetArray || isTargetSet || isTargetMap) {
      if (J8(sourceKey)) {
        // If source is also an array, use isBlobOrFileLikeObject
        result = sourceKey;
      } else if ($4A(sourceKey)) {
        // If source is array-like, convert isBlobOrFileLikeObject
        result = P01(sourceKey);
      } else if (isTargetSet) {
        // If target is a Set, clone isBlobOrFileLikeObject
        shouldRecurse = false;
        result = dp(targetKey, true);
      } else if (isTargetMap) {
        // If target is a Map, clone isBlobOrFileLikeObject
        shouldRecurse = false;
        result = i01(targetKey, true);
      } else {
        // Fallback to empty array
        result = [];
      }
    } else if (mp(targetKey) || rE(targetKey)) {
      // Handle plain objects or arguments objects
      result = sourceKey;
      if (rE(sourceKey)) {
        // If source is arguments object, convert isBlobOrFileLikeObject
        result = q4A(sourceKey);
      } else if (!vB(sourceKey) || Vy(sourceKey)) {
        // If source is not a buffer or is a typed array, clone the target
        result = n01(targetKey);
      }
    } else {
      // Not a recognized type, do not recurse
      shouldRecurse = false;
    }
  } else {
    result = customizedValue;
  }

  // If handleMissingDoctypeError should recurse, set the clone in the map, process its properties, and then remove from the map
  if (shouldRecurse) {
    cloneMap.set(targetKey, result);
    processProperty(result, targetKey, processProperty, customizer, cloneMap);
    cloneMap.delete(targetKey);
  }

  // Assign the result to the source object
  assignProperty(sourceValue, propertyKey, result);
}

module.exports = cloneOrTransformValue;
