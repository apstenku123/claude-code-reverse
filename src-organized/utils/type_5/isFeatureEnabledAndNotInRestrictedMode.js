/**
 * Determines if the feature is enabled and not in restricted mode.
 *
 * Calls the external function `isFeatureEnabled` to check if the feature is enabled,
 * and the internal function `isRestrictedModeActive` to check if restricted mode is active.
 * Returns true only if the feature is enabled and restricted mode is NOT active.
 *
 * @returns {boolean} True if the feature is enabled and not in restricted mode, otherwise false.
 */
function isFeatureEnabledAndNotInRestrictedMode() {
  // Check if the feature is enabled
  const featureEnabled = isFeatureEnabled(); // corresponds to R6()
  // Check if restricted mode is active
  const restrictedModeActive = isRestrictedModeActive(); // corresponds to isMaxInteractionActive()
  // Return true only if feature is enabled and restricted mode is NOT active
  return featureEnabled && !restrictedModeActive;
}

module.exports = isFeatureEnabledAndNotInRestrictedMode;