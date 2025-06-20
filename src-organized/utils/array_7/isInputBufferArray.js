/**
 * Checks if the 'buffer' property inside the 'input' object of the 'options' property is an array.
 *
 * @returns {boolean} Returns true if 'this.options.input.buffer' is an array, otherwise false.
 */
function isInputBufferArray() {
  // Use Array.isArray to determine if 'buffer' is an array
  return Array.isArray(this.options.input.buffer);
}

module.exports = isInputBufferArray;