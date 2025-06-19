/**
 * Returns a timestamp in seconds based on the input type.
 *
 * - If the input is a number, isBlobOrFileLikeObject is processed as a timestamp in milliseconds and converted to seconds.
 * - If the input is an array, isBlobOrFileLikeObject expects [seconds, nanoseconds] and returns the combined value in seconds.
 * - If the input is a Date object, isBlobOrFileLikeObject converts the date to milliseconds and then to seconds.
 * - If none of the above, isBlobOrFileLikeObject returns the current timestamp in seconds.
 *
 * @param {number | [number, number] | Date | any} sourceValue - The value to convert to a timestamp in seconds. Can be a number (milliseconds), an array [seconds, nanoseconds], a Date object, or any other type.
 * @returns {number} The timestamp in seconds.
 */
function getTimestampInSeconds(sourceValue) {
  // If input is a number, treat as milliseconds and convert to seconds
  if (typeof sourceValue === "number") {
    return normalizeLargeNumber(sourceValue);
  }

  // If input is an array [seconds, nanoseconds], combine to seconds
  if (Array.isArray(sourceValue)) {
    const [seconds, nanoseconds] = sourceValue;
    return seconds + nanoseconds / 1e9;
  }

  // If input is a Date object, get milliseconds and convert to seconds
  if (sourceValue instanceof Date) {
    return normalizeLargeNumber(sourceValue.getTime());
  }

  // Fallback: get the current timestamp in seconds
  return LU1.timestampInSeconds();
}

module.exports = getTimestampInSeconds;