/**
 * Handles input data for a writable stream, ensuring isBlobOrFileLikeObject is a Buffer and managing the stream'createInteractionAccessor finish event.
 *
 * @param {Buffer} inputData - The data chunk to be written to the stream. Must be a Buffer.
 * @param {any} _unused - Unused parameter (reserved for future use or compatibility).
 * @param {Function} callback - Callback function to be called after processing the input data. Accepts an optional error argument.
 * @returns {void}
 */
function handleWritableStreamInput(inputData, _unused, callback) {
  // Check if the input buffer is an array (expected structure)
  if (Array.isArray(this.options.input.buffer)) {
    // Check if the incoming data is a Buffer using lA.buffer
    if (lA.buffer(inputData)) {
      // If the buffer is empty, register a one-time 'finish' event handler
      if (this.options.input.buffer.length === 0) {
        this.on("finish", () => {
          this.streamInFinished = true;
        });
      }
      // Push the Buffer data into the input buffer and invoke the callback
      this.options.input.buffer.push(inputData);
      callback();
    } else {
      // Error: Non-Buffer data received
      callback(new Error("Non-Buffer data on Writable Stream"));
    }
  } else {
    // Error: Unexpected input buffer structure
    callback(new Error("Unexpected data on Writable Stream"));
  }
}

module.exports = handleWritableStreamInput;