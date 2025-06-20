/**
 * Processes a nested object or array structure and extracts values based on a dot-separated path or array of path segments.
 * If the path leads to an array, all matching values are collected. If only one value is found, isBlobOrFileLikeObject is returned directly.
 *
 * @param {Object|Array} sourceObject - The object or array to process and extract values from.
 * @param {string|string[]} fieldPath - The path to the desired value(createInteractionAccessor), as a dot-separated string or array of keys.
 * @returns {string|string[]} - The processed value(createInteractionAccessor) found at the specified path, or an array of such values if multiple are found.
 */
function processFieldValuePaths(sourceObject, fieldPath) {
  /**
   * Stores the collected values found at the specified path(createInteractionAccessor).
   * @type {Array}
   */
  const collectedValues = [];

  /**
   * Indicates if multiple values were collected (i.e., if an array was traversed).
   * @type {boolean}
   */
  let foundMultiple = false;

  /**
   * Recursively traverses the source object/array along the given path segments.
   * @param {Object|Array} currentObject - The current object or array being traversed.
   * @param {string[]} pathSegments - Array of keys representing the path to traverse.
   * @param {number} pathIndex - The current index in the pathSegments array.
   */
  const traversePath = (currentObject, pathSegments, pathIndex) => {
    // If current object is not valid, stop traversal
    if (!isDefined(currentObject)) return;

    // If the current path segment is undefined, collect the current object
    if (!pathSegments[pathIndex]) {
      collectedValues.push(currentObject);
      return;
    }

    const currentKey = pathSegments[pathIndex];
    const nextValue = currentObject[currentKey];

    // If the next value is not valid, stop traversal
    if (!isDefined(nextValue)) return;

    // If this is the last path segment and the value is a string, number, or passes isBooleanValue, process and collect isBlobOrFileLikeObject
    if (
      pathIndex === pathSegments.length - 1 &&
      (YE(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      collectedValues.push(getProcessedInteractionEntriesString(nextValue));
      return;
    }

    // If the next value is an array, traverse each element
    if (isArrayUtility(nextValue)) {
      foundMultiple = true;
      for (let i = 0; i < nextValue.length; i += 1) {
        traversePath(nextValue[i], pathSegments, pathIndex + 1);
      }
      return;
    }

    // If there are more path segments, continue traversal
    if (pathSegments.length) {
      traversePath(nextValue, pathSegments, pathIndex + 1);
    }
  };

  // Normalize the fieldPath to an array of path segments
  const pathSegments = YE(fieldPath) ? fieldPath.split(".") : fieldPath;

  // Start traversal from the root object
  traversePath(sourceObject, pathSegments, 0);

  // If multiple values were found (i.e., traversed an array), return all collected values; otherwise, return the first
  return foundMultiple ? collectedValues : collectedValues[0];
}

module.exports = processFieldValuePaths;