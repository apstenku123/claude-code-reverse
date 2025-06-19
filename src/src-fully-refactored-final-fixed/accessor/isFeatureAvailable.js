/**
 * Checks if a specific feature is available by evaluating the current feature lock state.
 * If the feature is locked, returns false. Otherwise, delegates to checkFeatureAvailability().
 *
 * @returns {boolean} Returns false if the feature is locked, otherwise the result of checkFeatureAvailability().
 */
function isFeatureAvailable() {
  // If the feature is currently locked, immediately return false
  if (isFeatureLocked) return false;
  // Otherwise, check if the feature is available using the external function
  return checkFeatureAvailability();
}

module.exports = isFeatureAvailable;