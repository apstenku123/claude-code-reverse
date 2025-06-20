/**
 * Returns the elapsed time in milliseconds since the application start time.
 *
 * @returns {number} The number of milliseconds elapsed since N9.startTime.
 */
function getElapsedTimeSinceStart() {
  // Calculate the difference between the current time and the recorded start time
  return Date.now() - N9.startTime;
}

module.exports = getElapsedTimeSinceStart;