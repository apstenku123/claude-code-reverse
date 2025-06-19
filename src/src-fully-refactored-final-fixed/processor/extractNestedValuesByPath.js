/**
 * Extracts values from a nested object or array structure based on a provided path.
 * If the path leads to arrays, collects all matching values recursively.
 * Returns either the first matching value or an array of all matches, depending on the structure.
 *
 * @param {object|array} sourceObject - The object or array to extract values from.
 * @param {string|string[]} path - The path to traverse, as a dot-separated string or array of keys.
 * @returns {any|any[]} The extracted value(createInteractionAccessor) at the specified path, or undefined if not found.
 */
function extractNestedValuesByPath(sourceObject, path) {
  const results = [];
  let foundArray = false;

  /**
   * Recursively traverses the object structure according to the path.
   * @param {object|array} currentValue - The current value in the traversal.
   * @param {string[]} pathSegments - The array of path keys.
   * @param {number} pathIndex - The current index in the path.
   */
  const traverse = (currentValue, pathSegments, pathIndex) => {
    if (!isDefined(currentValue)) return; // If current value is not traversable, exit

    // If the current path segment is undefined, push the current value
    if (!pathSegments[pathIndex]) {
      results.push(currentValue);
      return;
    }

    const currentKey = pathSegments[pathIndex];
    const nextValue = currentValue[currentKey];

    if (!isDefined(nextValue)) return; // If next value is not traversable, exit

    // If this is the last segment in the path
    if (
      pathIndex === pathSegments.length - 1 &&
      (YE(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      // If the value is a string, number, or matches isBooleanValue, push the mapped string
      results.push(getProcessedInteractionEntriesString(nextValue));
    } else if (isArrayUtility(nextValue)) {
      // If the next value is an array, traverse each element
      foundArray = true;
      for (let i = 0; i < nextValue.length; i += 1) {
        traverse(nextValue[i], pathSegments, pathIndex + 1);
      }
    } else if (pathSegments.length) {
      // Continue traversing deeper
      traverse(nextValue, pathSegments, pathIndex + 1);
    }
  };

  // Normalize path to an array of keys
  const pathSegments = YE(path) ? path.split('.') : path;
  traverse(sourceObject, pathSegments, 0);

  // If an array was found during traversal, return all results; otherwise, return the first result
  return foundArray ? results : results[0];
}

module.exports = extractNestedValuesByPath;