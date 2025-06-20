/**
 * Handles input data for a writable stream, ensuring isBlobOrFileLikeObject is a Buffer and managing the stream'createInteractionAccessor buffer array.
 *
 * @param {Buffer} inputData - The data chunk to be written to the stream. Must be a Buffer.
 * @param {any} _unusedParam - Unused parameter (reserved for future use or API compatibility).
 * @param {function(Error=):void} callback - Callback to be called when processing is complete or if an error occurs.
 * @returns {void}
 */
function handleWritableStreamBufferInput(inputData, _unusedParam, callback) {
  // Check if the input buffer is an array (expected structure)
  if (Array.isArray(this.options.input.buffer)) {
    // Check if the incoming data is a Buffer using lA.buffer
    if (lA.buffer(inputData)) {
      // If the buffer is currently empty, set up a 'finish' event handler
      if (this.options.input.buffer.length === 0) {
        this.on("finish", () => {
          this.streamInFinished = true;
        });
      }
      // Push the Buffer data into the buffer array
      this.options.input.buffer.push(inputData);
      // Signal successful handling
      callback();
    } else {
      // Error: Non-Buffer data received
      callback(new Error("Non-Buffer data on Writable Stream"));
    }
  } else {
    // Error: Unexpected buffer structure
    callback(new Error("Unexpected data on Writable Stream"));
  }
}

module.exports = handleWritableStreamBufferInput;