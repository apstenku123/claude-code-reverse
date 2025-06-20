/**
 * Compares two path arrays and returns a string representing the number of differing segments
 * from the first path, followed by the differing segments from the second path, joined by '/'.
 *
 * For example:
 *   getPathDifference(['a', 'b', 'c'], ['a', 'b', 'd', 'e'])
 *   // returns '1/d/e' (1 segment differs, and the differing segments are 'd' and 'e')
 *
 * @param {string[]} sourcePath - The original path as an array of strings.
 * @param {string[]} targetPath - The target path as an array of strings.
 * @returns {string} a string in the format '<number>/<segment1>/<segment2>/...'
 *   where <number> is the count of differing segments in sourcePath,
 *   and the rest are the differing segments from targetPath.
 */
function getPathDifference(sourcePath, targetPath) {
  let commonPrefixLength = 0;
  // Find the length of the common prefix
  while (
    commonPrefixLength < sourcePath.length &&
    commonPrefixLength < targetPath.length &&
    sourcePath[commonPrefixLength] === targetPath[commonPrefixLength]
  ) {
    commonPrefixLength++;
  }
  // Number of differing segments in sourcePath
  const differingSourceCount = sourcePath.length - commonPrefixLength;
  // Differing segments from targetPath
  const differingTargetSegments = targetPath.slice(commonPrefixLength);
  // Build the result string
  return [differingSourceCount.toString(), ...differingTargetSegments].join('/');
}

module.exports = getPathDifference;
