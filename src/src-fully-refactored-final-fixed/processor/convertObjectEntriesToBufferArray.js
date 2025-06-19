/**
 * Converts the entries of an object into an array of Buffers.
 * For each key-value pair in the input object:
 *   - If the value is an array, each element is paired with the key and both are converted to Buffers and added to the result array.
 *   - If the value is not an array, the key and value are converted to Buffers and added to the result array.
 *
 * @param {Object} inputObject - The object whose entries will be converted to Buffers.
 * @returns {Buffer[]} An array containing Buffers for each key and value (or array element) in the input object.
 */
function convertObjectEntriesToBufferArray(inputObject) {
  const bufferArray = [];

  // Iterate over each key-value pair in the input object
  for (const [key, value] of Object.entries(inputObject)) {
    if (Array.isArray(value)) {
      // If the value is an array, push Buffer representations of the key and each element
      for (const element of value) {
        bufferArray.push(Buffer.from(key), Buffer.from(element));
      }
    } else {
      // If the value is not an array, push Buffer representations of the key and value
      bufferArray.push(Buffer.from(key), Buffer.from(value));
    }
  }

  return bufferArray;
}

module.exports = convertObjectEntriesToBufferArray;