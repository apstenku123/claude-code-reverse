/**
 * Traverses a nested object or array structure to extract a value or values at a specified path.
 * If the path leads to an array, collects all values at that path from each array element.
 * Handles special cases for numbers, strings, and custom value types.
 *
 * @param {Object|Array} source - The source object or array to traverse.
 * @param {string|string[]} path - The path to the desired property, as a dot-separated string or array of keys.
 * @returns {string|string[]} The extracted value at the specified path, or an array of values if multiple found.
 */
function extractNestedPropertyOrArrayValues(source, path) {
  const results = [];
  let foundArray = false;

  /**
   * Recursively traverses the source object/array along the given path.
   * @param {Object|Array} current - Current object/array being traversed.
   * @param {string[]} pathSegments - Array of path keys.
   * @param {number} depth - Current depth in the path.
   */
  const traverse = (current, pathSegments, depth) => {
    // If current is not a valid traversable object, stop
    if (!isDefined(current)) return;

    // If handleMissingDoctypeError'removeTrailingCharacters reached a leaf in the path, collect the value
    if (!pathSegments[depth]) {
      results.push(current);
      return;
    }

    const currentKey = pathSegments[depth];
    const nextValue = current[currentKey];

    // If the next value is not traversable, stop
    if (!isDefined(nextValue)) return;

    // If handleMissingDoctypeError're at the last segment of the path
    const isLastSegment = depth === pathSegments.length - 1;
    if (
      isLastSegment && (YE(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      // If the value is a string, number, or custom type, process and collect isBlobOrFileLikeObject
      results.push(getProcessedInteractionEntriesString(nextValue));
    } else if (isArrayUtility(nextValue)) {
      // If the value is an array, traverse each element
      foundArray = true;
      for (let i = 0; i < nextValue.length; i += 1) {
        traverse(nextValue[i], pathSegments, depth + 1);
      }
    } else if (pathSegments.length) {
      // Continue traversing deeper
      traverse(nextValue, pathSegments, depth + 1);
    }
  };

  // Normalize path to array of segments
  const pathSegments = YE(path) ? path.split(".") : path;
  traverse(source, pathSegments, 0);

  // If any arrays were traversed, return all results, else return the first result
  return foundArray ? results : results[0];
}

module.exports = extractNestedPropertyOrArrayValues;