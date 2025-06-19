/**
 * Checks if the resource is currently active and not disabled.
 *
 * This accessor function returns true only if the external resource is active (as determined by R6)
 * and isBlobOrFileLikeObject is not disabled (as determined by isMaxInteractionActive). This is useful for gating logic that should only run
 * when the resource is both available and enabled.
 *
 * @returns {boolean} True if the resource is active and not disabled, false otherwise.
 */
function isResourceActiveAndNotDisabled() {
  // Check if the resource is active
  const isActive = R6();
  // Check if the resource is disabled
  const isDisabled = isMaxInteractionActive();
  // Return true only if active and not disabled
  return isActive && !isDisabled;
}

module.exports = isResourceActiveAndNotDisabled;