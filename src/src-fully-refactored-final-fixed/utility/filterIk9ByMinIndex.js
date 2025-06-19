/**
 * Filters the global 'ik9' array, returning all elements whose index is greater than or equal to the specified minimum index.
 *
 * @param {number} minIndex - The minimum index (inclusive) from which to include elements in the returned array.
 * @returns {Array} a new array containing elements from 'ik9' starting at 'minIndex' and onwards.
 */
function filterIk9ByMinIndex(minIndex) {
  // Filter 'ik9' to include only elements with index >= minIndex
  return ik9.filter((element, index) => minIndex <= index);
}

module.exports = filterIk9ByMinIndex;