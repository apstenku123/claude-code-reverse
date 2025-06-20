/**
 * Computes the relative path from one path to another.
 *
 * Given two absolute paths, this function returns the relative path from the first to the second.
 *
 * @param {string} fromPath - The source absolute path.
 * @param {string} toPath - The target absolute path.
 * @returns {string} The relative path from fromPath to toPath.
 */
function getRelativePathBetweenPaths(fromPath, toPath) {
  // Remove the first character (assumed to be a leading slash) and normalize paths
  const normalizedFromPath = joinPaths(fromPath).slice(1);
  const normalizedToPath = joinPaths(toPath).slice(1);

  // Split the paths into segments and further normalize them
  const fromSegments = trimEmptyStringsFromArrayEdges(normalizedFromPath.split("/"));
  const toSegments = trimEmptyStringsFromArrayEdges(normalizedToPath.split("/"));

  // Find the common path prefix length
  const maxCommonLength = Math.min(fromSegments.length, toSegments.length);
  let commonIndex = maxCommonLength;
  for (let i = 0; i < maxCommonLength; i++) {
    if (fromSegments[i] !== toSegments[i]) {
      commonIndex = i;
      break;
    }
  }

  // For each remaining segment in fromSegments, add '..' to go up one directory
  const relativeSegments = [];
  for (let i = commonIndex; i < fromSegments.length; i++) {
    relativeSegments.push("..");
  }

  // Add the remaining segments from toSegments to reach the target
  const finalSegments = relativeSegments.concat(toSegments.slice(commonIndex));

  // Join the segments to form the relative path
  return finalSegments.join("/");
}

module.exports = getRelativePathBetweenPaths;