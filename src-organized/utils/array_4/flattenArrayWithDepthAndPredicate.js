/**
 * Recursively flattens an array up to a specified depth, optionally filtering elements with a predicate.
 *
 * @param {Array} inputArray - The array to flatten.
 * @param {number} depth - The maximum depth to flatten. If 0, no flattening occurs.
 * @param {Function} [predicate=isArray] - Optional. a function to test if an element should be flattened. Defaults to Array.isArray.
 * @param {boolean} [skipIfPredicateTrue=false] - Optional. If true, elements matching the predicate are skipped entirely (not included in the result).
 * @param {Array} [resultArray=[]] - Optional. The accumulator array for results (used for recursion).
 * @returns {Array} The flattened array, up to the specified depth, with optional filtering.
 */
function flattenArrayWithDepthAndPredicate(
  inputArray,
  depth,
  predicate = Array.isArray,
  skipIfPredicateTrue = false,
  resultArray = []
) {
  let index = -1;
  const length = inputArray.length;

  // Ensure predicate and resultArray have default values
  predicate = predicate || Array.isArray;
  resultArray = resultArray || [];

  while (++index < length) {
    const element = inputArray[index];
    // If depth allows and element matches predicate, flatten recursively
    if (depth > 0 && predicate(element)) {
      if (depth > 1) {
        // Recursively flatten deeper
        flattenArrayWithDepthAndPredicate(
          element,
          depth - 1,
          predicate,
          skipIfPredicateTrue,
          resultArray
        );
      } else {
        // At depth 1, push elements directly (Ry is assumed to push elements)
        resultArray.push(...element);
      }
    } else if (!skipIfPredicateTrue) {
      // If not skipping, add element to result
      resultArray[resultArray.length] = element;
    }
  }
  return resultArray;
}

module.exports = flattenArrayWithDepthAndPredicate;