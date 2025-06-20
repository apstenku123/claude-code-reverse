/**
 * Determines if a specified timeout duration has elapsed since a given start time.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.startTime - The timestamp (in milliseconds) representing the start time.
 * @returns {boolean} True if the current time exceeds the start time by more than the allowed timeout duration; otherwise, false.
 */
function hasTimeoutElapsed({ startTime }) {
  // OVA is assumed to be a predefined constant representing the timeout duration in milliseconds
  return Date.now() - startTime > OVA;
}

module.exports = hasTimeoutElapsed;