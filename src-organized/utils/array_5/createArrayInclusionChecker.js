/**
 * Creates a function that checks if a given value exists within a specified array.
 *
 * @param {Array<any>} arrayToSearch - The array in which to search for values.
 * @returns {(valueToFind: any) => boolean} - a function that returns true if the value is found in the array, false otherwise.
 */
function createArrayInclusionChecker(arrayToSearch) {
  return function(valueToFind) {
    // Check if the array exists and if the value is present in the array
    return Array.isArray(arrayToSearch) && arrayToSearch.indexOf(valueToFind) !== -1;
  };
}

module.exports = createArrayInclusionChecker;