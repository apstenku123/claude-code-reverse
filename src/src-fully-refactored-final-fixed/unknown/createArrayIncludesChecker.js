/**
 * Creates a function that checks if a given value exists in a specified array.
 *
 * @param {Array<any>} arrayToSearch - The array in which to search for values.
 * @returns {(valueToFind: any) => boolean} - a function that returns true if the value is found in the array, false otherwise.
 */
function createArrayIncludesChecker(arrayToSearch) {
  return function(valueToFind) {
    // Check if arrayToSearch exists and contains valueToFind
    return Array.isArray(arrayToSearch) && arrayToSearch.indexOf(valueToFind) !== -1;
  };
}

module.exports = createArrayIncludesChecker;