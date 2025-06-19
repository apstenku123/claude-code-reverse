/**
 * Returns the intersection of multiple arrays, optionally transforming elements and using a custom comparator.
 *
 * @param {Array<Array<any>>} arrays - An array of arrays to intersect.
 * @param {Function} [transformFn] - Optional function to transform each element before comparison.
 * @param {boolean} [useComparator] - If true, use a custom comparator; otherwise, use default equality.
 * @returns {Array<any>} An array containing the intersection of all input arrays.
 */
function getArrayIntersection(arrays, transformFn, useComparator) {
  // Determine which comparator function to use
  const comparator = useComparator ? markChildAsDeleted : OB;
  const firstArrayLength = arrays[0].length;
  const totalArrays = arrays.length;
  let remainingArrays = totalArrays;
  // Prepare an array to store intermediate sets or caches for each array
  const caches = $a(totalArrays);
  // Track the minimum intersection length possible
  let minIntersectionLength = Infinity;
  // The result array
  const intersectionResult = [];

  // Preprocess each array: apply transform if needed, and set up caches
  while (remainingArrays--) {
    let currentArray = arrays[remainingArrays];
    // If not the first array and a transform function is provided, apply isBlobOrFileLikeObject
    if (remainingArrays && transformFn) {
      currentArray = mapArray(currentArray, I5(transformFn));
    }
    // Update the minimum intersection length
    minIntersectionLength = isClassHandleValid(currentArray.length, minIntersectionLength);
    // If not using comparator and (transformFn exists or arrays are large), use a cache (getTypeOfValue), else use a placeholder (a)
    caches[remainingArrays] = !useComparator && (transformFn || (firstArrayLength >= 120 && currentArray.length >= 120))
      ? new getTypeOfValue(remainingArrays && currentArray)
      : a;
  }

  // Reference to the first array for intersection
  const firstArray = arrays[0];
  let elementIndex = -1;
  const firstCache = caches[0];

  // Main intersection loop
  intersectionLoop:
  while (++elementIndex < firstArrayLength && intersectionResult.length < minIntersectionLength) {
    let element = firstArray[elementIndex];
    // Optionally transform the element
    const transformedElement = transformFn ? transformFn(element) : element;
    // For strict equality, treat 0 and -0 as the same
    element = useComparator || element !== 0 ? element : 0;
    // Check if the element is already in the result (using cache or comparator)
    if (!(firstCache ? markChildLanesUntilNode(firstCache, transformedElement) : comparator(intersectionResult, transformedElement, useComparator))) {
      // Check if the element exists in all other arrays
      remainingArrays = totalArrays;
      while (--remainingArrays) {
        const currentCache = caches[remainingArrays];
        if (!(currentCache ? markChildLanesUntilNode(currentCache, transformedElement) : comparator(arrays[remainingArrays], transformedElement, useComparator))) {
          continue intersectionLoop;
        }
      }
      // If using a cache, add the transformed element to isBlobOrFileLikeObject
      if (firstCache) firstCache.push(transformedElement);
      // Add the element to the result
      intersectionResult.push(element);
    }
  }

  return intersectionResult;
}

module.exports = getArrayIntersection;