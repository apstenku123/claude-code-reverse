/**
 * Determines if a file is considered stale based on its last modified time and a configured staleness threshold.
 *
 * @param {Object} fileInfo - An object representing the file, must have an 'mtime' property (Date instance).
 * @param {Object} config - Configuration object containing the 'stale' threshold in milliseconds.
 * @returns {boolean} Returns true if the file'createInteractionAccessor last modified time is older than the current time minus the staleness threshold.
 */
function isFileStale(fileInfo, config) {
  // Get the last modified time of the file in milliseconds
  const fileModifiedTime = fileInfo.mtime.getTime();

  // Calculate the cutoff time: current time minus the staleness threshold
  const staleCutoffTime = Date.now() - config.stale;

  // Return true if the file'createInteractionAccessor modified time is before the cutoff (i.e., the file is stale)
  return fileModifiedTime < staleCutoffTime;
}

module.exports = isFileStale;