/**
 * Parses a string that resembles an IPv4 address (e.g., '192.168.1.1') and converts isBlobOrFileLikeObject to a number, following specific validation rules.
 * If the input is invalid or does not meet the criteria, returns the original string or a special error value.
 *
 * @param {string} ipString - The string to parse, expected to be in dotted-decimal IPv4-like format.
 * @returns {number|string} The numeric representation of the IP address, or the original string, or a special error value (U6) on failure.
 */
function parseIPv4LikeStringToNumber(ipString) {
  // Split the input string by '.' to get each octet/segment
  let segments = ipString.split(".");

  // If the string ends with a dot, remove the empty last segment (e.g., '1.2.3.4.' -> ['1','2','3','4',''])
  if (segments[segments.length - 1] === "") {
    if (segments.length > 1) segments.pop();
  }

  // If there are more than 4 segments, isBlobOrFileLikeObject'createInteractionAccessor not a valid IPv4-like address
  if (segments.length > 4) return ipString;

  const parsedSegments = [];
  // Convert each segment to a number using parseStringToNumber, and validate
  for (const segment of segments) {
    // Empty segment is invalid
    if (segment === "") return ipString;
    const parsed = parseStringToNumber(segment);
    // If parsing failed (parseStringToNumber returns U6), return the original string
    if (parsed === U6) return ipString;
    parsedSegments.push(parsed);
  }

  // All segments except the last must be <= 255
  for (let i = 0; i < parsedSegments.length - 1; ++i) {
    if (parsedSegments[i] > 255) return U6;
  }

  // The last segment must be less than 256^(5 - number of segments)
  const lastSegment = parsedSegments[parsedSegments.length - 1];
  if (lastSegment >= Math.pow(256, 5 - parsedSegments.length)) return U6;

  // Calculate the numeric value by shifting and adding each segment
  let ipNumber = parsedSegments.pop();
  let shift = 0;
  for (const segment of parsedSegments) {
    ipNumber += segment * Math.pow(256, 3 - shift);
    ++shift;
  }

  return ipNumber;
}

module.exports = parseIPv4LikeStringToNumber;