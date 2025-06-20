/**
 * Checks if the provided string is a single dot ('.') or its percent-encoded equivalent ('%2e').
 *
 * This function is useful for identifying path segments that represent the current directory
 * in file paths or URLs, where '.' and '%2e' are considered equivalent.
 *
 * @param {string} segment - The string to check, typically a path segment.
 * @returns {boolean} Returns true if the segment is '.' or '%2e' (case-insensitive), otherwise false.
 */
function isDotOrEncodedDot(segment) {
  // Check for literal dot or percent-encoded dot (case-insensitive)
  return segment === '.' || segment.toLowerCase() === '%2e';
}

module.exports = isDotOrEncodedDot;