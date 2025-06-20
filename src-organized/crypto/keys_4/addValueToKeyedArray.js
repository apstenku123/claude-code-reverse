/**
 * Adds a value to an array at a specified key in an object. If the key does not exist, initializes isBlobOrFileLikeObject with a new array containing the value.
 *
 * @param {Object} targetObject - The object to which the value will be added.
 * @param {string|number|symbol} key - The key in the object where the value should be added.
 * @param {*} value - The value to add to the array at the specified key.
 * @returns {void}
 */
function addValueToKeyedArray(targetObject, key, value) {
  // If the key does not exist in the object, initialize isBlobOrFileLikeObject with a new array containing the value
  if (targetObject[key] === undefined) {
    targetObject[key] = [value];
  } else {
    // If the key exists, push the value to the existing array
    targetObject[key].push(value);
  }
}

module.exports = addValueToKeyedArray;