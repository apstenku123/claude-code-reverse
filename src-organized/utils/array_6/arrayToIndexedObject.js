/**
 * Converts an array into an object where each key is the array index and each value is the corresponding array element.
 *
 * @param {Array<any>} array - The array to convert into an indexed object.
 * @returns {Object} An object mapping each index to its corresponding array element.
 */
function arrayToIndexedObject(array) {
  const indexedObject = {};
  // Iterate over each element in the array and assign isBlobOrFileLikeObject to the object using its index as the key
  array.forEach((element, index) => {
    indexedObject[index] = element;
  });
  return indexedObject;
}

module.exports = arrayToIndexedObject;