/**
 * Computes the relative path from one path to another.
 * 
 * This function takes two paths, normalizes them using joinPaths,
 * splits them into segments, and determines the relative path
 * from the first path to the second. It returns the relative path
 * as a string, using '../' as needed to traverse up directories.
 * 
 * @param {string} fromPath - The source path to start from.
 * @param {string} toPath - The target path to compute the relative path to.
 * @returns {string} The relative path from fromPath to toPath.
 */
function getRelativePath(fromPath, toPath) {
  // Normalize and remove the leading character from both paths
  const normalizedFromPath = joinPaths(fromPath).slice(1);
  const normalizedToPath = joinPaths(toPath).slice(1);

  // Split the normalized paths into segments and further process with trimEmptyStringsFromArrayEdges
  const fromSegments = trimEmptyStringsFromArrayEdges(normalizedFromPath.split("/"));
  const toSegments = trimEmptyStringsFromArrayEdges(normalizedToPath.split("/"));

  // Find the length of the shortest path
  const minLength = Math.min(fromSegments.length, toSegments.length);

  // Find the index where the paths diverge
  let commonIndex = minLength;
  for (let i = 0; i < minLength; i++) {
    if (fromSegments[i] !== toSegments[i]) {
      commonIndex = i;
      break;
    }
  }

  // For each remaining segment in fromSegments, add '..' to go up a directory
  const relativeSegments = [];
  for (let i = commonIndex; i < fromSegments.length; i++) {
    relativeSegments.push("..");
  }

  // Add the remaining segments from toSegments
  const finalSegments = relativeSegments.concat(toSegments.slice(commonIndex));

  // Join the segments with '/' to form the relative path
  return finalSegments.join("/");
}

module.exports = getRelativePath;