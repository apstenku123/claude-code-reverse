/**
 * Clones a value from a source object to a target object, handling special cases for complex types and allowing custom clone handlers.
 *
 * @param {Object} sourceObject - The object from which the value is being cloned.
 * @param {Object} targetObject - The object to which the value is being cloned.
 * @param {string|number} propertyKey - The property key being cloned.
 * @param {Function} cloneCallback - Callback to handle the cloned value after processing.
 * @param {Function} [customCloneHandler] - Optional custom handler for cloning specific values.
 * @param {Map} cloneMap - Map used to track already cloned objects to handle circular references.
 * @param {Function} setClonedValue - Function to set the cloned value on the target object.
 * @returns {void}
 */
function cloneValueWithCustomHandlers(
  sourceObject,
  targetObject,
  propertyKey,
  cloneCallback,
  customCloneHandler,
  cloneMap,
  setClonedValue
) {
  // Get the value from source and target for the given propertyKey
  const sourceValue = lp(sourceObject, propertyKey);
  const targetValue = lp(targetObject, propertyKey);

  // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this value (to handle circular references)
  const existingClone = cloneMap.get(targetValue);
  if (existingClone) {
    cp(sourceObject, propertyKey, existingClone);
    return;
  }

  // Try custom clone handler if provided
  let clonedValue = customCloneHandler
    ? customCloneHandler(sourceValue, targetValue, String(propertyKey), sourceObject, targetObject, cloneMap)
    : undefined;
  let shouldRecurse = clonedValue === undefined;

  if (shouldRecurse) {
    const isTargetArray = J8(targetValue);
    const isTargetSet = !isTargetArray && SH(targetValue);
    const isTargetMap = !isTargetArray && !isTargetSet && Ey(targetValue);

    // Default clone logic for arrays, sets, and maps
    clonedValue = targetValue;
    if (isTargetArray || isTargetSet || isTargetMap) {
      if (J8(sourceValue)) {
        clonedValue = sourceValue;
      } else if ($4A(sourceValue)) {
        clonedValue = P01(sourceValue);
      } else if (isTargetSet) {
        shouldRecurse = false;
        clonedValue = dp(targetValue, true);
      } else if (isTargetMap) {
        shouldRecurse = false;
        clonedValue = i01(targetValue, true);
      } else {
        clonedValue = [];
      }
    } else if (mp(targetValue) || rE(targetValue)) {
      // Handle plain objects and special objects
      clonedValue = sourceValue;
      if (rE(sourceValue)) {
        clonedValue = q4A(sourceValue);
      } else if (!vB(sourceValue) || Vy(sourceValue)) {
        clonedValue = n01(targetValue);
      }
    } else {
      // Not a cloneable type
      shouldRecurse = false;
    }
  }

  // If handleMissingDoctypeError should recurse, set in map, process children, then clean up
  if (shouldRecurse) {
    cloneMap.set(targetValue, clonedValue);
    cloneCallback(clonedValue, targetValue, cloneCallback, customCloneHandler, cloneMap);
    cloneMap.delete(targetValue);
  }

  // Set the cloned value on the source object
  cp(sourceObject, propertyKey, clonedValue);
}

module.exports = cloneValueWithCustomHandlers;