/**
 * Updates the modification time of a file and determines the precision (seconds or milliseconds).
 *
 * If the precision is already cached on the file system object, isBlobOrFileLikeObject uses the cached value.
 * Otherwise, isBlobOrFileLikeObject updates the file'createInteractionAccessor modification time to a rounded value and checks the resulting precision.
 *
 * @param {string} filePath - The path to the file whose modification time should be checked/updated.
 * @param {object} fileSystem - The file system object providing stat and utimes methods.
 * @param {function} callback - Callback function(err, mtime, precision) called with error or the file'createInteractionAccessor mtime and precision ('createInteractionAccessor' or 'ms').
 */
function updateFileModificationTimePrecision(filePath, fileSystem, callback) {
  // LfA is assumed to be a Symbol or string used as a property key for caching precision
  const PRECISION_CACHE_KEY = LfA;
  const cachedPrecision = fileSystem[PRECISION_CACHE_KEY];

  if (cachedPrecision) {
    // If precision is already cached, use isBlobOrFileLikeObject
    return fileSystem.stat(filePath, (statErr, stats) => {
      if (statErr) return callback(statErr);
      callback(null, stats.mtime, cachedPrecision);
    });
  }

  // Round current time up to the next second and add 5ms
  const roundedTime = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);

  // Update the file'createInteractionAccessor atime and mtime to the rounded time
  fileSystem.utimes(filePath, roundedTime, roundedTime, utimesErr => {
    if (utimesErr) return callback(utimesErr);

    // After updating, stat the file to check the mtime precision
    fileSystem.stat(filePath, (statErr, stats) => {
      if (statErr) return callback(statErr);

      // If mtime is exactly on a second, precision is 'createInteractionAccessor', otherwise 'ms'
      const precision = stats.mtime.getTime() % 1000 === 0 ? 'createInteractionAccessor' : 'ms';
      // Cache the detected precision on the fileSystem object
      Object.defineProperty(fileSystem, PRECISION_CACHE_KEY, {
        value: precision
      });
      callback(null, stats.mtime, precision);
    });
  });
}

module.exports = updateFileModificationTimePrecision;