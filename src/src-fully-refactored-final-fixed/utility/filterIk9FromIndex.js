/**
 * Filters the global ik9 array, returning all elements starting from the specified index.
 *
 * @param {number} startIndex - The index from which to start including elements in the result.
 * @returns {Array} a new array containing elements from ik9 starting at startIndex.
 */
function filterIk9FromIndex(startIndex) {
  // Use Array.prototype.filter to include elements whose index is greater than or equal to startIndex
  return ik9.filter(function(element, index) {
    return startIndex <= index;
  });
}

module.exports = filterIk9FromIndex;