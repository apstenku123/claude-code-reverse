/**
 * Clones or merges a value from a source object to a target object, using a cache to handle circular references and customizer functions for special cases.
 *
 * @param {Object} sourceValue - The value from the source object to clone or merge.
 * @param {Object} targetValue - The value from the target object to clone or merge.
 * @param {string|number} propertyKey - The property key currently being processed.
 * @param {Function} mergeFunction - The function to recursively merge properties.
 * @param {Function} [customizer] - Optional customizer function to control cloning/merging behavior.
 * @param {Map} cache - a Map used to track already cloned/merged objects to handle circular references.
 * @param {Function} assignFunction - Function to assign the merged/cloned value to the target object.
 * @returns {void}
 */
function cloneOrMergeValueWithCache(
  sourceValue,
  targetValue,
  propertyKey,
  mergeFunction,
  customizer,
  cache,
  assignFunction
) {
  // Generate unique cache keys for source and target values
  const sourceCacheKey = lp(sourceValue, propertyKey);
  const targetCacheKey = lp(targetValue, propertyKey);

  // Check if handleMissingDoctypeError'removeTrailingCharacters already processed this target value (circular reference handling)
  const cachedResult = cache.get(targetCacheKey);
  if (cachedResult) {
    cp(sourceValue, propertyKey, cachedResult);
    return;
  }

  // Try to use the customizer if provided
  let result = customizer ? customizer(sourceCacheKey, targetCacheKey, String(propertyKey), sourceValue, targetValue, cache) : undefined;
  let shouldRecurse = result === undefined;

  if (shouldRecurse) {
    // Determine the type of the target value
    const isTargetArray = J8(targetCacheKey);
    const isTargetBuffer = !isTargetArray && SH(targetCacheKey);
    const isTargetTypedArray = !isTargetArray && !isTargetBuffer && Ey(targetCacheKey);

    result = targetCacheKey;

    if (isTargetArray || isTargetBuffer || isTargetTypedArray) {
      // Handle array, buffer, or typed array
      if (J8(sourceCacheKey)) {
        result = sourceCacheKey;
      } else if ($4A(sourceCacheKey)) {
        result = P01(sourceCacheKey);
      } else if (isTargetBuffer) {
        shouldRecurse = false;
        result = dp(targetCacheKey, true);
      } else if (isTargetTypedArray) {
        shouldRecurse = false;
        result = i01(targetCacheKey, true);
      } else {
        result = [];
      }
    } else if (mp(targetCacheKey) || rE(targetCacheKey)) {
      // Handle plain objects or arguments objects
      result = sourceCacheKey;
      if (rE(sourceCacheKey)) {
        result = q4A(sourceCacheKey);
      } else if (!vB(sourceCacheKey) || Vy(sourceCacheKey)) {
        result = n01(targetCacheKey);
      }
    } else {
      shouldRecurse = false;
    }
  }

  // If handleMissingDoctypeError should recurse, add to cache and recursively merge/clone
  if (shouldRecurse) {
    cache.set(targetCacheKey, result);
    mergeFunction(result, targetCacheKey, mergeFunction, customizer, cache);
    cache.delete(targetCacheKey);
  }

  // Assign the result to the source object at the given property
  cp(sourceValue, propertyKey, result);
}

module.exports = cloneOrMergeValueWithCache;