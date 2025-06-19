/**
 * Converts an object'createInteractionAccessor key-value pairs into an array of Buffers, alternating between key and value.
 * If a value is an array, each element is paired with the key as a Buffer.
 *
 * @param {Object} inputObject - The object whose key-value pairs will be converted.
 * @returns {Buffer[]} An array of Buffers: [key1, value1, key1, value2, ...]
 */
function objectToBufferKeyValuePairs(inputObject) {
  const keys = Object.keys(inputObject);
  const bufferPairs = [];

  for (let keyIndex = 0; keyIndex < keys.length; ++keyIndex) {
    const key = keys[keyIndex];
    const value = inputObject[key];
    const keyBuffer = Buffer.from(`${key}`);

    // If the value is an array, pair the key with each array element
    if (Array.isArray(value)) {
      for (let valueIndex = 0; valueIndex < value.length; ++valueIndex) {
        bufferPairs.push(keyBuffer, Buffer.from(`${value[valueIndex]}`));
      }
    } else {
      // Otherwise, pair the key with the value
      bufferPairs.push(keyBuffer, Buffer.from(`${value}`));
    }
  }

  return bufferPairs;
}

module.exports = objectToBufferKeyValuePairs;