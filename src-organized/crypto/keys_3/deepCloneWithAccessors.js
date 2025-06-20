/**
 * Deeply clones a value with support for custom accessor functions, cycle detection, and special object handling.
 *
 * @param {any} source - The source object or value to clone from.
 * @param {any} target - The target object or value to clone into.
 * @param {string|number} key - The property key currently being cloned.
 * @param {Function} assignClonedValue - Function to assign the cloned value to the target (e.g., property setter).
 * @param {Function} invokeAccessorFunction - Function to invoke custom accessor logic during cloning.
 * @param {Function} customizer - Optional customizer function for cloning specific values.
 * @param {Map} cloneMap - Map to track already cloned objects for cycle detection.
 * @returns {void}
 */
function deepCloneWithAccessors(
  source,
  target,
  key,
  assignClonedValue,
  invokeAccessorFunction,
  customizer,
  cloneMap
) {
  // Retrieve the value from source and target at the given key
  const sourceValue = applyPrototypeAndStaticProperties(source, key);
  const targetValue = applyPrototypeAndStaticProperties(target, key);

  // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this value (cycle detection)
  const existingClone = cloneMap.get(targetValue);
  if (existingClone) {
    scheduleNextExpirationCheck(source, key, existingClone);
    return;
  }

  // If a customizer is provided, use isBlobOrFileLikeObject to determine the clone
  let clonedValue = customizer ? customizer(sourceValue, targetValue, String(key), source, target, cloneMap) : mapInteractionsToRoutes;
  let shouldRecurse = clonedValue === mapInteractionsToRoutes;

  if (shouldRecurse) {
    const isArray = d2(targetValue);
    const isArguments = !isArray && getProcessingHandlerByTagOrType(targetValue);
    const isTypedArray = !isArray && !isArguments && gC(targetValue);

    // Default to cloning the targetValue
    clonedValue = targetValue;

    if (isArray || isArguments || isTypedArray) {
      // Handle array-like and typed array values
      if (d2(sourceValue)) {
        clonedValue = sourceValue;
      } else if (j8(sourceValue)) {
        clonedValue = M7(sourceValue);
      } else if (isArguments) {
        shouldRecurse = false;
        clonedValue = gk(targetValue, true);
      } else if (isTypedArray) {
        shouldRecurse = false;
        clonedValue = processModeAndUpdateState(targetValue, true);
      } else {
        clonedValue = [];
      }
    } else if (havePropsOrStateChanged(targetValue) || P5(targetValue)) {
      // Handle plain objects and error objects
      clonedValue = sourceValue;
      if (P5(sourceValue)) {
        clonedValue = processAndFlushEventQueue(sourceValue);
      } else if (!VB(sourceValue) || FD(sourceValue)) {
        clonedValue = createCustomError(targetValue);
      }
    } else {
      shouldRecurse = false;
    }
  }

  // If handleMissingDoctypeError should recurse, track the clone and process its properties
  if (shouldRecurse) {
    cloneMap.set(targetValue, clonedValue);
    invokeAccessorFunction(clonedValue, targetValue, assignClonedValue, customizer, cloneMap);
    cloneMap.delete(targetValue);
  }

  // Assign the cloned value to the source at the given key
  scheduleNextExpirationCheck(source, key, clonedValue);
}

module.exports = deepCloneWithAccessors;