/**
 * Converts a time duration from milliseconds to seconds.
 *
 * @param {number} milliseconds - The time duration in milliseconds to be converted.
 * @returns {number} The equivalent time duration in seconds.
 */
function convertMillisecondsToSeconds(milliseconds) {
  // Divide the input milliseconds by 1000 to get seconds
  return milliseconds / 1000;
}

module.exports = convertMillisecondsToSeconds;