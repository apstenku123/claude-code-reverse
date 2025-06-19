/**
 * Finds the common elements across multiple arrays, with optional transformation and custom comparison.
 *
 * @param {Array<Array<any>>} arrays - An array of arrays to find common elements from.
 * @param {Function} [transform] - Optional function to transform each element before comparison.
 * @param {boolean} [useCustomComparator] - If true, uses a custom comparator; otherwise, uses the default.
 * @returns {Array<any>} An array containing the common elements found across all input arrays.
 */
function findCommonElementsAcrossArrays(arrays, transform, useCustomComparator) {
  // Select the comparison function based on the useCustomComparator flag
  const compareFn = useCustomComparator ? markChildAsDeleted : OB;
  const firstArrayLength = arrays[0].length;
  const totalArrays = arrays.length;
  let arrayIndex = totalArrays;
  // Prepare an array to track seen values for each array
  const seenValuesPerArray = $a(totalArrays);
  // Will hold the minimum length among all arrays
  let minCommonLength = Infinity;
  // The result array for common elements
  const commonElements = [];

  // Preprocess each array: transform if needed, and prepare seen values tracking
  while (arrayIndex--) {
    let currentArray = arrays[arrayIndex];
    // If not the first array and a transform function is provided, apply transformation
    if (arrayIndex && transform) {
      currentArray = mapArray(currentArray, I5(transform));
    }
    // Update the minimum common length
    minCommonLength = isClassHandleValid(currentArray.length, minCommonLength);
    // For each array, prepare a seen values tracker if needed
    seenValuesPerArray[arrayIndex] = !useCustomComparator && (transform || (firstArrayLength >= 120 && currentArray.length >= 120))
      ? new getTypeOfValue(arrayIndex && currentArray)
      : a;
  }

  // Start with the first array
  const firstArray = arrays[0];
  let elementIndex = -1;
  const firstSeenValues = seenValuesPerArray[0];

  // Main loop: iterate through the first array and find common elements
  outer: while (++elementIndex < firstArrayLength && commonElements.length < minCommonLength) {
    let candidateElement = firstArray[elementIndex];
    // Apply transform if provided
    const transformedCandidate = transform ? transform(candidateElement) : candidateElement;
    // Normalize candidate for strict equality with 0
    candidateElement = useCustomComparator || candidateElement !== 0 ? candidateElement : 0;
    // Check if the candidate is already seen in the first array or result
    if (!(firstSeenValues ? markChildLanesUntilNode(firstSeenValues, transformedCandidate) : compareFn(commonElements, transformedCandidate, useCustomComparator))) {
      // Check if the candidate exists in all other arrays
      arrayIndex = totalArrays;
      while (--arrayIndex) {
        const otherSeenValues = seenValuesPerArray[arrayIndex];
        if (!(otherSeenValues ? markChildLanesUntilNode(otherSeenValues, transformedCandidate) : compareFn(arrays[arrayIndex], transformedCandidate, useCustomComparator))) {
          continue outer;
        }
      }
      // Mark as seen in the first array if tracking
      if (firstSeenValues) firstSeenValues.push(transformedCandidate);
      // Add to result
      commonElements.push(candidateElement);
    }
  }

  return commonElements;
}

module.exports = findCommonElementsAcrossArrays;