/**
 * Creates a shallow copy of an array-like object using its custom '_length' property.
 *
 * @param {Object} arrayLikeObject - An array-like object with a '_length' property and numeric indices.
 * @returns {Array} a new array containing the elements from the input object up to '_length'.
 */
function cloneArrayLikeWithCustomLength(arrayLikeObject) {
  // Retrieve the custom length property
  const length = arrayLikeObject._length;
  // Initialize a new array with the same length
  const clonedArray = Array(length);
  // Copy each element from the source object to the new array
  for (let index = 0; index < length; index++) {
    clonedArray[index] = arrayLikeObject[index];
  }
  return clonedArray;
}

module.exports = cloneArrayLikeWithCustomLength;