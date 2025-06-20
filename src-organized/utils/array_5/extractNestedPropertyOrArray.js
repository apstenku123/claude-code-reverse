/**
 * Traverses an object or array structure based on a provided path, extracting either a single value or an array of values.
 * If the path leads to an array, all matching values are collected; otherwise, the single value is returned.
 *
 * @param {object} sourceObject - The object or array to traverse.
 * @param {string|string[]} propertyPath - Dot-separated string or array representing the path to traverse.
 * @returns {any} The extracted value(createInteractionAccessor): either a single value or an array of values if multiple matches are found.
 */
function extractNestedPropertyOrArray(sourceObject, propertyPath) {
  /**
   * Stores all found values when traversing arrays.
   * @type {any[]}
   */
  const collectedValues = [];

  /**
   * Indicates if any arrays were encountered during traversal.
   * @type {boolean}
   */
  let foundArray = false;

  /**
   * Recursively traverses the object structure following the property path.
   * @param {object|array} currentObject - The current object or array being traversed.
   * @param {string[]} pathSegments - Array of property names representing the path.
   * @param {number} pathIndex - Current index in the pathSegments array.
   */
  const traverse = (currentObject, pathSegments, pathIndex) => {
    if (!isDefined(currentObject)) return; // If current object is not traversable, exit

    // If the current path segment does not exist, collect the current object
    if (!pathSegments[pathIndex]) {
      collectedValues.push(currentObject);
      return;
    }

    const currentKey = pathSegments[pathIndex];
    const nextValue = currentObject[currentKey];

    if (!isDefined(nextValue)) return; // If next value is not traversable, exit

    // If this is the last segment in the path
    if (
      pathIndex === pathSegments.length - 1 &&
      (YE(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      // Process and collect the value
      collectedValues.push(getProcessedInteractionEntriesString(nextValue));
    } else if (isArrayUtility(nextValue)) {
      // If the next value is an array, traverse each element
      foundArray = true;
      for (let i = 0, len = nextValue.length; i < len; i += 1) {
        traverse(nextValue[i], pathSegments, pathIndex + 1);
      }
    } else if (pathSegments.length) {
      // Continue traversing deeper into the object
      traverse(nextValue, pathSegments, pathIndex + 1);
    }
  };

  // Normalize propertyPath to an array of segments
  const pathSegments = YE(propertyPath) ? propertyPath.split(".") : propertyPath;

  // Start traversal from the root object
  traverse(sourceObject, pathSegments, 0);

  // If any arrays were found, return all collected values; otherwise, return the first value
  return foundArray ? collectedValues : collectedValues[0];
}

module.exports = extractNestedPropertyOrArray;