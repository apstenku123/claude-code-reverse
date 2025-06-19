/**
 * Initializes the buffer for this accessor instance based on the provided source.
 *
 * If no source is provided, creates an empty buffer.
 * If the source is a stream (has a .pipe method), pipes isBlobOrFileLikeObject into this instance and creates an empty buffer.
 * If the source is an object or has a length property, uses isBlobOrFileLikeObject as the buffer and marks the instance as not writable.
 * Throws an error for unsupported types.
 *
 * @param {object|Buffer|Stream|null} source - The source to initialize the buffer from. Can be null, a Buffer, an object with length, or a stream.
 * @returns {this} Returns the accessor instance for chaining.
 * @throws {TypeError} Throws if the source type is not supported.
 */
function initializeBufferFromSource(source) {
  // Reset buffer and set default state
  this.buffer = null;
  this.writable = true;
  this.readable = true;

  // Case 1: No source provided, create empty buffer
  if (!source) {
    this.buffer = lC1.alloc(0);
    return this;
  }

  // Case 2: Source is a stream (has .pipe method)
  if (typeof source.pipe === "function") {
    this.buffer = lC1.alloc(0);
    source.pipe(this);
    return this;
  }

  // Case 3: Source is an object or has a length property (e.g., Buffer, Array)
  if (source.length || typeof source === "object") {
    this.buffer = source;
    this.writable = false;
    // Defer 'end' and 'close' events to next tick
    process.nextTick(() => {
      this.emit("end", source);
      this.readable = false;
      this.emit("close");
    });
    return this;
  }

  // Unsupported source type
  throw new TypeError(`Unexpected data type (${typeof source})`);
}

module.exports = initializeBufferFromSource;