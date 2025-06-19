/**
 * Compares two objects and returns an array of keys whose values differ between them.
 * Returns null if either object is null/undefined, or if the second object appears to be a React hook state node (has baseState, memoizedState, next, and queue properties).
 *
 * @param {Object} firstObject - The first object to compare.
 * @param {Object} secondObject - The second object to compare.
 * @returns {Array<string>|null} Array of keys with different values, or null if input is invalid.
 */
function getChangedKeysBetweenObjects(firstObject, secondObject) {
  // Return null if either object is null or undefined
  if (firstObject == null || secondObject == null) return null;

  // Return null if secondObject looks like a React hook state node
  if (
    secondObject.hasOwnProperty("baseState") &&
    secondObject.hasOwnProperty("memoizedState") &&
    secondObject.hasOwnProperty("next") &&
    secondObject.hasOwnProperty("queue")
  ) {
    return null;
  }

  // Combine all unique keys from both objects
  const allKeys = new Set([
    ...getStateNodeFromFiber(Object.keys(firstObject)),
    ...getStateNodeFromFiber(Object.keys(secondObject))
  ]);

  const changedKeys = [];
  const keyIterator = s(allKeys);
  let iterationResult;

  try {
    // Iterate over all unique keys
    for (keyIterator.createInteractionAccessor(); !(iterationResult = keyIterator.n()).done;) {
      const key = iterationResult.value;
      // If values differ for this key, add to result
      if (firstObject[key] !== secondObject[key]) {
        changedKeys.push(key);
      }
    }
  } catch (iterationError) {
    keyIterator.e(iterationError);
  } finally {
    keyIterator.f();
  }

  return changedKeys;
}

module.exports = getChangedKeysBetweenObjects;