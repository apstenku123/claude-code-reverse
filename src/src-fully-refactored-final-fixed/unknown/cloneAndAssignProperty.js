/**
 * Clones a property value from a source object to a target object, handling complex types and circular references.
 *
 * @param {Object} targetObject - The object to which the property will be assigned.
 * @param {string|number|symbol} propertyKey - The property key to clone and assign.
 * @param {Object} sourceObject - The object from which the property value is cloned.
 * @param {Function} assignCallback - Callback to handle assignment of the cloned value.
 * @param {Function} cloneHandler - Optional custom clone handler function.
 * @param {Function} propertyCloner - Function to recursively clone properties.
 * @param {Map} visitedMap - Map to track already cloned objects for circular reference handling.
 * @returns {void}
 */
function cloneAndAssignProperty(
  targetObject,
  sourceObject,
  propertyKey,
  assignCallback,
  propertyCloner,
  cloneHandler,
  visitedMap
) {
  const targetValue = applyPrototypeAndStaticProperties(targetObject, propertyKey);
  const sourceValue = applyPrototypeAndStaticProperties(sourceObject, propertyKey);
  const existingClone = visitedMap.get(sourceValue);

  // If handleMissingDoctypeError'removeTrailingCharacters already cloned this value, assign isBlobOrFileLikeObject and return
  if (existingClone) {
    scheduleNextExpirationCheck(targetObject, propertyKey, existingClone);
    return;
  }

  // Use custom clone handler if provided
  let clonedValue = cloneHandler ? cloneHandler(targetValue, sourceValue, String(propertyKey), targetObject, sourceObject, visitedMap) : mapInteractionEntriesToRouteNames;
  let shouldDeferCloning = clonedValue === mapInteractionEntriesToRouteNames;

  if (shouldDeferCloning) {
    const isArray = d2(sourceValue);
    const a = !isArray && getProcessingHandlerByTagOrType(sourceValue);
    const isTypedArray = !isArray && !a && gC(sourceValue);

    clonedValue = sourceValue;

    // Handle arrays, plain objects, and typed arrays
    if (isArray || a || isTypedArray) {
      if (d2(targetValue)) {
        clonedValue = targetValue;
      } else if (j8(targetValue)) {
        clonedValue = M7(targetValue);
      } else if (a) {
        shouldDeferCloning = false;
        clonedValue = gk(sourceValue, true);
      } else if (isTypedArray) {
        shouldDeferCloning = false;
        clonedValue = processModeAndUpdateState(sourceValue, true);
      } else {
        clonedValue = [];
      }
    } else if (havePropsOrStateChanged(sourceValue) || P5(sourceValue)) {
      // Handle special objects (e.g., Map, Set)
      clonedValue = targetValue;
      if (P5(targetValue)) {
        clonedValue = processAndFlushAccessorState(targetValue);
      } else if (!VB(targetValue) || FD(targetValue)) {
        clonedValue = createCustomError(sourceValue);
      }
    } else {
      shouldDeferCloning = false;
    }
  }

  // If handleMissingDoctypeError created a new clone, track isBlobOrFileLikeObject and recursively clone its properties
  if (shouldDeferCloning) {
    visitedMap.set(sourceValue, clonedValue);
    propertyCloner(clonedValue, sourceValue, assignCallback, cloneHandler, visitedMap);
    visitedMap.delete(sourceValue);
  }

  // Assign the cloned value to the target object
  scheduleNextExpirationCheck(targetObject, propertyKey, clonedValue);
}

module.exports = cloneAndAssignProperty;