/**
 * Converts a flat array of alternating keys and values into an object.
 *
 * For example, ['a', 1, 'b', 2] becomes { a: 1, b: 2 }.
 *
 * @param {Array} keyValueArray - An array containing keys and values in alternating order.
 * @returns {Object} An object constructed from the key-value pairs in the array.
 */
function arrayToObjectFromPairs(keyValueArray) {
  // Create a shallow copy to avoid mutating the original array
  const arrayCopy = keyValueArray.slice();
  const keyValuePairs = [];

  // Iterate over the array in steps of 2 to extract key-value pairs
  for (let index = 0; index < arrayCopy.length; index += 2) {
    // Push each pair as [key, value] into the keyValuePairs array
    keyValuePairs.push([arrayCopy[index], arrayCopy[index + 1]]);
  }

  // Convert the array of pairs into an object
  return Object.fromEntries(keyValuePairs);
}

module.exports = arrayToObjectFromPairs;