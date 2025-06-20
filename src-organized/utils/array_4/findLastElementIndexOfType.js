/**
 * Finds the last index of an element in the global `x.elements` array that is an instance of the given constructor.
 *
 * @param {Function} constructor - The constructor function to check instances against.
 * @returns {number} The last index of an element that is an instance of the given constructor, or -1 if not found.
 */
function findLastElementIndexOfType(constructor) {
  // Iterate backwards through the elements array
  for (let index = x.elements.length - 1; index >= 0; index--) {
    // Check if the current element is an instance of the provided constructor
    if (x.elements[index] instanceof constructor) {
      return index;
    }
  }
  // Return -1 if no matching element is found
  return -1;
}

module.exports = findLastElementIndexOfType;