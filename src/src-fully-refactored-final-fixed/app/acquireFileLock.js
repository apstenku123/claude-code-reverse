/**
 * Attempts to acquire a lock on a file by creating a lock directory. Handles stale locks and lock contention.
 *
 * @param {string} lockFilePath - The path to the file to lock.
 * @param {object} options - Options for lock acquisition. Must include 'fs' (filesystem API), 'stale' (stale lock timeout), and other lock options.
 * @param {function} callback - Callback function(error, lockData, extraData). Called with error if lock cannot be acquired.
 * @returns {void}
 */
function acquireFileLock(lockFilePath, options, callback) {
  // Compute the lock directory path based on the file to lock and options
  const lockDirPath = getLockfilePath(lockFilePath, options);

  // Attempt to create the lock directory
  options.fs.mkdir(lockDirPath, (mkdirError) => {
    if (!mkdirError) {
      // Lock directory created successfully; probe the lock
      return OfA.probe(lockDirPath, options.fs, (probeError, lockData, extraData) => {
        if (probeError) {
          // If probing fails, remove the lock directory and return error
          options.fs.rmdir(lockDirPath, () => {});
          return callback(probeError);
        }
        // Lock acquired successfully
        return callback(null, lockData, extraData);
      });
    }

    // If mkdir failed for a reason other than 'already exists', return the error
    if (mkdirError.code !== "EEXIST") {
      return callback(mkdirError);
    }

    // If the lock is not allowed to be stale, return an ELOCKED error
    if (options.stale <= 0) {
      return callback(Object.assign(new Error("Lock file is already being held"), {
        code: "ELOCKED",
        file: lockFilePath
      }));
    }

    // Check the status of the existing lock directory
    options.fs.stat(lockDirPath, (statError, statData) => {
      if (statError) {
        if (statError.code === "ENOENT") {
          // Lock directory disappeared, retry with stale=0
          return acquireFileLock(lockFilePath, { ...options, stale: 0 }, callback);
        }
        // Other stat error
        return callback(statError);
      }

      // Check if the lock is stale
      if (!TfA(statData, options)) {
        // Lock is not stale, return ELOCKED error
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
        acquireFileLock(lockFilePath, { ...options, stale: 0 }, callback);
      });
    });
  });
}

module.exports = acquireFileLock;