/**
 * Returns a deduplicated array of values from the input array, with optional transformation and custom comparison logic.
 *
 * @param {Array} inputArray - The array of values to process and deduplicate.
 * @param {Function} [transformFn] - Optional function to transform each item before comparison (e.g., a key selector).
 * @param {boolean} [useCustomComparator] - If true, uses a custom comparator function for uniqueness checks.
 * @returns {Array} An array containing only unique values from the input, in order of first occurrence.
 */
function getUniqueValuesFromArray(inputArray, transformFn, useCustomComparator) {
  let currentIndex = -1;
  let comparator = W2A; // Default comparator function
  const inputLength = inputArray.length;
  let useStrictEquality = true;
  const result = [];
  let seenValues = result;

  // If a custom comparator is requested
  if (useCustomComparator) {
    useStrictEquality = false;
    comparator = O4A;
  } else if (inputLength >= Cg2) {
    // For large arrays, try to use a cache for fast deduplication
    const cachedResult = transformFn ? null : y4A(inputArray);
    if (cachedResult) return jy(cachedResult);
    useStrictEquality = false;
    comparator = o01;
    seenValues = new r01();
  } else {
    // For small arrays, use a simple array for seen values
    seenValues = transformFn ? [] : result;
  }

  // Main deduplication loop
  outer: while (++currentIndex < inputLength) {
    let currentItem = inputArray[currentIndex];
    // Apply transformation if provided
    const comparisonValue = transformFn ? transformFn(currentItem) : currentItem;
    // Handle -0 edge case: treat -0 as 0
    currentItem = useCustomComparator || currentItem !== 0 ? currentItem : 0;

    if (useStrictEquality && comparisonValue === comparisonValue) {
      // Fast path: check if value already seen
      let seenIdx = seenValues.length;
      while (seenIdx--) {
        if (seenValues[seenIdx] === comparisonValue) continue outer;
      }
      if (transformFn) seenValues.push(comparisonValue);
      result.push(currentItem);
    } else if (!comparator(seenValues, comparisonValue, useCustomComparator)) {
      // Use custom comparator for uniqueness
      if (seenValues !== result) seenValues.push(comparisonValue);
      result.push(currentItem);
    }
  }

  return result;
}

module.exports = getUniqueValuesFromArray;