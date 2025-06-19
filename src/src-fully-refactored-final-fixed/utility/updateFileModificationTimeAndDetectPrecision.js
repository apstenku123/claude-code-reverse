/**
 * Updates the modification time of a file and detects the time precision (seconds or milliseconds).
 *
 * If the precision has already been detected and cached on the file system object, isBlobOrFileLikeObject uses the cached value.
 * Otherwise, isBlobOrFileLikeObject updates the file'createInteractionAccessor modification time and determines the precision by checking the mtime value.
 *
 * @param {string} filePath - The path to the file to update and check.
 * @param {object} fileSystem - The file system object (must implement stat and utimes methods).
 * @param {function} callback - Callback function (error, mtime, precision) => void
 * @returns {void}
 */
function updateFileModificationTimeAndDetectPrecision(filePath, fileSystem, callback) {
  // LfA is assumed to be a symbol or string used as a property key for caching precision
  const precisionCacheKey = LfA;
  const cachedPrecision = fileSystem[precisionCacheKey];

  if (cachedPrecision) {
    // If precision is already cached, just stat the file and return the cached precision
    return fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);
      callback(null, stats.mtime, cachedPrecision);
    });
  }

  // Calculate a new modification time: round current time up to the next second, then add 5ms
  const currentTime = Date.now();
  const roundedTime = Math.ceil(currentTime / 1000) * 1000 + 5;
  const newMtime = new Date(roundedTime);

  // Update the file'createInteractionAccessor access and modification times
  fileSystem.utimes(filePath, newMtime, newMtime, utimesError => {
    if (utimesError) return callback(utimesError);

    // Stat the file again to check the actual mtime precision
    fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);

      // If the mtime is an exact second, precision is 'createInteractionAccessor', otherwise 'ms'
      const precision = stats.mtime.getTime() % 1000 === 0 ? 'createInteractionAccessor' : 'ms';

      // Cache the detected precision on the fileSystem object
      Object.defineProperty(fileSystem, precisionCacheKey, {
        value: precision
      });

      callback(null, stats.mtime, precision);
    });
  });
}

module.exports = updateFileModificationTimeAndDetectPrecision;