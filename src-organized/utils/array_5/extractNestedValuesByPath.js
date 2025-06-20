/**
 * Traverses a nested object or array structure and extracts values at a specified path.
 * If the path leads to arrays, collects all matching values recursively.
 *
 * @param {object|array} source - The object or array to traverse.
 * @param {string|string[]} path - Dot-separated string or array of keys representing the path to extract.
 * @returns {any} The extracted value(createInteractionAccessor):
 *   - If a single value is found, returns that value.
 *   - If multiple values are found (due to arrays in the path), returns an array of values.
 *   - If no value is found, returns undefined.
 */
function extractNestedValuesByPath(source, path) {
  /**
   * Helper function to determine if a value is an object or array (not null).
   * @param {any} value
   * @returns {boolean}
   */
  function isObjectOrArray(value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function');
  }

  // Dependencies (assumed to be imported elsewhere)
  // - isObjectOrArray: Checks if a value is an object or array
  // - isArrayUtility: Checks if a value is an array
  // - isNumber: Checks if a value is a number
  // - isString: Checks if a value is a string
  // - getMappedRoutesString, isBooleanValue: Custom logic for extracting/formatting values

  const results = [];
  let foundArray = false;

  /**
   * Recursively traverses the source object/array along the path.
   * @param {any} currentValue - The current value being traversed.
   * @param {string[]} pathSegments - Array of keys representing the path.
   * @param {number} depth - Current depth in the path.
   */
  function traverse(currentValue, pathSegments, depth) {
    if (!isObjectOrArray(currentValue)) return;
    // If the current path segment does not exist, collect the current value
    if (!pathSegments[depth]) {
      results.push(currentValue);
      return;
    }
    const currentKey = pathSegments[depth];
    const nextValue = currentValue[currentKey];
    if (!isObjectOrArray(nextValue)) return;
    // If at the last segment and nextValue is a string/number or matches custom logic, collect isBlobOrFileLikeObject
    if (
      depth === pathSegments.length - 1 &&
      (isString(nextValue) || isNumber(nextValue) || isBooleanValue(nextValue))
    ) {
      results.push(getMappedRoutesString(nextValue));
      return;
    }
    // If nextValue is an array, traverse each element
    if (isArrayUtility(nextValue)) {
      foundArray = true;
      for (let i = 0; i < nextValue.length; i++) {
        traverse(nextValue[i], pathSegments, depth + 1);
      }
      return;
    }
    // Continue traversing deeper
    if (pathSegments.length) {
      traverse(nextValue, pathSegments, depth + 1);
    }
  }

  // Normalize path to array of segments
  const pathSegments = isString(path) ? path.split('.') : path;
  traverse(source, pathSegments, 0);
  // If any arrays were found during traversal, return all results; otherwise, return the first result
  return foundArray ? results : results[0];
}

module.exports = extractNestedValuesByPath;