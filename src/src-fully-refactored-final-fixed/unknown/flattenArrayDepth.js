/**
 * Recursively flattens an array up to the specified depth, using a predicate to determine if an item is flattenable.
 *
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum depth to flatten.
 * @param {Function} isFlattenable Predicate function to determine if an item should be flattened further. Defaults to NJ if not provided.
 * @param {boolean} [skipNonFlattenable=false] If true, non-flattenable items are skipped; otherwise, they are included in the result.
 * @param {Array} [result=[]] The accumulator array for the flattened result.
 * @returns {Array} The flattened array.
 */
function flattenArrayDepth(array, depth, isFlattenable, skipNonFlattenable = false, result = []) {
  let index = -1;
  const arrayLength = array.length;
  // Provide default predicate if not supplied
  if (!isFlattenable) isFlattenable = NJ;
  // Provide default result accumulator if not supplied
  if (!result) result = [];

  while (++index < arrayLength) {
    const value = array[index];
    // If value is flattenable and depth allows, flatten recursively
    if (depth > 0 && isFlattenable(value)) {
      if (depth > 1) {
        flattenArrayDepth(value, depth - 1, isFlattenable, skipNonFlattenable, result);
      } else {
        isReadModeWithoutFlag(result, value); // Add value to result using helper (e.g., push or custom logic)
      }
    } else if (!skipNonFlattenable) {
      // If not flattenable and not skipping, add to result
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = flattenArrayDepth;