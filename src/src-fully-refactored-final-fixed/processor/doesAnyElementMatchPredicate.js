/**
 * Checks if any element in the provided array satisfies the given predicate function.
 *
 * @param {Array} elements - The array of elements to check.
 * @param {*} comparisonValue - The value to be passed as the first argument to the predicate function.
 * @param {Function} predicate - a function that takes (comparisonValue, element) and returns a boolean.
 * @returns {boolean} Returns true if any element in the array satisfies the predicate; otherwise, false.
 */
function doesAnyElementMatchPredicate(elements, comparisonValue, predicate) {
  // If elements is null or undefined, treat as empty array
  const totalElements = elements == null ? 0 : elements.length;

  // Iterate through each element and check if predicate returns true
  for (let index = 0; index < totalElements; index++) {
    if (predicate(comparisonValue, elements[index])) {
      return true;
    }
  }

  // No element satisfied the predicate
  return false;
}

module.exports = doesAnyElementMatchPredicate;