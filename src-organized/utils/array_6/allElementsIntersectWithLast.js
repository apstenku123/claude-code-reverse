/**
 * Checks if all elements in the array (except the last one) intersect with the last element, using a provided context.
 *
 * @param {Array<Object>} elements - An array of objects, each expected to have an 'intersects' method.
 * @param {any} context - a context or configuration object passed to the 'intersects' method.
 * @returns {boolean} True if all elements (except the last) intersect with the last element using the context; otherwise, false.
 */
function allElementsIntersectWithLast(elements, context) {
  // Create a shallow copy to avoid mutating the original array
  const elementsCopy = elements.slice();
  // Remove and store the last element to compare against
  let referenceElement = elementsCopy.pop();
  let allIntersect = true;

  // Continue checking while allIntersect is true and there are elements left
  while (allIntersect && elementsCopy.length > 0) {
    // Check if every remaining element intersects with the current referenceElement
    allIntersect = elementsCopy.every(element => {
      return referenceElement.intersects(element, context);
    });
    // Move to the next element by popping from the array
    referenceElement = elementsCopy.pop();
  }

  return allIntersect;
}

module.exports = allElementsIntersectWithLast;