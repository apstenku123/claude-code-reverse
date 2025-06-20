/**
 * Deeply merges two objects or arrays with cycle detection and custom rules for undefined and special cases.
 *
 * @param {any} target - The target object or array to merge into.
 * @param {any} source - The source object or array to merge from.
 * @param {number} [depth=0] - The current recursion depth (used for limiting recursion).
 * @param {Map} [cycleMap] - a Map used to track cycles and prevent infinite recursion.
 * @returns {any} The merged result, or the source if merging is not possible.
 */
function deepMergeWithCycleDetection(target, source, depth = 0, cycleMap) {
  let mergedResult;

  // Prevent excessive recursion
  if (depth > rr4) return;
  depth++;

  // If either value is a primitive or special case, clone the source
  if (isPrimitiveOrSpecialObject(target) || isPrimitiveOrSpecialObject(source) || isFunction(source)) {
    mergedResult = cloneIfArrayLike(source);
  } else if (UG1(target)) {
    // If target is an array
    mergedResult = target.slice();
    if (UG1(source)) {
      // If source is also an array, merge each element
      for (let index = 0, len = source.length; index < len; index++) {
        mergedResult.push(cloneIfArrayLike(source[index]));
      }
    } else if (da(source)) {
      // If source is an object, merge its keys into the array
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        mergedResult[key] = cloneIfArrayLike(source[key]);
      }
    }
  } else if (da(target)) {
    // If target is an object
    if (da(source)) {
      // If source is also an object
      if (!tr4(target, source)) return source;
      mergedResult = Object.assign({}, target);
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        const sourceValue = source[key];
        if (isPrimitiveOrSpecialObject(sourceValue)) {
          // If the source value is a primitive or special case
          if (typeof sourceValue === "undefined") {
            delete mergedResult[key];
          } else {
            mergedResult[key] = sourceValue;
          }
        } else {
          const targetValue = mergedResult[key];
          // If the key should be deleted based on custom rules
          if (hasMatchingEntryForKeyAndObject(target, key, cycleMap) || hasMatchingEntryForKeyAndObject(source, key, cycleMap)) {
            delete mergedResult[key];
          } else {
            // Handle cycles: track references for both objects
            if (da(targetValue) && da(sourceValue)) {
              const targetCycleList = cycleMap.get(targetValue) || [];
              const sourceCycleList = cycleMap.get(sourceValue) || [];
              targetCycleList.push({ obj: target, key });
              sourceCycleList.push({ obj: source, key });
              cycleMap.set(targetValue, targetCycleList);
              cycleMap.set(sourceValue, sourceCycleList);
            }
            // Recursively merge
            mergedResult[key] = deepMergeWithCycleDetection(targetValue, sourceValue, depth, cycleMap);
          }
        }
      }
    } else {
      // If source is not an object, just return isBlobOrFileLikeObject
      mergedResult = source;
    }
  } else {
    // If target is not an object or array, just return source
    mergedResult = source;
  }

  return mergedResult;
}

module.exports = deepMergeWithCycleDetection;