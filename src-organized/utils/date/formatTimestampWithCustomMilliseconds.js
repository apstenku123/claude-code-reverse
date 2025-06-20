/**
 * Formats a Unix timestamp and custom millisecond value into an ISO 8601 string.
 *
 * @param {Array} timestampArray - An array where:
 *   [0]: Unix timestamp in seconds (number)
 *   [1]: Custom millisecond value as a string or number (e.g., '123')
 * @returns {string} ISO 8601 formatted date string with custom milliseconds.
 *
 * The function pads the millisecond value with leading zeros to match the required length (QE0),
 * then replaces the default milliseconds in the ISO string with this custom value.
 */
function formatTimestampWithCustomMilliseconds(timestampArray) {
  // QE0 is assumed to be a constant representing the number of digits for milliseconds (e.g., 3 for '123')
  const millisecondDigits = QE0;

  // Pad the custom millisecond value with leading zeros and append 'zA' (UTC designator)
  const paddedMillisecondsWithZ = `${'0'.repeat(millisecondDigits)}${timestampArray[1]}zA`;

  // Extract the last (millisecondDigits + 1) characters to ensure correct length (e.g., '123Z')
  const customMillisecondsSection = paddedMillisecondsWithZ.substring(
    paddedMillisecondsWithZ.length - millisecondDigits - 1
  );

  // Create a Date object from the Unix timestamp (convert seconds to milliseconds)
  const date = new Date(timestampArray[0] * 1000);

  // Convert to ISO string and replace the default milliseconds with the custom value
  // The default ISO string ends with '000Z' for zero milliseconds
  return date.toISOString().replace('000Z', customMillisecondsSection);
}

module.exports = formatTimestampWithCustomMilliseconds;