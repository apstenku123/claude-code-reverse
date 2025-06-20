/**
 * Returns a new array containing unique values from the source array, using a comparator array and optional iteratee and comparator functions.
 *
 * @param {Array} sourceArray - The array to inspect for unique values.
 * @param {Array} valuesToExclude - The array of values to exclude from the result.
 * @param {Function} [iteratee] - Optional function invoked per element to generate the criterion by which uniqueness is computed.
 * @param {Function} [comparator] - Optional function to compare values for equality.
 * @returns {Array} Array of unique values from sourceArray not present in valuesToExclude (after applying iteratee/comparator if provided).
 */
function getUniqueValuesByPredicate(sourceArray, valuesToExclude, iteratee, comparator) {
  let sourceIndex = -1;
  let compareFunction = defaultCompareFunction;
  let useStrictComparison = true;
  const sourceLength = sourceArray.length;
  const result = [];
  let valuesLength = valuesToExclude.length;

  // Return empty array if source is empty
  if (!sourceLength) return result;

  // If iteratee is provided, transform valuesToExclude using iteratee
  if (iteratee) {
    valuesToExclude = mapArrayDeep(valuesToExclude, getIteratee(iteratee));
    valuesLength = valuesToExclude.length;
  }

  // If comparator is provided, use isBlobOrFileLikeObject for comparison
  if (comparator) {
    compareFunction = arrayIncludesWithComparator;
    useStrictComparison = false;
  } else if (valuesToExclude.length >= RANDOM_THRESHOLD) {
    // If valuesToExclude is large, use a Set for faster lookups
    compareFunction = setCacheIncludes;
    useStrictComparison = false;
    valuesToExclude = new SetCache(valuesToExclude);
  }

  // Main loop: iterate over sourceArray
  outer: while (++sourceIndex < sourceLength) {
    let currentValue = sourceArray[sourceIndex];
    // Compute the value to compare (apply iteratee if provided)
    const computed = iteratee == null ? currentValue : iteratee(currentValue);
    // Handle -0 and 0 edge case
    currentValue = comparator || currentValue !== 0 ? currentValue : 0;

    // Use strict comparison if possible
    if (useStrictComparison && computed === computed) {
      let valuesIndex = valuesLength;
      // Check if computed value is present in valuesToExclude
      while (valuesIndex--) {
        if (valuesToExclude[valuesIndex] === computed) continue outer;
      }
      result.push(currentValue);
    } else if (!compareFunction(valuesToExclude, computed, comparator)) {
      // Use custom compare function if strict comparison is not used
      result.push(currentValue);
    }
  }
  return result;
}

// --- Helper Functions and Constants (assumed to be imported or defined elsewhere) ---
// These are placeholders for the actual implementations
const defaultCompareFunction = OB; // Default array includes function
const arrayIncludesWithComparator = markChildAsDeleted; // Includes function with comparator
const setCacheIncludes = markChildLanesUntilNode; // Set cache includes function
const mapArrayDeep = mapArray; // Maps an array with a function
const getIteratee = I5; // Gets the iteratee function
const SetCache = getTypeOfValue; // SetCache constructor
const RANDOM_THRESHOLD = deepCloneWithCycleDetection; // Threshold for switching to SetCache

module.exports = getUniqueValuesByPredicate;
