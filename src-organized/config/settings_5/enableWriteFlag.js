/**
 * Sets the write flag (bitwise OR with 4) on the provided options object.
 *
 * @param {Object} options - The object containing a 'flags' property to update.
 * @returns {void} This function does not return a value.
 */
function enableWriteFlag(options) {
  // Set the write flag (bit 2) by performing a bitwise OR with 4
  options.flags |= 4;
}

module.exports = enableWriteFlag;