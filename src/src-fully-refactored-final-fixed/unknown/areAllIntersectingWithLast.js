/**
 * Checks if the last element of the array intersects with every other element in the array, using the provided context.
 *
 * @param {Array<Object>} elements - An array of objects, each expected to have an 'intersects' method.
 * @param {any} context - Additional context or configuration to be passed to the 'intersects' method.
 * @returns {boolean} Returns true if the last element intersects with every other element in the array; otherwise, false.
 */
function areAllIntersectingWithLast(elements, context) {
  // Create a shallow copy to avoid mutating the original array
  const elementsCopy = elements.slice();
  // Remove and store the last element to compare with the rest
  let referenceElement = elementsCopy.pop();
  let allIntersect = true;

  // Continue checking as long as allIntersect is true and there are elements left
  while (allIntersect && elementsCopy.length > 0) {
    // Check if the referenceElement intersects with every remaining element
    allIntersect = elementsCopy.every(element => {
      return referenceElement.intersects(element, context);
    });
    // Update referenceElement to the next element for the next iteration
    referenceElement = elementsCopy.pop();
  }

  return allIntersect;
}

module.exports = areAllIntersectingWithLast;
