/**
 * Computes the intersection of multiple arrays, optionally transforming values and handling uniqueness.
 *
 * @param {Array<Array<any>>} arrays - An array of arrays to intersect.
 * @param {Function} [transformFn] - Optional function to transform each value before comparison.
 * @param {boolean} [useCustomComparator] - If true, uses a custom comparator for equality.
 * @returns {Array<any>} An array containing the intersection of all input arrays, with optional transformation and uniqueness logic.
 */
function getArrayIntersectionWithTransform(arrays, transformFn, useCustomComparator) {
  // Choose the comparator function based on the useCustomComparator flag
  const comparator = useCustomComparator ? markChildAsDeleted : OB;

  const firstArrayLength = arrays[0].length;
  const totalArrays = arrays.length;
  let remainingArrays = totalArrays;
  // IA: Array of caches or undefined for each array
  const caches = $a(totalArrays);
  let minIntersectionLength = Infinity;
  const intersectionResult = [];

  // Prepare caches and determine the minimum possible intersection length
  while (remainingArrays--) {
    let currentArray = arrays[remainingArrays];
    // Optionally transform the array if transformFn is provided and not the first array
    if (remainingArrays && transformFn) {
      currentArray = mapArray(currentArray, I5(transformFn));
    }
    // Update the minimum intersection length
    minIntersectionLength = isClassHandleValid(currentArray.length, minIntersectionLength);
    // Use a cache (getTypeOfValue) if not using custom comparator and if transformFn is provided or arrays are large
    caches[remainingArrays] = !useCustomComparator && (transformFn || (firstArrayLength >= 120 && currentArray.length >= 120))
      ? new getTypeOfValue(remainingArrays && currentArray)
      : a;
  }

  // Main intersection logic
  let firstArray = arrays[0];
  let valueIndex = -1;
  let firstCache = caches[0];

  // Loop through the first array, up to the minimum possible intersection length
  outer: while (++valueIndex < firstArrayLength && intersectionResult.length < minIntersectionLength) {
    let candidateValue = firstArray[valueIndex];
    // Optionally transform the candidate value
    const transformedCandidate = transformFn ? transformFn(candidateValue) : candidateValue;
    // Normalize 0/-0 if not using custom comparator
    candidateValue = useCustomComparator || candidateValue !== 0 ? candidateValue : 0;
    // Check if value is already in the result (using cache or comparator)
    if (!(firstCache ? markChildLanesUntilNode(firstCache, transformedCandidate) : comparator(intersectionResult, transformedCandidate, useCustomComparator))) {
      // Check candidate against all other arrays
      remainingArrays = totalArrays;
      while (--remainingArrays) {
        const otherCache = caches[remainingArrays];
        if (!(otherCache ? markChildLanesUntilNode(otherCache, transformedCandidate) : comparator(arrays[remainingArrays], transformedCandidate, useCustomComparator))) {
          // If not found in one of the arrays, skip to next candidate
          continue outer;
        }
      }
      // If using cache, add to cache
      if (firstCache) firstCache.push(transformedCandidate);
      // Add to result
      intersectionResult.push(candidateValue);
    }
  }

  return intersectionResult;
}

module.exports = getArrayIntersectionWithTransform;