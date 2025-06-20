/**
 * Parses a timestamp string and extracts seconds and nanoseconds components.
 *
 * The input string is expected to match the regular expression `c76`,
 * which should capture the seconds in the first group and optional nanoseconds in the second group.
 *
 * @param {string} timestampString - The timestamp string to parse.
 * @returns {{seconds: number, nanos: number} | null} An object with seconds and nanos properties, or null if the input does not match the expected format.
 */
function parseTimestampString(timestampString) {
  // Attempt to match the input string against the c76 regex pattern
  const matchResult = timestampString.match(c76);
  if (!matchResult) {
    // Return null if the input does not match the expected pattern
    return null;
  }

  // Extract seconds from the first capturing group
  const seconds = Number.parseInt(matchResult[1], 10);

  // Extract nanoseconds from the second capturing group, if present
  // If present, pad to 9 digits (nanosecond precision), otherwise default to 0
  const nanos = matchResult[2]
    ? Number.parseInt(matchResult[2].padEnd(9, "0"), 10)
    : 0;

  return {
    seconds,
    nanos
  };
}

module.exports = parseTimestampString;