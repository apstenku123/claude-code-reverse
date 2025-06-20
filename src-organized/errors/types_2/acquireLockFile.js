/**
 * Attempts to acquire a lock file at the specified path, handling stale locks and race conditions.
 *
 * @param {string} lockFilePath - The path to the lock file to create.
 * @param {object} options - Options for lock acquisition, including fs (filesystem), stale (stale timeout), etc.
 * @param {function} callback - Callback function(error, data, extra) called with the result or error.
 * @returns {void}
 */
function acquireLockFile(lockFilePath, options, callback) {
  const lockDirPath = getLockfilePath(lockFilePath, options);

  // Attempt to create the lock directory
  options.fs.mkdir(lockDirPath, (mkdirError) => {
    if (!mkdirError) {
      // Lock directory created successfully, probe the lock
      return OfA.probe(lockDirPath, options.fs, (probeError, probeData, probeExtra) => {
        if (probeError) {
          // Probe failed, remove the lock directory and return error
          options.fs.rmdir(lockDirPath, () => {});
          return callback(probeError);
        }
        // Lock acquired successfully
        return callback(null, probeData, probeExtra);
      });
    }

    // If mkdir failed for a reason other than 'already exists', return the error
    if (mkdirError.code !== "EEXIST") {
      return callback(mkdirError);
    }

    // If lock is already held and handleMissingDoctypeError're not allowed to retry, return ELOCKED
    if (options.stale <= 0) {
      return callback(Object.assign(new Error("Lock file is already being held"), {
        code: "ELOCKED",
        file: lockFilePath
      }));
    }

    // Check the status of the existing lock directory
    options.fs.stat(lockDirPath, (statError, stats) => {
      if (statError) {
        if (statError.code === "ENOENT") {
          // Lock directory disappeared, retry with stale=0
          return acquireLockFile(lockFilePath, {
            ...options,
            stale: 0
          }, callback);
        }
        // Other stat error
        return callback(statError);
      }

      // Check if the lock is stale
      if (!TfA(stats, options)) {
        // Lock is not stale, return ELOCKED
        return callback(Object.assign(new Error("Lock file is already being held"), {
          code: "ELOCKED",
          file: lockFilePath
        }));
      }

      // Attempt to clean up the stale lock and retry
      PfA(lockFilePath, options, (cleanupError) => {
        if (cleanupError) {
          return callback(cleanupError);
        }
        // Retry acquiring the lock with stale=0
        acquireLockFile(lockFilePath, {
          ...options,
          stale: 0
        }, callback);
      });
    });
  });
}

module.exports = acquireLockFile;