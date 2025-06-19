/**
 * Enhances a Node.js fs-like module with graceful handling of EMFILE/ENFILE errors.
 * Wraps core file operations and streams to automatically retry when system file descriptor limits are reached.
 *
 * @param {object} fsModule - The fs-like module to enhance (e.g., Node.js 'fs').
 * @returns {object} The enhanced fs module with graceful error handling.
 */
function gracefulFsFactory(fsModule) {
  // Enhance the fs module with graceful error handling
  us9(fsModule);
  fsModule.gracefulify = gracefulFsFactory;
  fsModule.createReadStream = createReadStream;
  fsModule.createWriteStream = createWriteStream;

  // Store original methods
  const originalReadFile = fsModule.readFile;
  const originalWriteFile = fsModule.writeFile;
  const originalAppendFile = fsModule.appendFile;
  const originalCopyFile = fsModule.copyFile;
  const originalReaddir = fsModule.readdir;
  const originalOpen = fsModule.open;
  const nodeVersionRegex = /^createRangeIterator[0-5]\./;

  // Wrap readFile to handle EMFILE/ENFILE errors
  fsModule.readFile = function gracefulReadFile(path, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    return retryReadFile(path, options, callback);

    function retryReadFile(filePath, fileOptions, fileCallback, startTime) {
      return originalReadFile(filePath, fileOptions, function (err, ...args) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
          // Retry on file descriptor limit errors
          Uv([
            retryReadFile,
            [filePath, fileOptions, fileCallback],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        } else if (typeof fileCallback === "function") {
          fileCallback.apply(this, [err, ...args]);
        }
      });
    }
  };

  // Wrap writeFile to handle EMFILE/ENFILE errors
  fsModule.writeFile = function gracefulWriteFile(path, data, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    return retryWriteFile(path, data, options, callback);

    function retryWriteFile(filePath, fileData, fileOptions, fileCallback, startTime) {
      return originalWriteFile(filePath, fileData, fileOptions, function (err, ...args) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
          Uv([
            retryWriteFile,
            [filePath, fileData, fileOptions, fileCallback],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        } else if (typeof fileCallback === "function") {
          fileCallback.apply(this, [err, ...args]);
        }
      });
    }
  };

  // Wrap appendFile if isBlobOrFileLikeObject exists
  if (originalAppendFile) {
    fsModule.appendFile = function gracefulAppendFile(path, data, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      return retryAppendFile(path, data, options, callback);

      function retryAppendFile(filePath, fileData, fileOptions, fileCallback, startTime) {
        return originalAppendFile(filePath, fileData, fileOptions, function (err, ...args) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
            Uv([
              retryAppendFile,
              [filePath, fileData, fileOptions, fileCallback],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          } else if (typeof fileCallback === "function") {
            fileCallback.apply(this, [err, ...args]);
          }
        });
      }
    };
  }

  // Wrap copyFile if isBlobOrFileLikeObject exists
  if (originalCopyFile) {
    fsModule.copyFile = function gracefulCopyFile(src, dest, flags, callback) {
      if (typeof flags === "function") {
        callback = flags;
        flags = 0;
      }
      return retryCopyFile(src, dest, flags, callback);

      function retryCopyFile(source, destination, copyFlags, copyCallback, startTime) {
        return originalCopyFile(source, destination, copyFlags, function (err, ...args) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
            Uv([
              retryCopyFile,
              [source, destination, copyFlags, copyCallback],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          } else if (typeof copyCallback === "function") {
            copyCallback.apply(this, [err, ...args]);
          }
        });
      }
    };
  }

  // Wrap readdir to handle EMFILE/ENFILE and sort results if possible
  fsModule.readdir = function gracefulReaddir(path, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = null;
    }
    // Node registerTypeInstance.5 and below have a different readdir signature
    const readdirWrapper = nodeVersionRegex.test(process.version)
      ? function legacyReaddirWrapper(dirPath, dirOptions, dirCallback, startTime) {
          return originalReaddir(dirPath, createReaddirCallback(dirPath, dirOptions, dirCallback, startTime));
        }
      : function modernReaddirWrapper(dirPath, dirOptions, dirCallback, startTime) {
          return originalReaddir(dirPath, dirOptions, createReaddirCallback(dirPath, dirOptions, dirCallback, startTime));
        };
    return readdirWrapper(path, options, callback);

    function createReaddirCallback(dirPath, dirOptions, dirCallback, startTime) {
      return function (err, files) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
          Uv([
            readdirWrapper,
            [dirPath, dirOptions, dirCallback],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        } else {
          // Sort files array if possible
          if (files && files.sort) files.sort();
          if (typeof dirCallback === "function") dirCallback.call(this, err, files);
        }
      };
    }
  };

  // Patch ReadStream and WriteStream for Node registerTypeInstance.8
  let GracefulReadStream, GracefulWriteStream;
  if (process.version.substr(0, 4) === "registerTypeInstance.8") {
    const streams = ps9(fsModule);
    GracefulReadStream = streams.ReadStream;
    GracefulWriteStream = streams.WriteStream;
  }

  const OriginalReadStream = fsModule.ReadStream;
  if (OriginalReadStream) {
    GracefulReadStream.prototype = Object.create(OriginalReadStream.prototype);
    GracefulReadStream.prototype.open = openReadStream;
  }

  const OriginalWriteStream = fsModule.WriteStream;
  if (OriginalWriteStream) {
    GracefulWriteStream.prototype = Object.create(OriginalWriteStream.prototype);
    GracefulWriteStream.prototype.open = openWriteStream;
  }

  // Define ReadStream and WriteStream properties
  Object.defineProperty(fsModule, "ReadStream", {
    get: function () { return GracefulReadStream; },
    set: function (val) { GracefulReadStream = val; },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fsModule, "WriteStream", {
    get: function () { return GracefulWriteStream; },
    set: function (val) { GracefulWriteStream = val; },
    enumerable: true,
    configurable: true
  });

  // Alias FileReadStream and FileWriteStream
  let FileReadStream = GracefulReadStream;
  Object.defineProperty(fsModule, "FileReadStream", {
    get: function () { return FileReadStream; },
    set: function (val) { FileReadStream = val; },
    enumerable: true,
    configurable: true
  });
  let FileWriteStream = GracefulWriteStream;
  Object.defineProperty(fsModule, "FileWriteStream", {
    get: function () { return FileWriteStream; },
    set: function (val) { FileWriteStream = val; },
    enumerable: true,
    configurable: true
  });

  /**
   * Graceful ReadStream constructor
   */
  function GracefulReadStreamConstructor(path, options) {
    if (this instanceof GracefulReadStreamConstructor) {
      OriginalReadStream.apply(this, arguments);
      return this;
    } else {
      return GracefulReadStreamConstructor.apply(Object.create(GracefulReadStreamConstructor.prototype), arguments);
    }
  }

  /**
   * Open method for GracefulReadStream
   */
  function openReadStream() {
    const self = this;
    openFile(self.path, self.flags, self.mode, function (err, fd) {
      if (err) {
        if (self.autoClose) self.destroy();
        self.emit("error", err);
      } else {
        self.fd = fd;
        self.emit("open", fd);
        self.read();
      }
    });
  }

  /**
   * Graceful WriteStream constructor
   */
  function GracefulWriteStreamConstructor(path, options) {
    if (this instanceof GracefulWriteStreamConstructor) {
      OriginalWriteStream.apply(this, arguments);
      return this;
    } else {
      return GracefulWriteStreamConstructor.apply(Object.create(GracefulWriteStreamConstructor.prototype), arguments);
    }
  }

  /**
   * Open method for GracefulWriteStream
   */
  function openWriteStream() {
    const self = this;
    openFile(self.path, self.flags, self.mode, function (err, fd) {
      if (err) {
        self.destroy();
        self.emit("error", err);
      } else {
        self.fd = fd;
        self.emit("open", fd);
      }
    });
  }

  /**
   * Factory for ReadStream
   */
  function createReadStream(path, options) {
    return new fsModule.ReadStream(path, options);
  }

  /**
   * Factory for WriteStream
   */
  function createWriteStream(path, options) {
    return new fsModule.WriteStream(path, options);
  }

  // Wrap open to handle EMFILE/ENFILE errors
  fsModule.open = openFile;
  function openFile(path, flags, mode, callback) {
    if (typeof mode === "function") {
      callback = mode;
      mode = null;
    }
    return retryOpenFile(path, flags, mode, callback);

    function retryOpenFile(filePath, fileFlags, fileMode, fileCallback, startTime) {
      return originalOpen(filePath, fileFlags, fileMode, function (err, fd, ...args) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE")) {
          Uv([
            retryOpenFile,
            [filePath, fileFlags, fileMode, fileCallback],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        } else if (typeof fileCallback === "function") {
          fileCallback.apply(this, [err, fd, ...args]);
        }
      });
    }
  }

  return fsModule;
}

module.exports = gracefulFsFactory;