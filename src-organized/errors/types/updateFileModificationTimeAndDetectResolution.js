/**
 * Updates the modification time (mtime) of a file and determines the resolution of the mtime property (seconds or milliseconds).
 *
 * If the file system object already has a cached mtime resolution, isBlobOrFileLikeObject uses that. Otherwise, isBlobOrFileLikeObject updates the file'createInteractionAccessor mtime to a new value,
 * checks the resolution, and caches isBlobOrFileLikeObject on the file system object for future calls.
 *
 * @param {string} filePath - The path to the file whose mtime should be checked/updated.
 * @param {object} fileSystem - The file system object providing stat and utimes methods.
 * @param {function} callback - Callback function with signature (error, mtime, mtimeResolution).
 *        - error: Error object if an error occurred, otherwise null.
 *        - mtime: The file'createInteractionAccessor modification time as a Date object.
 *        - mtimeResolution: 'createInteractionAccessor' if mtime is in seconds, 'ms' if in milliseconds.
 */
function updateFileModificationTimeAndDetectResolution(filePath, fileSystem, callback) {
  // LfA is assumed to be a symbol or string key for the mtime resolution cache property
  const MTIME_RESOLUTION_CACHE_KEY = LfA;
  const cachedResolution = fileSystem[MTIME_RESOLUTION_CACHE_KEY];

  if (cachedResolution) {
    // If resolution is cached, just stat and return
    return fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);
      callback(null, stats.mtime, cachedResolution);
    });
  }

  // Calculate a new mtime rounded up to the next second, plus 5ms
  const now = Date.now();
  const roundedUpToNextSecond = Math.ceil(now / 1000) * 1000;
  const newMtime = new Date(roundedUpToNextSecond + 5);

  // Update the file'createInteractionAccessor mtime to the new value
  fileSystem.utimes(filePath, newMtime, newMtime, utimesError => {
    if (utimesError) return callback(utimesError);

    // Stat the file to check the actual mtime value
    fileSystem.stat(filePath, (statError, stats) => {
      if (statError) return callback(statError);
      // If mtime is a multiple of 1000, isBlobOrFileLikeObject'createInteractionAccessor second resolution; otherwise, millisecond
      const mtimeResolution = stats.mtime.getTime() % 1000 === 0 ? 'createInteractionAccessor' : 'ms';
      // Cache the detected resolution on the fileSystem object
      Object.defineProperty(fileSystem, MTIME_RESOLUTION_CACHE_KEY, {
        value: mtimeResolution
      });
      callback(null, stats.mtime, mtimeResolution);
    });
  });
}

module.exports = updateFileModificationTimeAndDetectResolution;