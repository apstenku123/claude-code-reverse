/**
 * Deeply clones a value from a source object to a target object, handling special types and supporting custom accessor logic.
 *
 * If a custom accessor function is provided, isBlobOrFileLikeObject is used to determine the clone value. Otherwise, the function handles arrays, objects,
 * and other special types (such as Maps, Sets, etc.) with appropriate cloning logic. The function also manages circular references
 * using a WeakMap cache.
 *
 * @param {Object} targetObject - The object to which the value will be assigned.
 * @param {string|number|symbol} propertyKey - The property key on the target object.
 * @param {Object} sourceObject - The object from which the value is cloned.
 * @param {Function} assignCallback - Callback to assign the cloned value to the target object.
 * @param {Function} cloneHandler - Optional custom handler for cloning values.
 * @param {Function} accessorProxy - Proxy function to handle accessor logic during cloning.
 * @param {WeakMap} cloneCache - WeakMap to track already cloned objects and handle circular references.
 * @returns {void}
 */
function deepCloneWithCustomHandlers(
  targetObject,
  propertyKey,
  sourceObject,
  assignCallback,
  accessorProxy,
  cloneHandler,
  cloneCache
) {
  const targetValue = applyPrototypeAndStaticProperties(targetObject, propertyKey);
  const sourceValue = applyPrototypeAndStaticProperties(sourceObject, propertyKey);
  const cachedClone = cloneCache.get(sourceValue);

  // If handleMissingDoctypeError'removeTrailingCharacters already cloned this value, assign isBlobOrFileLikeObject and return (handles circular refs)
  if (cachedClone) {
    scheduleNextExpirationCheck(targetObject, propertyKey, cachedClone);
    return;
  }

  // If a custom clone handler is provided, use isBlobOrFileLikeObject
  let clonedValue = cloneHandler
    ? cloneHandler(targetValue, sourceValue, String(propertyKey), targetObject, sourceObject, cloneCache)
    : processInteractionEntries;

  let shouldDeferCloning = clonedValue === processInteractionEntries;

  if (shouldDeferCloning) {
    const isArray = d2(sourceValue);
    const a = !isArray && getProcessingHandlerByTagOrType(sourceValue);
    const isSpecialCollection = !isArray && !a && gC(sourceValue);

    // Default to cloning the source value
    clonedValue = sourceValue;

    if (isArray || a || isSpecialCollection) {
      // Handle arrays and special collections
      if (d2(targetValue)) {
        clonedValue = targetValue;
      } else if (j8(targetValue)) {
        clonedValue = M7(targetValue);
      } else if (a) {
        shouldDeferCloning = false;
        clonedValue = gk(sourceValue, true);
      } else if (isSpecialCollection) {
        shouldDeferCloning = false;
        clonedValue = processModeAndUpdateState(sourceValue, true);
      } else {
        clonedValue = [];
      }
    } else if (havePropsOrStateChanged(sourceValue) || P5(sourceValue)) {
      // Handle custom error objects or other special types
      clonedValue = targetValue;
      if (P5(targetValue)) {
        clonedValue = processAndFlushInteractionQueue(targetValue);
      } else if (!VB(targetValue) || FD(targetValue)) {
        clonedValue = createCustomError(sourceValue);
      }
    } else {
      shouldDeferCloning = false;
    }
  }

  // If handleMissingDoctypeError are still in a deferred state, cache and recursively clone
  if (shouldDeferCloning) {
    cloneCache.set(sourceValue, clonedValue);
    accessorProxy(clonedValue, sourceValue, assignCallback, cloneHandler, cloneCache);
    cloneCache.delete(sourceValue);
  }

  // Assign the cloned value to the target object
  scheduleNextExpirationCheck(targetObject, propertyKey, clonedValue);
}

module.exports = deepCloneWithCustomHandlers;