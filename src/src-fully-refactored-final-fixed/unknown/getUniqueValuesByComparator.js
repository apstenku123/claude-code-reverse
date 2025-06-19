/**
 * Returns a new array containing unique values from the source array, using a comparator array and optional iteratee and comparator functions.
 *
 * @param {Array} sourceArray - The array to inspect for unique values.
 * @param {Array} comparatorArray - The array to compare against for uniqueness.
 * @param {Function} [iteratee] - Optional function to transform each value before comparison.
 * @param {Function} [comparator] - Optional comparator function to determine equality between values.
 * @returns {Array} Array of unique values from sourceArray not found in comparatorArray (according to iteratee and comparator).
 */
function getUniqueValuesByComparator(sourceArray, comparatorArray, iteratee, comparator) {
  let sourceIndex = -1;
  let compareFunction = defaultCompareFunction;
  let useStrictComparison = true;
  const sourceLength = sourceArray.length;
  const result = [];
  let comparatorArrayLength = comparatorArray.length;

  // If the source array is empty, return empty result
  if (!sourceLength) return result;

  // If an iteratee is provided, transform comparatorArray values
  if (iteratee) {
    comparatorArray = mapArrayWithIteratee(comparatorArray, getIterateeFunction(iteratee));
  }

  // If a custom comparator is provided, use isBlobOrFileLikeObject
  if (comparator) {
    compareFunction = customComparatorFunction;
    useStrictComparison = false;
  } else if (comparatorArray.length >= LARGE_ARRAY_SIZE) {
    // If comparatorArray is large, use a Set-based comparison for efficiency
    compareFunction = setBasedComparatorFunction;
    useStrictComparison = false;
    comparatorArray = new SetWrapper(comparatorArray);
  }

  // Main loop: iterate over sourceArray
  outer: while (++sourceIndex < sourceLength) {
    let currentValue = sourceArray[sourceIndex];
    // Apply iteratee if provided, else use value as is
    const computedValue = iteratee == null ? currentValue : iteratee(currentValue);
    // Handle -0 edge case if no comparator is provided
    currentValue = comparator || currentValue !== 0 ? currentValue : 0;

    if (useStrictComparison && computedValue === computedValue) {
      // Strict comparison: check if computedValue exists in comparatorArray
      let innerIndex = comparatorArrayLength;
      while (innerIndex--) {
        if (comparatorArray[innerIndex] === computedValue) continue outer;
      }
      result.push(currentValue);
    } else if (!compareFunction(comparatorArray, computedValue, comparator)) {
      // Custom or set-based comparison
      result.push(currentValue);
    }
  }

  return result;
}

// --- Helper Functions and Constants (assumed to be defined elsewhere) ---
// These are placeholders for the actual implementations in your codebase.
const defaultCompareFunction = OB; // Default comparison function
const customComparatorFunction = markChildAsDeleted; // Custom comparator function
const setBasedComparatorFunction = markChildLanesUntilNode; // Set-based comparator function for large arrays
const LARGE_ARRAY_SIZE = deepCloneWithCycleDetection; // Threshold for using set-based comparison
const SetWrapper = getTypeOfValue; // Wrapper for Set-based comparison
const mapArrayWithIteratee = mapArray; // Maps array with iteratee
const getIterateeFunction = I5; // Gets iteratee function

module.exports = getUniqueValuesByComparator;
