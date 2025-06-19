/**
 * Converts a duration in milliseconds to an object containing seconds and nanoseconds.
 *
 * @param {number} milliseconds - The duration in milliseconds to convert.
 * @returns {{seconds: number, nanos: number}} An object with properties:
 *   - seconds: The whole seconds part of the duration.
 *   - nanos: The nanoseconds remainder (0-999,999,999).
 */
function convertMillisecondsToTimestamp(milliseconds) {
  // Calculate the whole seconds by dividing by 1000 and truncating the decimal part
  const seconds = Math.trunc(milliseconds / 1000);

  // Calculate the remaining milliseconds and convert to nanoseconds
  const nanos = Math.trunc((milliseconds % 1000) * 1e6);

  return {
    seconds,
    nanos
  };
}

module.exports = convertMillisecondsToTimestamp;