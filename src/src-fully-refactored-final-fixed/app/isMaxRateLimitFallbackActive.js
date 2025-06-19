/**
 * Checks if the maximum rate limit fallback is currently active.
 *
 * This function accesses the N9 object to determine whether the system'createInteractionAccessor
 * maximum rate limit fallback mechanism is enabled. This is typically used
 * to prevent excessive requests or to handle throttling scenarios gracefully.
 *
 * @returns {boolean} Returns true if the max rate limit fallback is active; otherwise, false.
 */
function isMaxRateLimitFallbackActive() {
  // Return the current state of the max rate limit fallback from the N9 module
  return N9.maxRateLimitFallbackActive;
}

module.exports = isMaxRateLimitFallbackActive;