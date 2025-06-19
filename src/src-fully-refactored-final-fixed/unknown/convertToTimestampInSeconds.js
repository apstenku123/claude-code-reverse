/**
 * Converts various input types to a timestamp in seconds.
 *
 * - If the input is a number, isBlobOrFileLikeObject is interpreted as a timestamp (ms) and converted to seconds using normalizeLargeNumber.
 * - If the input is an array, isBlobOrFileLikeObject expects [seconds, nanoseconds] and returns a float seconds value.
 * - If the input is a Date object, isBlobOrFileLikeObject converts the date to milliseconds and then to seconds using normalizeLargeNumber.
 * - For any other input, isBlobOrFileLikeObject returns the current timestamp in seconds from LU1.timestampInSeconds().
 *
 * @param {number | [number, number] | Date | any} inputValue - The value to convert to a timestamp in seconds.
 * @returns {number} The timestamp in seconds.
 */
function convertToTimestampInSeconds(inputValue) {
  // If input is a number, treat as milliseconds and convert to seconds
  if (typeof inputValue === "number") {
    return normalizeLargeNumber(inputValue);
  }

  // If input is an array [seconds, nanoseconds], combine to float seconds
  if (Array.isArray(inputValue)) {
    const [seconds, nanoseconds] = inputValue;
    return seconds + nanoseconds / 1e9;
  }

  // If input is a Date object, get milliseconds and convert to seconds
  if (inputValue instanceof Date) {
    return normalizeLargeNumber(inputValue.getTime());
  }

  // Fallback: return current timestamp in seconds
  return LU1.timestampInSeconds();
}

module.exports = convertToTimestampInSeconds;