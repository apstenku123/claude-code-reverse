/**
 * Iterates over an array from either start or end, applying a predicate to each element,
 * and returns a sliced portion of the array based on where the predicate fails.
 *
 * @param {Array} array - The array to search and slice.
 * @param {Function} predicate - Function invoked per iteration (element, index, array).
 * @param {boolean} returnFromStart - If true, slice from the start; otherwise, slice from the end.
 * @param {boolean} iterateFromEnd - If true, iterate from the end; otherwise, from the start.
 * @returns {Array} - The sliced array based on predicate failure and direction.
 */
function findIndexByPredicateAndSlice(array, predicate, returnFromStart, iterateFromEnd) {
  const arrayLength = array.length;
  // Set the starting index based on iteration direction
  let currentIndex = iterateFromEnd ? arrayLength : -1;

  // Iterate while the predicate returns truthy and within bounds
  while (
    (iterateFromEnd ? currentIndex-- : ++currentIndex < arrayLength) &&
    predicate(array[currentIndex], currentIndex, array)
  );

  // Determine slice boundaries based on direction and returnFromStart flag
  if (returnFromStart) {
    // If slicing from start, use (0, currentIndex) or(currentIndex + 1, arrayLength)
    return sliceArrayLike(
      array,
      iterateFromEnd ? 0 : currentIndex,
      iterateFromEnd ? currentIndex + 1 : arrayLength
    );
  } else {
    // If slicing from end, use (currentIndex + 1, arrayLength) or(0, currentIndex)
    return sliceArrayLike(
      array,
      iterateFromEnd ? currentIndex + 1 : 0,
      iterateFromEnd ? arrayLength : currentIndex
    );
  }
}

module.exports = findIndexByPredicateAndSlice;