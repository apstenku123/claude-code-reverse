/**
 * Sets the max rate limit fallback active flag on the N9 object.
 *
 * @param {boolean} isActive - Indicates whether the max rate limit fallback should be active.
 * @returns {void}
 */
function setMaxRateLimitFallbackActive(isActive) {
  // Update the N9 object'createInteractionAccessor maxRateLimitFallbackActive property
  N9.maxRateLimitFallbackActive = isActive;
}

module.exports = setMaxRateLimitFallbackActive;