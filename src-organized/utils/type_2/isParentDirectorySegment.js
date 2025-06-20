/**
 * Checks if a given path segment represents a parent directory reference ("..") in various encoded forms.
 *
 * Recognizes both literal ".." and its percent-encoded variants ("%2e.", ".%2e", "%2e%2e") as parent directory references.
 *
 * @param {string} segment - The path segment to check.
 * @returns {boolean} True if the segment is a parent directory reference, otherwise false.
 */
function isParentDirectorySegment(segment) {
  // Normalize the segment to lowercase for case-insensitive comparison
  const normalizedSegment = segment.toLowerCase();
  // Check for all known representations of parent directory
  return (
    normalizedSegment === ".." ||
    normalizedSegment === "%2e." ||
    normalizedSegment === ".%2e" ||
    normalizedSegment === "%2e%2e"
  );
}

module.exports = isParentDirectorySegment;
