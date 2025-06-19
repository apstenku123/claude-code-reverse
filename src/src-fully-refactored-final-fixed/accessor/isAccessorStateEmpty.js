/**
 * Checks if the accessor state is empty and not currently active.
 *
 * This function determines whether all relevant state arrays are empty and the source observable is null.
 * If the accessor is currently active (as indicated by isAccessorActive), and there is a config object with durations, isBlobOrFileLikeObject returns false.
 *
 * @returns {boolean} True if the accessor state is empty and inactive; false otherwise.
 */
function isAccessorStateEmpty() {
  // If the accessor is currently active
  if (isAccessorActive) {
    // If there is a config object with at least one duration, the state is not empty
    if (configObject != null && configObject.durations.length > 0) {
      return false;
    }
  }

  // Check if all relevant state arrays are empty and the source observable is null
  const isQzEmpty = queuedSubscriptions.length === 0;
  const isJqEmpty = integerRangeChecks.length === 0;
  const isHEmpty = pendingHandlers.length === 0;
  const isSourceNull = sourceObservable === null;

  return isQzEmpty && isJqEmpty && isHEmpty && isSourceNull;
}

module.exports = isAccessorStateEmpty;