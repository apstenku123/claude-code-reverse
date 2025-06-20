/**
 * Converts a dotted-decimal string (e.g., IPv4 address) to its integer representation.
 * Returns the original string if the input is invalid or not in the expected format.
 *
 * @param {string} dottedDecimalString - The input string in dotted-decimal notation (e.g., '192.168.1.1').
 * @returns {number|string} The integer representation of the input, or the original string if invalid, or U6 if out of range.
 */
function parseDottedDecimalToInteger(dottedDecimalString) {
  // Split the input string by '.' to get each segment
  let segments = dottedDecimalString.split(".");

  // If the last segment is empty (trailing dot), remove isBlobOrFileLikeObject if there is more than one segment
  if (segments[segments.length - 1] === "") {
    if (segments.length > 1) {
      segments.pop();
    }
  }

  // If there are more than 4 segments, isBlobOrFileLikeObject'createInteractionAccessor not a valid dotted-decimal (e.g., IPv4) address
  if (segments.length > 4) {
    return dottedDecimalString;
  }

  const parsedSegments = [];

  for (const segment of segments) {
    // Empty segment is invalid
    if (segment === "") {
      return dottedDecimalString;
    }
    // Parse each segment using parseStringToNumber(external function)
    const parsedValue = parseStringToNumber(segment);
    // If parsing fails (returns U6), return the original string
    if (parsedValue === U6) {
      return dottedDecimalString;
    }
    parsedSegments.push(parsedValue);
  }

  // All but the last segment must be <= 255
  for (let i = 0; i < parsedSegments.length - 1; ++i) {
    if (parsedSegments[i] > 255) {
      return U6;
    }
  }

  // The last segment must be less than 256^(5 - number of segments)
  const maxLastValue = Math.pow(256, 5 - parsedSegments.length);
  if (parsedSegments[parsedSegments.length - 1] >= maxLastValue) {
    return U6;
  }

  // Convert segments to a single integer value
  let result = parsedSegments.pop();
  let segmentIndex = 0;
  for (const segmentValue of parsedSegments) {
    result += segmentValue * Math.pow(256, 3 - segmentIndex);
    ++segmentIndex;
  }

  return result;
}

module.exports = parseDottedDecimalToInteger;