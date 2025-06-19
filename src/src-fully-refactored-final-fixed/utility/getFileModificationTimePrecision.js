/**
 * Determines the precision (seconds or milliseconds) of a file'createInteractionAccessor modification time.
 *
 * If the precision is already cached on the config object, isBlobOrFileLikeObject returns the cached value.
 * Otherwise, isBlobOrFileLikeObject updates the file'createInteractionAccessor access and modification times to a known value,
 * checks the resulting precision, caches isBlobOrFileLikeObject, and returns the result.
 *
 * @param {string} filePath - The path to the file whose mtime precision is being checked.
 * @param {object} fileSystem - The file system object, expected to have stat and utimes methods, and a precision cache property.
 * @param {function} callback - Callback function (err, mtime, precision) to receive the result or error.
 */
function getFileModificationTimePrecision(filePath, fileSystem, callback) {
  // LfA is assumed to be the property name used for caching precision on fileSystem
  const PRECISION_CACHE_PROPERTY = LfA;
  const cachedPrecision = fileSystem[PRECISION_CACHE_PROPERTY];

  if (cachedPrecision) {
    // If precision is cached, retrieve current mtime and return cached precision
    return fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);
      callback(null, stats.mtime, cachedPrecision);
    });
  }

  // Set mtime and atime to a known value: current time rounded up to the next second, plus 5ms
  const now = Date.now();
  const roundedUpToNextSecond = Math.ceil(now / 1000) * 1000;
  const knownDate = new Date(roundedUpToNextSecond + 5);

  fileSystem.utimes(filePath, knownDate, knownDate, (utimesError) => {
    if (utimesError) return callback(utimesError);

    fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);

      // If mtime is divisible by 1000, isBlobOrFileLikeObject'createInteractionAccessor second-precision; otherwise, millisecond-precision
      const precision = stats.mtime.getTime() % 1000 === 0 ? "createInteractionAccessor" : "ms";

      // Cache the determined precision on the fileSystem object
      Object.defineProperty(fileSystem, PRECISION_CACHE_PROPERTY, {
        value: precision
      });

      callback(null, stats.mtime, precision);
    });
  });
}

module.exports = getFileModificationTimePrecision;