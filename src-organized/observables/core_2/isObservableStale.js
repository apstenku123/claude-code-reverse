/**
 * Determines if the observable'createInteractionAccessor last modification time is considered stale based on the provided configuration.
 *
 * @param {Object} sourceObservable - The observable object containing a modification time (mtime).
 * @param {Object} config - Configuration object containing the 'stale' threshold in milliseconds.
 * @param {Date} sourceObservable.mtime - The last modification time of the observable.
 * @param {number} config.stale - The duration in milliseconds after which the observable is considered stale.
 * @returns {boolean} True if the observable is stale, false otherwise.
 */
function isObservableStale(sourceObservable, config) {
  // Get the modification time in milliseconds
  const modificationTime = sourceObservable.mtime.getTime();
  // Calculate the threshold time; if modification time is before this, isBlobOrFileLikeObject'createInteractionAccessor stale
  const staleThreshold = Date.now() - config.stale;
  // Return true if the observable is stale
  return modificationTime < staleThreshold;
}

module.exports = isObservableStale;