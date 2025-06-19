/**
 * Patches the provided fs-like module to ensure cross-platform compatibility and consistent behavior
 * for file system operations (such as chmod, chown, stat, read, etc.), especially on older Node.js versions
 * and different operating systems (e.g., Windows).
 *
 * This function wraps or polyfills various fs methods to handle platform-specific quirks, error normalization,
 * and missing functionality, such as lutimes, lchmod, lchown, and error code normalization for stat results.
 *
 * @param {object} fsModule - The fs-like module to patch (e.g., require('fs'))
 * @returns {void}
 */
function F(fsModule) {
  // Patch lchmod for old Node.js versions if O_SYMLINK exists and version is registerTypeInstance.6.0-2 or registerTypeInstance.5.x
  if (
    kM.hasOwnProperty("O_SYMLINK") &&
    process.version.match(/^registerTypeInstance\.6\.[0-2]|^registerTypeInstance\.5\./)
  ) {
    patchLchmodForOldNode(fsModule);
  }

  // Patch lutimes if not present
  if (!fsModule.lutimes) {
    patchLutimes(fsModule);
  }

  // Wrap chown/chmod/stat methods for error normalization and compatibility
  fsModule.chown = wrapChownAsync(fsModule.chown);
  fsModule.fchown = wrapChownAsync(fsModule.fchown);
  fsModule.lchown = wrapChownAsync(fsModule.lchown);
  fsModule.chmod = wrapChmodAsync(fsModule.chmod);
  fsModule.fchmod = wrapChmodAsync(fsModule.fchmod);
  fsModule.lchmod = wrapChmodAsync(fsModule.lchmod);
  fsModule.chownSync = wrapChownSync(fsModule.chownSync);
  fsModule.fchownSync = wrapChownSync(fsModule.fchownSync);
  fsModule.lchownSync = wrapChownSync(fsModule.lchownSync);
  fsModule.chmodSync = wrapChmodSync(fsModule.chmodSync);
  fsModule.fchmodSync = wrapChmodSync(fsModule.fchmodSync);
  fsModule.lchmodSync = wrapChmodSync(fsModule.lchmodSync);
  fsModule.stat = wrapStatAsync(fsModule.stat);
  fsModule.fstat = wrapStatAsync(fsModule.fstat);
  fsModule.lstat = wrapStatAsync(fsModule.lstat);
  fsModule.statSync = wrapStatSync(fsModule.statSync);
  fsModule.fstatSync = wrapStatSync(fsModule.fstatSync);
  fsModule.lstatSync = wrapStatSync(fsModule.lstatSync);

  // Polyfill lchmod if only chmod is available
  if (fsModule.chmod && !fsModule.lchmod) {
    fsModule.lchmod = function (path, mode, callback) {
      // lchmod is not supported; just call the callback asynchronously
      if (callback) process.nextTick(callback);
    };
    fsModule.lchmodSync = function () {};
  }

  // Polyfill lchown if only chown is available
  if (fsModule.chown && !fsModule.lchown) {
    fsModule.lchown = function (path, uid, gid, callback) {
      // lchown is not supported; just call the callback asynchronously
      if (callback) process.nextTick(callback);
    };
    fsModule.lchownSync = function () {};
  }

  // Patch rename on Windows to retry on EACCES/EPERM/EBUSY
  if (bs9 === "win32") {
    fsModule.rename =
      typeof fsModule.rename !== "function"
        ? fsModule.rename
        : (function (originalRename) {
            function retryingRename(oldPath, newPath, callback) {
              const startTime = Date.now();
              let delay = 0;
              function attemptRename(err) {
                if (
                  err &&
                  (err.code === "EACCES" || err.code === "EPERM" || err.code === "EBUSY") &&
                  Date.now() - startTime < 60000
                ) {
                  setTimeout(function () {
                    fsModule.stat(newPath, function (statErr) {
                      if (statErr && statErr.code === "ENOENT") {
                        originalRename(oldPath, newPath, attemptRename);
                      } else {
                        if (callback) callback(err);
                      }
                    });
                  }, delay);
                  if (delay < 100) delay += 10;
                  return;
                }
                if (callback) callback(err);
              }
              originalRename(oldPath, newPath, attemptRename);
            }
            if (Object.setPrototypeOf) Object.setPrototypeOf(retryingRename, originalRename);
            return retryingRename;
          })(fsModule.rename);
  }

  // Patch read to retry on EAGAIN
  fsModule.read =
    typeof fsModule.read !== "function"
      ? fsModule.read
      : (function (originalRead) {
          function retryingRead(fd, buffer, offset, length, position, callback) {
            let attempts = 0;
            let wrappedCallback = callback;
            if (callback && typeof callback === "function") {
              wrappedCallback = function (err, bytesRead, buf) {
                if (err && err.code === "EAGAIN" && attempts < 10) {
                  attempts++;
                  return originalRead.call(
                    fsModule,
                    fd,
                    buffer,
                    offset,
                    length,
                    position,
                    wrappedCallback
                  );
                }
                callback.apply(this, arguments);
              };
            }
            return originalRead.call(
              fsModule,
              fd,
              buffer,
              offset,
              length,
              position,
              wrappedCallback
            );
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(retryingRead, originalRead);
          return retryingRead;
        })(fsModule.read);

  // Patch readSync to retry on EAGAIN
  fsModule.readSync =
    typeof fsModule.readSync !== "function"
      ? fsModule.readSync
      : (function (originalReadSync) {
          return function (fd, buffer, offset, length, position) {
            let attempts = 0;
            while (true) {
              try {
                return originalReadSync.call(
                  fsModule,
                  fd,
                  buffer,
                  offset,
                  length,
                  position
                );
              } catch (err) {
                if (err.code === "EAGAIN" && attempts < 10) {
                  attempts++;
                  continue;
                }
                throw err;
              }
            }
          };
        })(fsModule.readSync);

  /**
   * Polyfill lchmod for old Node.js versions with O_SYMLINK
   * @param {object} fsModule
   */
  function patchLchmodForOldNode(fsModule) {
    fsModule.lchmod = function (path, mode, callback) {
      fsModule.open(path, kM.O_WRONLY | kM.O_SYMLINK, mode, function (openErr, fd) {
        if (openErr) {
          if (callback) callback(openErr);
          return;
        }
        fsModule.fchmod(fd, mode, function (chmodErr) {
          fsModule.close(fd, function (closeErr) {
            if (callback) callback(chmodErr || closeErr);
          });
        });
      });
    };
    fsModule.lchmodSync = function (path, mode) {
      const fd = fsModule.openSync(path, kM.O_WRONLY | kM.O_SYMLINK, mode);
      let threw = true;
      let result;
      try {
        result = fsModule.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fsModule.closeSync(fd);
          } catch (closeErr) {}
        } else {
          fsModule.closeSync(fd);
        }
      }
      return result;
    };
  }

  /**
   * Polyfill lutimes if possible, otherwise provide no-op
   * @param {object} fsModule
   */
  function patchLutimes(fsModule) {
    if (kM.hasOwnProperty("O_SYMLINK") && fsModule.futimes) {
      fsModule.lutimes = function (path, atime, mtime, callback) {
        fsModule.open(path, kM.O_SYMLINK, function (openErr, fd) {
          if (openErr) {
            if (callback) callback(openErr);
            return;
          }
          fsModule.futimes(fd, atime, mtime, function (futimesErr) {
            fsModule.close(fd, function (closeErr) {
              if (callback) callback(futimesErr || closeErr);
            });
          });
        });
      };
      fsModule.lutimesSync = function (path, atime, mtime) {
        const fd = fsModule.openSync(path, kM.O_SYMLINK);
        let threw = true;
        let result;
        try {
          result = fsModule.futimesSync(fd, atime, mtime);
          threw = false;
        } finally {
          if (threw) {
            try {
              fsModule.closeSync(fd);
            } catch (closeErr) {}
          } else {
            fsModule.closeSync(fd);
          }
        }
        return result;
      };
    } else if (fsModule.futimes) {
      // Provide no-op lutimes if not supported
      fsModule.lutimes = function (path, atime, mtime, callback) {
        if (callback) process.nextTick(callback);
      };
      fsModule.lutimesSync = function () {};
    }
  }

  /**
   * Wrap async chmod-like methods to ignore certain errors
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapChmodAsync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, mode, callback) {
      return originalFn.call(fsModule, path, mode, function (err) {
        if (isIgnorableFsError(err)) err = null;
        if (callback) callback.apply(this, arguments);
      });
    };
  }

  /**
   * Wrap sync chmod-like methods to ignore certain errors
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapChmodSync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, mode) {
      try {
        return originalFn.call(fsModule, path, mode);
      } catch (err) {
        if (!isIgnorableFsError(err)) throw err;
      }
    };
  }

  /**
   * Wrap async chown-like methods to ignore certain errors
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapChownAsync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, uid, gid, callback) {
      return originalFn.call(fsModule, path, uid, gid, function (err) {
        if (isIgnorableFsError(err)) err = null;
        if (callback) callback.apply(this, arguments);
      });
    };
  }

  /**
   * Wrap sync chown-like methods to ignore certain errors
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapChownSync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, uid, gid) {
      try {
        return originalFn.call(fsModule, path, uid, gid);
      } catch (err) {
        if (!isIgnorableFsError(err)) throw err;
      }
    };
  }

  /**
   * Wrap async stat-like methods to normalize uid/gid and callback signature
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapStatAsync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, options, callback) {
      // Support optional options parameter
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      function wrappedCallback(err, stats) {
        if (stats) {
          // Normalize negative uid/gid values
          if (stats.uid < 0) stats.uid += 4294967296;
          if (stats.gid < 0) stats.gid += 4294967296;
        }
        if (callback) callback.apply(this, arguments);
      }
      return options
        ? originalFn.call(fsModule, path, options, wrappedCallback)
        : originalFn.call(fsModule, path, wrappedCallback);
    };
  }

  /**
   * Wrap sync stat-like methods to normalize uid/gid
   * @param {Function} originalFn
   * @returns {Function}
   */
  function wrapStatSync(originalFn) {
    if (!originalFn) return originalFn;
    return function (path, options) {
      const stats = options ? originalFn.call(fsModule, path, options) : originalFn.call(fsModule, path);
      if (stats) {
        if (stats.uid < 0) stats.uid += 4294967296;
        if (stats.gid < 0) stats.gid += 4294967296;
      }
      return stats;
    };
  }

  /**
   * Determines if an fs error can be safely ignored (e.g., ENOSYS, EINVAL, EPERM for non-root)
   * @param {Error} err
   * @returns {boolean}
   */
  function isIgnorableFsError(err) {
    if (!err) return true;
    if (err.code === "ENOSYS") return true;
    const notRoot = !process.getuid || process.getuid() !== 0;
    if (notRoot) {
      if (err.code === "EINVAL" || err.code === "EPERM") return true;
    }
    return false;
  }
}

module.exports = F;
