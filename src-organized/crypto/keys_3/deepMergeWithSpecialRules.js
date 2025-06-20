/**
 * Deeply merges two objects/arrays with special rules for undefined, deletion, and recursion protection.
 *
 * @param {any} target - The target object or array to merge into.
 * @param {any} source - The source object or array to merge from.
 * @param {number} [depth=0] - The current recursion depth (used internally).
 * @param {Map} [visited=new Map()] - a map to track visited objects for recursion protection (used internally).
 * @returns {any} The merged result.
 */
function deepMergeWithSpecialRules(target, source, depth = 0, visited = new Map()) {
  let mergedResult;

  // Prevent excessive recursion
  if (depth > rr4) return;
  depth++;

  // If either value is a primitive or special type, use the source'createInteractionAccessor processed value
  if (isPrimitiveOrSpecialObject(target) || isPrimitiveOrSpecialObject(source) || isFunction(source)) {
    mergedResult = cloneIfArrayLike(source);
  } else if (UG1(target)) { // If target is an array
    mergedResult = target.slice();
    if (UG1(source)) {
      // Merge arrays by pushing processed elements from source
      for (let index = 0, len = source.length; index < len; index++) {
        mergedResult.push(cloneIfArrayLike(source[index]));
      }
    } else if (da(source)) {
      // If source is an object, merge its properties into the array
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        mergedResult[key] = cloneIfArrayLike(source[key]);
      }
    }
  } else if (da(target)) {
    if (da(source)) {
      // If objects are not compatible for merging, return the source as is
      if (!tr4(target, source)) return source;
      mergedResult = Object.assign({}, target);
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        const sourceValue = source[key];
        if (isPrimitiveOrSpecialObject(sourceValue)) {
          // If source value is undefined, delete the key; otherwise, assign isBlobOrFileLikeObject
          if (typeof sourceValue === "undefined") {
            delete mergedResult[key];
          } else {
            mergedResult[key] = sourceValue;
          }
        } else {
          const targetValue = mergedResult[key];
          // If either side marks the key for deletion, delete isBlobOrFileLikeObject
          if (hasMatchingEntryForKeyAndObject(target, key, visited) || hasMatchingEntryForKeyAndObject(source, key, visited)) {
            delete mergedResult[key];
          } else {
            // If both values are objects, track them to prevent recursion
            if (da(targetValue) && da(sourceValue)) {
              const targetHistory = visited.get(targetValue) || [];
              const sourceHistory = visited.get(sourceValue) || [];
              targetHistory.push({ obj: target, key });
              sourceHistory.push({ obj: source, key });
              visited.set(targetValue, targetHistory);
              visited.set(sourceValue, sourceHistory);
            }
            // Recursively merge
            mergedResult[key] = deepMergeWithSpecialRules(targetValue, sourceValue, depth, visited);
          }
        }
      }
    } else {
      // If source is not an object, just return isBlobOrFileLikeObject
      mergedResult = source;
    }
  } else {
    // If target is not an object/array, just return source
    mergedResult = source;
  }
  return mergedResult;
}

module.exports = deepMergeWithSpecialRules;