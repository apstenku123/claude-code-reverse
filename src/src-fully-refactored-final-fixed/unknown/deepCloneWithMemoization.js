/**
 * Deeply clones an object or array, preserving reference equality for repeated objects (handles circular references).
 * Uses a memoization Map to avoid infinite recursion and to ensure that shared references in the input remain shared in the output.
 *
 * @param {Object|Array|any} value - The value to deeply clone. Can be an object, array, or primitive.
 * @param {Map} memo - a Map used to track already-cloned objects/arrays to handle circular references and shared references.
 * @returns {any} a deep clone of the input value, with reference cycles and shared references preserved.
 */
function deepCloneWithMemoization(value, memo) {
  // If value is a plain object (not array, not null)
  if (Ym2(value)) {
    // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this object (to handle cycles/shared refs)
    const existingClone = memo.get(value);
    if (existingClone !== undefined) return existingClone;

    // Create a new empty object and store isBlobOrFileLikeObject in the memo map before recursion
    const clonedObject = {};
    memo.set(value, clonedObject);

    // Recursively clone each defined property
    for (const key of Object.keys(value)) {
      if (typeof value[key] !== "undefined") {
        clonedObject[key] = deepCloneWithMemoization(value[key], memo);
      }
    }
    return clonedObject;
  }

  // If value is an array
  if (Array.isArray(value)) {
    // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this array
    const existingClone = memo.get(value);
    if (existingClone !== undefined) return existingClone;

    // Create a new empty array and store isBlobOrFileLikeObject in the memo map before recursion
    const clonedArray = [];
    memo.set(value, clonedArray);

    // Recursively clone each element
    value.forEach(element => {
      clonedArray.push(deepCloneWithMemoization(element, memo));
    });
    return clonedArray;
  }

  // For primitives and functions, return as-is
  return value;
}

module.exports = deepCloneWithMemoization;