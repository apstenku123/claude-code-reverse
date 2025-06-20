/**
 * Checks if the provided path segment is a dot-dot segment ("..") or its percent-encoded equivalents.
 *
 * Dot-dot segments are used in path traversal (e.g., navigating up a directory).
 * This function normalizes the input to lowercase and checks for both literal and percent-encoded forms.
 *
 * @param {string} segment - The path segment to check.
 * @returns {boolean} True if the segment is a dot-dot segment or its percent-encoded equivalents, false otherwise.
 */
function isDotDotSegment(segment) {
  // Normalize the segment to lowercase for case-insensitive comparison
  const normalizedSegment = segment.toLowerCase();

  // Check for literal and percent-encoded dot-dot segments
  return (
    normalizedSegment === ".." ||
    normalizedSegment === "%2e." ||
    normalizedSegment === ".%2e" ||
    normalizedSegment === "%2e%2e"
  );
}

module.exports = isDotDotSegment;