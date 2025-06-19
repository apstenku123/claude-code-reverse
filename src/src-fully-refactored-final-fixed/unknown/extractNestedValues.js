/**
 * Extracts nested values from a source object/array based on a path descriptor, supporting arrays and custom value extraction.
 *
 * Traverses the source object/array along the provided path (dot-separated string or array of keys),
 * collecting values at the end of the path or recursively traversing arrays if encountered.
 *
 * @param {object|array} source - The object or array to extract values from.
 * @param {string|string[]} path - Dot-separated string or array describing the path to traverse.
 * @returns {any} - If a nested array is found, returns an array of extracted values; otherwise, returns the first value found or undefined.
 */
function extractNestedValues(source, path) {
  /**
   * Holds the extracted values found during traversal.
   * @type {any[]}
   */
  const extractedValues = [];

  /**
   * Indicates if an array was encountered during traversal.
   * @type {boolean}
   */
  let foundArray = false;

  /**
   * Recursively traverses the source object/array along the path, collecting values.
   *
   * @param {object|array} currentSource - The current object/array being traversed.
   * @param {string[]} pathSegments - Array of keys representing the path.
   * @param {number} pathIndex - Current index in the pathSegments array.
   */
  const traversePath = (currentSource, pathSegments, pathIndex) => {
    if (!isDefined(currentSource)) return; // Validate current source

    // If the current path segment does not exist, collect the current source
    if (!pathSegments[pathIndex]) {
      extractedValues.push(currentSource);
      return;
    }

    const currentKey = pathSegments[pathIndex];
    const nextValue = currentSource[currentKey];

    if (!isDefined(nextValue)) return; // Validate next value

    // If at the end of the path, and the value is a valid leaf, collect isBlobOrFileLikeObject
    if (
      pathIndex === pathSegments.length - 1 &&
      (YE(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      extractedValues.push(getProcessedInteractionEntriesString(nextValue));
      return;
    }

    // If the next value is an array, recursively traverse each element
    if (isArrayUtility(nextValue)) {
      foundArray = true;
      for (let i = 0; i < nextValue.length; i += 1) {
        traversePath(nextValue[i], pathSegments, pathIndex + 1);
      }
      return;
    }

    // Continue traversing if there are more path segments
    if (pathSegments.length) {
      traversePath(nextValue, pathSegments, pathIndex + 1);
    }
  };

  // Normalize the path to an array of keys
  const pathSegments = YE(path) ? path.split('.') : path;

  // Begin traversal from the root
  traversePath(source, pathSegments, 0);

  // Return all collected values if an array was found, otherwise just the first value
  return foundArray ? extractedValues : extractedValues[0];
}

module.exports = extractNestedValues;