/**
 * Finds the range of elements in an array before or after a predicate fails.
 *
 * Iterates over the array either from start to end or end to start (based on `iterateFromEnd`).
 * Applies the `predicate` to each element. Stops when predicate returns falsey.
 * Returns a slice of the array before or after the stopping point, depending on `returnBeforePredicateFails`.
 *
 * @param {Array} array - The array to process.
 * @param {Function} predicate - Function invoked per iteration (element, index, array).
 * @param {boolean} returnBeforePredicateFails - If true, returns elements before predicate fails; else after.
 * @param {boolean} iterateFromEnd - If true, iterates from end to start; else from start to end.
 * @returns {Array} a slice of the array based on predicate and options.
 */
function findIndexRangeByPredicate(array, predicate, returnBeforePredicateFails, iterateFromEnd) {
  const arrayLength = array.length;
  // Start index: if iterating from end, start at last index; else, start at -1 (so ++ brings to 0)
  let currentIndex = iterateFromEnd ? arrayLength : -1;

  // Iterate while predicate returns truthy and within bounds
  while (
    (iterateFromEnd ? currentIndex-- : ++currentIndex < arrayLength) &&
    predicate(array[currentIndex], currentIndex, array)
  );

  // Determine slice boundaries based on options
  if (returnBeforePredicateFails) {
    // Return elements before predicate fails
    // If iterating from end: slice from 0 to currentIndex+1
    // If iterating from start: slice from currentIndex to end
    return sliceArrayLike(
      array,
      iterateFromEnd ? 0 : currentIndex,
      iterateFromEnd ? currentIndex + 1 : arrayLength
    );
  } else {
    // Return elements after predicate fails
    // If iterating from end: slice from currentIndex+1 to end
    // If iterating from start: slice from 0 to currentIndex
    return sliceArrayLike(
      array,
      iterateFromEnd ? currentIndex + 1 : 0,
      iterateFromEnd ? arrayLength : currentIndex
    );
  }
}

module.exports = findIndexRangeByPredicate;