/**
 * Deeply merges two objects or arrays with custom rules for handling undefined, arrays, and objects.
 * Handles circular references using a WeakMap. Supports deletion via undefined values.
 *
 * @param {any} target - The target object or array to merge into.
 * @param {any} source - The source object or array to merge from.
 * @param {number} [depth=0] - The current recursion depth (used internally for limiting recursion).
 * @param {WeakMap} [visited=new WeakMap()] - WeakMap for tracking visited objects to handle circular references.
 * @returns {any} - The deeply merged result.
 */
function deepMergeWithCustomRules(target, source, depth = 0, visited = new WeakMap()) {
  let result;
  // Prevent excessive recursion
  if (depth > rr4) return;
  depth++;

  // If either value is a primitive or special case, use the merge value function
  if (isPrimitiveOrSpecialObject(target) || isPrimitiveOrSpecialObject(source) || isFunction(source)) {
    result = cloneIfArrayLike(source);
  } else if (UG1(target)) {
    // If target is an array
    result = target.slice();
    if (UG1(source)) {
      // If both are arrays, merge each element
      for (let i = 0, len = source.length; i < len; i++) {
        result.push(cloneIfArrayLike(source[i]));
      }
    } else if (da(source)) {
      // If source is an object, merge its properties into the array
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        result[key] = cloneIfArrayLike(source[key]);
      }
    }
  } else if (da(target)) {
    // If target is an object
    if (da(source)) {
      // If source is also an object
      if (!tr4(target, source)) return source;
      result = Object.assign({}, target);
      const sourceKeys = Object.keys(source);
      for (let i = 0, keyCount = sourceKeys.length; i < keyCount; i++) {
        const key = sourceKeys[i];
        const sourceValue = source[key];
        if (isPrimitiveOrSpecialObject(sourceValue)) {
          // If the value is undefined or a special case, delete or assign
          if (typeof sourceValue === "undefined") {
            delete result[key];
          } else {
            result[key] = sourceValue;
          }
        } else {
          const targetValue = result[key];
          // If the key should be deleted based on custom logic
          if (hasMatchingEntryForKeyAndObject(target, key, visited) || hasMatchingEntryForKeyAndObject(source, key, visited)) {
            delete result[key];
          } else {
            // If both values are objects, track circular references
            if (da(targetValue) && da(sourceValue)) {
              const targetHistory = visited.get(targetValue) || [];
              const sourceHistory = visited.get(sourceValue) || [];
              targetHistory.push({ obj: target, key });
              sourceHistory.push({ obj: source, key });
              visited.set(targetValue, targetHistory);
              visited.set(sourceValue, sourceHistory);
            }
            // Recursively merge
            result[key] = deepMergeWithCustomRules(result[key], sourceValue, depth, visited);
          }
        }
      }
    } else {
      // If source is not an object, use source as the result
      result = source;
    }
  } else {
    // For all other types, use source as the result
    result = source;
  }
  return result;
}

module.exports = deepMergeWithCustomRules;