/**
 * Sorts an array of objects using a custom comparator, then replaces each element with its 'value' property.
 *
 * @param {Array<Object>} objectArray - The array of objects to be sorted and transformed.
 * @param {Function} comparator - The comparison function used to sort the array.
 * @returns {Array<any>} The sorted array, with each element replaced by its 'value' property.
 */
function sortAndExtractValues(objectArray, comparator) {
  // Store the original length of the array
  let arrayLength = objectArray.length;

  // Sort the array in-place using the provided comparator function
  objectArray.sort(comparator);

  // Replace each object in the array with its 'value' property
  while (arrayLength--) {
    objectArray[arrayLength] = objectArray[arrayLength].value;
  }

  // Return the transformed array
  return objectArray;
}

module.exports = sortAndExtractValues;