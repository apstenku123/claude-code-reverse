/**
 * Filters an array based on a provided predicate function.
 *
 * @param {Array} array - The array to filter.
 * @param {Function} predicate - The function invoked per element. Should return true to keep the element, false otherwise.
 * @returns {Array} a new array containing all elements for which the predicate returned true.
 */
function filterArrayByPredicate(array, predicate) {
  // If array is null or undefined, treat as empty array
  const arrayLength = array == null ? 0 : array.length;
  const filteredArray = [];
  let filteredIndex = 0;

  // Iterate over each element in the array
  for (let index = 0; index < arrayLength; index++) {
    const element = array[index];
    // If predicate returns true, add element to filteredArray
    if (predicate(element, index, array)) {
      filteredArray[filteredIndex++] = element;
    }
  }

  return filteredArray;
}

module.exports = filterArrayByPredicate;