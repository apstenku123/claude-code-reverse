/**
 * Converts a timestamp represented as an array [seconds, nanoseconds] to milliseconds as a floating-point number.
 *
 * @param {number[]} timestampArray - An array where the first element is seconds and the second element is nanoseconds.
 * @returns {number} The timestamp in milliseconds.
 */
function convertTimestampArrayToMilliseconds(timestampArray) {
  // Multiply seconds by 1000 to get milliseconds
  // Divide nanoseconds by 1e6 to convert to milliseconds and add to the result
  return timestampArray[0] * 1000 + timestampArray[1] / 1e6;
}

module.exports = convertTimestampArrayToMilliseconds;