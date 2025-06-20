/**
 * Determines if a specified amount of time has elapsed since the given start time.
 *
 * @param {Object} params - The function parameters.
 * @param {number} params.startTime - The timestamp (in milliseconds) representing the start time.
 * @returns {boolean} Returns true if the elapsed time since startTime exceeds the OVA threshold; otherwise, false.
 */
function hasTimeElapsedSinceStart({ startTime }) {
  // Calculate the elapsed time since the provided start time
  const elapsedTime = Date.now() - startTime;
  // Return true if the elapsed time exceeds the OVA threshold
  return elapsedTime > OVA;
}

module.exports = hasTimeElapsedSinceStart;