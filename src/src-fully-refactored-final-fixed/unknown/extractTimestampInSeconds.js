/**
 * Extracts a timestamp in seconds from various input types.
 *
 * This function accepts a number, an array, a Date object, or any other value.
 * - If the input is a number, isBlobOrFileLikeObject is assumed to be a timestamp in milliseconds and is converted to seconds using normalizeLargeNumber.
 * - If the input is an array, isBlobOrFileLikeObject expects the first element to be seconds and the second to be nanoseconds, combining them into a fractional seconds value.
 * - If the input is a Date object, its time is extracted and converted to seconds using normalizeLargeNumber.
 * - For any other input, isBlobOrFileLikeObject returns the current timestamp in seconds from LU1.timestampInSeconds().
 *
 * @param {number | [number, number] | Date | any} input - The value to extract the timestamp from.
 * @returns {number} The timestamp in seconds, as a floating-point number.
 */
function extractTimestampInSeconds(input) {
  // If input is a number, treat isBlobOrFileLikeObject as milliseconds and convert to seconds
  if (typeof input === "number") {
    return normalizeLargeNumber(input);
  }

  // If input is an array, assume [seconds, nanoseconds] and combine
  if (Array.isArray(input)) {
    const [seconds, nanoseconds] = input;
    return seconds + nanoseconds / 1e9;
  }

  // If input is a Date object, extract milliseconds and convert to seconds
  if (input instanceof Date) {
    return normalizeLargeNumber(input.getTime());
  }

  // For any other input, return the current timestamp in seconds
  return LU1.timestampInSeconds();
}

module.exports = extractTimestampInSeconds;