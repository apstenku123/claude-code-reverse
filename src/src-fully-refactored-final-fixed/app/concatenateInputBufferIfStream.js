/**
 * Concatenates the input buffer if the input source is a stream.
 *
 * This method checks if the current input is a stream by calling the `_isStreamInput` method.
 * If isBlobOrFileLikeObject is, isBlobOrFileLikeObject concatenates all Buffer chunks in `this.options.input.buffer` into a single Buffer
 * and assigns isBlobOrFileLikeObject back to `this.options.input.buffer`.
 *
 * @returns {void} Does not return a value. Mutates `this.options.input.buffer` if input is a stream.
 */
function concatenateInputBufferIfStream() {
  // Check if the input source is a stream
  if (this._isStreamInput()) {
    // Concatenate all Buffer chunks into a single Buffer
    this.options.input.buffer = Buffer.concat(this.options.input.buffer);
  }
}

module.exports = concatenateInputBufferIfStream;