/**
 * Compares two path-like arrays and returns a string representing the difference between them.
 * The result is a string where the first segment is the number of differing elements (from the end of the first array),
 * followed by the remaining elements of the second array after the common prefix, joined by '/'.
 *
 * @param {string[]} basePath - The base path array to compare from.
 * @param {string[]} targetPath - The target path array to compare to.
 * @returns {string} a string in the format: '<numDifferences>/<remainingTargetPathElements...>'
 */
function getPathDifferenceSuffix(basePath, targetPath) {
  let commonPrefixLength = 0;
  // Find the length of the common prefix between basePath and targetPath
  while (
    commonPrefixLength < basePath.length &&
    commonPrefixLength < targetPath.length &&
    basePath[commonPrefixLength] === targetPath[commonPrefixLength]
  ) {
    commonPrefixLength++;
  }

  // Calculate the number of differing elements in basePath after the common prefix
  const numDifferences = basePath.length - commonPrefixLength;

  // Get the remaining elements in targetPath after the common prefix
  const remainingTargetPath = targetPath.slice(commonPrefixLength);

  // Combine the number of differences and the remaining target path elements into a string
  return [numDifferences.toString(), ...remainingTargetPath].join("/");
}

module.exports = getPathDifferenceSuffix;
