/**
 * Factory function to create file stream classes for reading and writing files.
 *
 * @param {Object} fileSystem - An object providing file system methods (must have an 'open' method).
 * @returns {Object} An object containing ReadStream and WriteStream constructors.
 */
function createFileStreamFactory(fileSystem) {
  /**
   * ReadStream constructor for reading files as streams.
   *
   * @constructor
   * @param {string} filePath - The path to the file to read.
   * @param {Object} [options={}] - Optional configuration options.
   */
  function ReadStream(filePath, options = {}) {
    if (!(this instanceof ReadStream)) return new ReadStream(filePath, options);
    XfA.call(this); // Call parent constructor (assumed to be EventEmitter or similar)

    const self = this;
    this.path = filePath;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = "r";
    this.mode = 0o666; // 438 in octal
    this.bufferSize = 65536;

    // Assign options to instance
    const optionKeys = Object.keys(options);
    for (let i = 0; i < optionKeys.length; i++) {
      const key = optionKeys[i];
      this[key] = options[key];
    }

    // Set encoding if provided
    if (this.encoding) {
      this.setEncoding(this.encoding);
    }

    // Handle start/end positions for partial reads
    if (this.start !== undefined) {
      if (typeof this.start !== "number") {
        throw TypeError("start must be a Number");
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if (typeof this.end !== "number") {
        throw TypeError("end must be a Number");
      }
      if (this.start > this.end) {
        throw new Error("start must be <= end");
      }
      this.pos = this.start;
    }

    // If file descriptor already set, start reading on next tick
    if (this.fd !== null) {
      process.nextTick(function () {
        self._read();
      });
      return;
    }

    // Otherwise, open the file asynchronously
    fileSystem.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit("error", err);
        self.readable = false;
        return;
      }
      self.fd = fd;
      self.emit("open", fd);
      self._read();
    });
  }

  /**
   * WriteStream constructor for writing files as streams.
   *
   * @constructor
   * @param {string} filePath - The path to the file to write.
   * @param {Object} [options={}] - Optional configuration options.
   */
  function WriteStream(filePath, options = {}) {
    if (!(this instanceof WriteStream)) return new WriteStream(filePath, options);
    XfA.call(this); // Call parent constructor (assumed to be EventEmitter or similar)

    this.path = filePath;
    this.fd = null;
    this.writable = true;
    this.flags = "processWithTransformedObservable";
    this.encoding = "binary";
    this.mode = 0o666; // 438 in octal
    this.bytesWritten = 0;

    // Assign options to instance
    const optionKeys = Object.keys(options);
    for (let i = 0; i < optionKeys.length; i++) {
      const key = optionKeys[i];
      this[key] = options[key];
    }

    // Handle start position for partial writes
    if (this.start !== undefined) {
      if (typeof this.start !== "number") {
        throw TypeError("start must be a Number");
      }
      if (this.start < 0) {
        throw new Error("start must be >= zero");
      }
      this.pos = this.start;
    }

    // Initialize internal state for write queue
    this.busy = false;
    this._queue = [];

    // If file descriptor is not set, queue open operation and flush
    if (this.fd === null) {
      this._open = fileSystem.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }

  return {
    ReadStream,
    WriteStream
  };
}

module.exports = createFileStreamFactory;