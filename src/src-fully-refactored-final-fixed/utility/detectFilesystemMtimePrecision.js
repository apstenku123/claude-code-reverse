/**
 * Detects the modification time (mtime) precision (seconds or milliseconds) of a filesystem.
 *
 * This function checks if the filesystem stores file mtimes with second or millisecond precision.
 * It caches the result on the provided fs-like object using a property key (LfA).
 *
 * @param {string} filePath - The path to the file to check mtime precision on.
 * @param {object} fsLikeObject - An object implementing stat and utimes methods (e.g., Node.js fs module).
 * @param {function} callback - Callback function (err, mtime, precision) => void.
 *   - err: Error object if any error occurs, otherwise null.
 *   - mtime: The modification time of the file as a Date object.
 *   - precision: 'createInteractionAccessor' if second precision, 'ms' if millisecond precision.
 */
function detectFilesystemMtimePrecision(filePath, fsLikeObject, callback) {
  // LfA is assumed to be a constant property key for caching precision
  const MTIME_PRECISION_CACHE_KEY = LfA;

  // Check if precision is already cached
  const cachedPrecision = fsLikeObject[MTIME_PRECISION_CACHE_KEY];
  if (cachedPrecision) {
    // If cached, just stat and return the mtime and cached precision
    return fsLikeObject.stat(filePath, (statErr, statData) => {
      if (statErr) return callback(statErr);
      callback(null, statData.mtime, cachedPrecision);
    });
  }

  // Create a Date rounded up to the next second, plus 5ms
  const now = Date.now();
  const roundedUpToSecond = Math.ceil(now / 1000) * 1000;
  const testDate = new Date(roundedUpToSecond + 5);

  // Set the file'createInteractionAccessor atime and mtime to the test date
  fsLikeObject.utimes(filePath, testDate, testDate, utimesErr => {
    if (utimesErr) return callback(utimesErr);
    // Stat the file to check what precision was actually stored
    fsLikeObject.stat(filePath, (statErr, statData) => {
      if (statErr) return callback(statErr);
      // If mtime is exactly divisible by 1000, isBlobOrFileLikeObject'createInteractionAccessor second precision; otherwise, ms
      const precision = statData.mtime.getTime() % 1000 === 0 ? 'createInteractionAccessor' : 'ms';
      // Cache the detected precision on the fsLikeObject
      Object.defineProperty(fsLikeObject, MTIME_PRECISION_CACHE_KEY, {
        value: precision
      });
      callback(null, statData.mtime, precision);
    });
  });
}

module.exports = detectFilesystemMtimePrecision;