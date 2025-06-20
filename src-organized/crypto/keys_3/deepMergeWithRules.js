/**
 * Deeply merges two objects or arrays with special rules for undefined, arrays, and objects.
 * Handles circular references and custom deletion logic.
 *
 * @param {any} target - The target object or array to merge into.
 * @param {any} source - The source object or array to merge from.
 * @param {number} [depth=0] - The current recursion depth (used internally to prevent stack overflow).
 * @param {Map} [circularReferenceMap=new Map()] - Map to track circular references (used internally).
 * @returns {any} The deeply merged result, or the source if merging is not possible.
 */
function deepMergeWithRules(target, source, depth = 0, circularReferenceMap = new Map()) {
  let mergedResult;

  // Prevent excessive recursion
  if (depth > rr4) return;
  depth++;

  // If either target or source is a primitive or special value, or source is a primitive, clone source
  if (isPrimitiveOrSpecialObject(target) || isPrimitiveOrSpecialObject(source) || isFunction(source)) {
    mergedResult = cloneIfArrayLike(source);
  }
  // If target is an array
  else if (UG1(target)) {
    mergedResult = target.slice(); // Shallow copy of the array
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
  }
  // If both target and source are plain objects
  else if (da(target)) {
    if (da(source)) {
      // If objects are not mergeable, return source
      if (!tr4(target, source)) return source;
      mergedResult = Object.assign({}, target);
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        const sourceValue = source[key];
        // If source value is a primitive or undefined
        if (isPrimitiveOrSpecialObject(sourceValue)) {
          if (typeof sourceValue === "undefined") {
            // Delete key if source value is undefined
            delete mergedResult[key];
          } else {
            // Otherwise, assign the primitive value
            mergedResult[key] = sourceValue;
          }
        } else {
          const targetValue = mergedResult[key];
          // If deletion rules apply, delete the key
          if (hasMatchingEntryForKeyAndObject(target, key, circularReferenceMap) || hasMatchingEntryForKeyAndObject(source, key, circularReferenceMap)) {
            delete mergedResult[key];
          } else {
            // If both values are objects, track circular references
            if (da(targetValue) && da(sourceValue)) {
              const targetRefs = circularReferenceMap.get(targetValue) || [];
              const sourceRefs = circularReferenceMap.get(sourceValue) || [];
              targetRefs.push({ obj: target, key });
              sourceRefs.push({ obj: source, key });
              circularReferenceMap.set(targetValue, targetRefs);
              circularReferenceMap.set(sourceValue, sourceRefs);
            }
            // Recursively merge
            mergedResult[key] = deepMergeWithRules(targetValue, sourceValue, depth, circularReferenceMap);
          }
        }
      }
    } else {
      // If source is not an object, just return source
      mergedResult = source;
    }
  } else {
    // If target is not an object or array, just return source
    mergedResult = source;
  }

  return mergedResult;
}

module.exports = deepMergeWithRules;