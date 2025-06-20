/**
 * Deeply merges two objects or arrays, handling cycles and special cases.
 *
 * @param {any} target - The target object or array to merge into.
 * @param {any} source - The source object or array to merge from.
 * @param {number} [depth=0] - The current recursion depth (used internally for cycle protection).
 * @param {Map} [cycleMap] - a Map used to track objects/arrays already visited to prevent infinite recursion.
 * @returns {any} - The deeply merged object or array.
 */
function deepMergeWithCycleTracking(target, source, depth = 0, cycleMap) {
  let mergedResult;

  // Prevent excessive recursion
  if (depth > rr4) return;
  depth++;

  // If either value is a primitive or special type, clone source
  if (isPrimitiveOrSpecialObject(target) || isPrimitiveOrSpecialObject(source) || isFunction(source)) {
    mergedResult = cloneIfArrayLike(source);
  }
  // If target is an array
  else if (UG1(target)) {
    mergedResult = target.slice(); // Shallow copy of target array
    if (UG1(source)) {
      // Merge arrays by pushing cloned elements from source
      for (let index = 0, len = source.length; index < len; index++) {
        mergedResult.push(cloneIfArrayLike(source[index]));
      }
    } else if (da(source)) {
      // If source is an object, merge its properties into the array
      const sourceKeys = Object.keys(source);
      for (let keyIndex = 0, keyLen = sourceKeys.length; keyIndex < keyLen; keyIndex++) {
        const key = sourceKeys[keyIndex];
        mergedResult[key] = cloneIfArrayLike(source[key]);
      }
    }
  }
  // If both target and source are objects
  else if (da(target)) {
    if (da(source)) {
      // If objects are not compatible for merging, return source
      if (!tr4(target, source)) return source;
      mergedResult = Object.assign({}, target);
      const sourceKeys = Object.keys(source);
      for (let keyIndex = 0, keyLen = sourceKeys.length; keyIndex < keyLen; keyIndex++) {
        const key = sourceKeys[keyIndex];
        const sourceValue = source[key];
        // If the source value is a primitive or special type
        if (isPrimitiveOrSpecialObject(sourceValue)) {
          if (typeof sourceValue === "undefined") {
            delete mergedResult[key];
          } else {
            mergedResult[key] = sourceValue;
          }
        } else {
          const targetValue = mergedResult[key];
          // If the key should be deleted based on custom logic
          if (hasMatchingEntryForKeyAndObject(target, key, cycleMap) || hasMatchingEntryForKeyAndObject(source, key, cycleMap)) {
            delete mergedResult[key];
          } else {
            // If both values are objects, track cycles
            if (da(targetValue) && da(sourceValue)) {
              const targetCycleList = cycleMap.get(targetValue) || [];
              const sourceCycleList = cycleMap.get(sourceValue) || [];
              targetCycleList.push({ obj: target, key });
              sourceCycleList.push({ obj: source, key });
              cycleMap.set(targetValue, targetCycleList);
              cycleMap.set(sourceValue, sourceCycleList);
            }
            // Recursively merge
            mergedResult[key] = deepMergeWithCycleTracking(mergedResult[key], sourceValue, depth, cycleMap);
          }
        }
      }
    } else {
      // If source is not an object, just return source
      mergedResult = source;
    }
  } else {
    // If none of the above, just return source
    mergedResult = source;
  }

  return mergedResult;
}

module.exports = deepMergeWithCycleTracking;