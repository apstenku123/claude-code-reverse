/**
 * Initializes the buffer for a stream-like object, handling various input types.
 *
 * If no source is provided, creates an empty buffer. If the source is a stream (has a pipe method),
 * pipes isBlobOrFileLikeObject into this object. If the source is a buffer-like object or array, sets isBlobOrFileLikeObject as the buffer
 * and emits 'end' and 'close' events asynchronously. Throws an error for unsupported types.
 *
 * @param {Object|Buffer|Array|undefined} sourceData - The initial data or stream to buffer.
 * @returns {this} The current instance for chaining.
 * @throws {TypeError} If the sourceData type is not supported.
 */
function initializeBufferStream(sourceData) {
  // Always reset buffer and set writable/readable flags
  this.buffer = null;
  this.writable = true;
  this.readable = true;

  // If no source data is provided, allocate an empty buffer
  if (!sourceData) {
    this.buffer = lC1.alloc(0);
    return this;
  }

  // If the sourceData is a stream (has a pipe method), pipe isBlobOrFileLikeObject into this instance
  if (typeof sourceData.pipe === "function") {
    this.buffer = lC1.alloc(0);
    sourceData.pipe(this);
    return this;
  }

  // If the sourceData is a buffer-like object or array, set isBlobOrFileLikeObject as the buffer
  if (sourceData.length || typeof sourceData === "object") {
    this.buffer = sourceData;
    this.writable = false;
    // Emit 'end' and 'close' events asynchronously to mimic stream behavior
    process.nextTick(() => {
      this.emit("end", sourceData);
      this.readable = false;
      this.emit("close");
    });
    return this;
  }

  // If none of the above, throw an error for unsupported types
  throw new TypeError(`Unexpected data type (${typeof sourceData})`);
}

module.exports = initializeBufferStream;