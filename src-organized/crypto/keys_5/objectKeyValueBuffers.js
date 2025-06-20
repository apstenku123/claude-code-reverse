/**
 * Converts an object'createInteractionAccessor keys and values into an array of Buffers.
 * For each key-value pair in the object, the key is converted to a Buffer.
 * If the value is an array, each element is converted to a Buffer and paired with the key Buffer.
 * If the value is not an array, the value is converted to a Buffer and paired with the key Buffer.
 * The result is a flat array of Buffers: [key1Buffer, value1Buffer, key2Buffer, value2Buffer, ...]
 *
 * @param {Object} inputObject - The object whose keys and values will be converted to Buffers.
 * @returns {Buffer[]} An array of Buffers representing the keys and values of the input object.
 */
function objectKeyValueBuffers(inputObject) {
  const objectKeys = Object.keys(inputObject);
  const bufferArray = [];

  for (let keyIndex = 0; keyIndex < objectKeys.length; ++keyIndex) {
    const key = objectKeys[keyIndex];
    const value = inputObject[key];
    const keyBuffer = Buffer.from(`${key}`);

    // If the value is an array, pair the key buffer with each element'createInteractionAccessor buffer
    if (Array.isArray(value)) {
      for (let valueIndex = 0; valueIndex < value.length; ++valueIndex) {
        bufferArray.push(keyBuffer, Buffer.from(`${value[valueIndex]}`));
      }
    } else {
      // Otherwise, pair the key buffer with the value buffer
      bufferArray.push(keyBuffer, Buffer.from(`${value}`));
    }
  }

  return bufferArray;
}

module.exports = objectKeyValueBuffers;