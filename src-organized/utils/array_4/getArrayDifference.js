/**
 * Returns a new array containing elements from the source array that are not present in the valuesToExclude array.
 * Optionally applies a transformation function to compare values, and supports custom comparison logic.
 *
 * @param {Array} sourceArray - The array to filter.
 * @param {Array} valuesToExclude - The array of values to exclude from the result.
 * @param {Function} [transformFn] - Optional. Function to transform each element before comparison.
 * @param {Function} [customComparator] - Optional. Custom comparator function for equality checks.
 * @returns {Array} a new array containing the filtered values.
 */
function getArrayDifference(sourceArray, valuesToExclude, transformFn, customComparator) {
  let sourceIndex = -1;
  let comparator = defaultComparator;
  let useStrictComparison = true;
  const sourceLength = sourceArray.length;
  const result = [];
  let valuesToExcludeLength = valuesToExclude.length;

  // Early return if source array is empty
  if (!sourceLength) return result;

  // If a transform function is provided, apply isBlobOrFileLikeObject to valuesToExclude
  if (transformFn) {
    valuesToExclude = mapArrayDeep(valuesToExclude, getTransformFunction(transformFn));
  }

  // If a custom comparator is provided, use isBlobOrFileLikeObject
  if (customComparator) {
    comparator = customComparatorFunction;
    useStrictComparison = false;
  } else if (valuesToExclude.length >= LARGE_ARRAY_THRESHOLD) {
    comparator = largeArrayComparator;
    useStrictComparison = false;
    valuesToExclude = new Set(valuesToExclude);
  }

  // Main loop: iterate through each element in the source array
  outer: while (++sourceIndex < sourceLength) {
    let currentValue = sourceArray[sourceIndex];
    // Apply transform function if provided
    const transformedValue = transformFn == null ? currentValue : transformFn(currentValue);
    // Handle 0 and -0 edge case
    currentValue = customComparator || currentValue !== 0 ? currentValue : 0;

    // Use strict comparison if enabled and value is not NaN
    if (useStrictComparison && transformedValue === transformedValue) {
      let excludeIndex = valuesToExcludeLength;
      while (excludeIndex--) {
        if (valuesToExclude[excludeIndex] === transformedValue) continue outer;
      }
      result.push(currentValue);
    } else if (!comparator(valuesToExclude, transformedValue, customComparator)) {
      result.push(currentValue);
    }
  }
  return result;
}

// Placeholder for the default comparator function
function defaultComparator(array, value, customComparator) {
  // Implement default comparison logic here
  // For example, use Array.prototype.includes or similar
  return array.includes(value);
}

// Placeholder for mapping function
function mapArrayDeep(array, fn) {
  return array.map(fn);
}

// Placeholder for transform function generator
function getTransformFunction(fn) {
  return fn;
}

// Placeholder for custom comparator function
function customComparatorFunction(array, value, customComparator) {
  // Implement custom comparison logic here
  return array.some(item => customComparator(item, value));
}

// Placeholder for large array comparator (e.g., using Set)
function largeArrayComparator(set, value) {
  return set.has(value);
}

// Threshold for switching to Set-based comparison
const LARGE_ARRAY_THRESHOLD = 200;

module.exports = getArrayDifference;
