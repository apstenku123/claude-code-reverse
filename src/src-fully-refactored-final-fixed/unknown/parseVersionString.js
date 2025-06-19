/**
 * Parses a version string and returns an object with major, minor, and patch numbers.
 *
 * Handles two formats:
 *   1. Numeric string of 3 or 4 digits (e.g., '123', '1234')
 *      - Interpreted as: major = 0, minor = first 1-2 digits, patch = last 2 digits
 *   2. Dot-separated version string (e.g., '1.2.3')
 *      - Interpreted as: major = first segment, minor = second, patch = third
 *
 * @param {string} versionString - The version string to parse.
 * @returns {{ major: number, minor: number, patch: number }} An object containing major, minor, and patch numbers.
 */
function parseVersionString(versionString) {
  // Check if the version string is a 3 or 4 digit number (e.g., '123', '1234')
  const numericVersionPattern = /^\d{3,4}$/;
  if (numericVersionPattern.test(versionString)) {
    // Extract minor and patch from the numeric string
    // For '1234': minor = 12, patch = 34; for '123': minor = 1, patch = 23
    const match = /(\d{1,2})(\d{2})/.exec(versionString);
    return {
      major: 0,
      minor: parseInt(match[1], 10),
      patch: parseInt(match[2], 10)
    };
  }

  // Otherwise, split by '.' and parse each segment
  const versionSegments = (versionString || "").split(".").map(segment => parseInt(segment, 10));
  return {
    major: versionSegments[0],
    minor: versionSegments[1],
    patch: versionSegments[2]
  };
}

module.exports = parseVersionString;