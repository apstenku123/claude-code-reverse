/**
 * Checks if at least one element in the array passes the provided comparator function with the given value.
 *
 * @param {Array} array - The array to iterate over. If null or undefined, treated as empty.
 * @param {*} valueToCompare - The value to compare each array element against.
 * @param {Function} comparator - a function that takes (valueToCompare, arrayElement) and returns a boolean.
 * @returns {boolean} Returns true if any element in the array passes the comparator, otherwise false.
 */
function arraySomeWithComparator(array, valueToCompare, comparator) {
  // If array is null or undefined, set length to 0
  const arrayLength = array == null ? 0 : array.length;

  // Iterate through the array
  for (let index = 0; index < arrayLength; index++) {
    // If comparator returns true for any element, return true immediately
    if (comparator(valueToCompare, array[index])) {
      return true;
    }
  }
  // If no element passes the comparator, return false
  return false;
}

module.exports = arraySomeWithComparator;