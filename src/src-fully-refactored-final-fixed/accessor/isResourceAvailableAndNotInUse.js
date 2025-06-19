/**
 * Checks if the resource is available and not currently in use.
 *
 * This accessor function returns true only if the external resource is available (as determined by R6)
 * and isBlobOrFileLikeObject is not currently in use (as determined by isMaxInteractionActive).
 *
 * @returns {boolean} True if the resource is available and not in use, false otherwise.
 */
function isResourceAvailableAndNotInUse() {
  // Check if the resource is available
  const isAvailable = R6();
  // Check if the resource is currently in use
  const isInUse = isMaxInteractionActive();

  // Return true only if available and not in use
  return isAvailable && !isInUse;
}

module.exports = isResourceAvailableAndNotInUse;