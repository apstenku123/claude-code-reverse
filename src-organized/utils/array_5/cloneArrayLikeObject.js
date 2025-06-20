/**
 * Creates a shallow copy of an array-like object by copying its elements into a new array.
 *
 * @param {Object} arrayLikeObject - An object with a numeric '_length' property and indexed elements (e.g., a custom array-like structure).
 * @returns {Array} a new array containing the copied elements from the input object.
 */
function cloneArrayLikeObject(arrayLikeObject) {
  // Get the number of elements to copy from the custom '_length' property
  const length = arrayLikeObject._length;
  // Create a new array with the same length
  const clonedArray = Array(length);
  // Copy each element from the source object to the new array
  for (let index = 0; index < length; index++) {
    clonedArray[index] = arrayLikeObject[index];
  }
  return clonedArray;
}

module.exports = cloneArrayLikeObject;
