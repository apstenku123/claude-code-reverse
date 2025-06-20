/**
 * Factory function that creates readable and writable file stream constructors using a provided file system interface.
 *
 * @param {Object} fileSystem - An object providing file system methods (must have an 'open' method).
 * @returns {Object} An object containing ReadStream and WriteStream constructors.
 */
function createFileStreamConstructors(fileSystem) {
  /**
   * Readable file stream constructor.
   *
   * @constructor
   * @param {string} filePath - The path to the file to read from.
   * @param {Object} [options={}] - Optional configuration for the stream.
   */
  function ReadStream(filePath, options = {}) {
    if (!(this instanceof ReadStream)) {
      return new ReadStream(filePath, options);
    }
    XfA.call(this); // Call parent constructor (assumed to be EventEmitter or similar)

    const self = this;
    this.path = filePath;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = 'r';
    this.mode = 0o666; // 438 in octal
    this.bufferSize = 65536;

    // Override defaults with options
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
      if (typeof this.start !== 'number') {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if (typeof this.end !== 'number') {
        throw TypeError('end must be a Number');
      }
      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }
      this.pos = this.start;
    }

    // If file descriptor is already set, start reading on next tick
    if (this.fd !== null) {
      process.nextTick(function () {
        self._read();
      });
      return;
    }

    // Otherwise, open the file asynchronously
    fileSystem.open(this.path, this.flags, this.mode, function (openError, fd) {
      if (openError) {
        self.emit('error', openError);
        self.readable = false;
        return;
      }
      self.fd = fd;
      self.emit('open', fd);
      self._read();
    });
  }

  /**
   * Writable file stream constructor.
   *
   * @constructor
   * @param {string} filePath - The path to the file to write to.
   * @param {Object} [options={}] - Optional configuration for the stream.
   */
  function WriteStream(filePath, options = {}) {
    if (!(this instanceof WriteStream)) {
      return new WriteStream(filePath, options);
    }
    XfA.call(this); // Call parent constructor (assumed to be EventEmitter or similar)

    this.path = filePath;
    this.fd = null;
    this.writable = true;
    this.flags = 'processWithTransformedObservable';
    this.encoding = 'binary';
    this.mode = 0o666; // 438 in octal
    this.bytesWritten = 0;

    // Override defaults with options
    const optionKeys = Object.keys(options);
    for (let i = 0; i < optionKeys.length; i++) {
      const key = optionKeys[i];
      this[key] = options[key];
    }

    // Handle start position for partial writes
    if (this.start !== undefined) {
      if (typeof this.start !== 'number') {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }
      this.pos = this.start;
    }

    // Initialize internal state
    this.busy = false;
    this._queue = [];

    // If file descriptor is not set, queue an open operation and flush
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

module.exports = createFileStreamConstructors;