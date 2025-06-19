/**
 * @description Calculates the relative path from a source path to a destination path.
 * For example, from '/a/b/c/d' to '/a/b/e/f' would result in '../../e/f'.
 * Note: This function relies on external, unknown helper functions `joinPaths` and `trimEmptyStringsFromArrayEdges`
 * for path normalization and segment processing.
 * @param {string} fromPath - The starting or source path.
 * @param {string} toPath - The ending or destination path.
 * @returns {string} The relative path from the source to the destination.
 */
function calculateRelativePath(fromPath, toPath) {
  // The external functions joinPaths and trimEmptyStringsFromArrayEdges are assumed to be available in the scope.
  // Their exact purpose is unknown, but they appear to normalize the path
  // and its segments. `slice(1)` suggests removing a leading character (e.g., '/').
  const processedFromPath = joinPaths(fromPath).slice(1);
  const processedToPath = joinPaths(toPath).slice(1);

  // Split paths into segments. trimEmptyStringsFromArrayEdges might filter out empty segments (e.g., from trailing slashes).
  const fromPathSegments = trimEmptyStringsFromArrayEdges(processedFromPath.split("/"));
  const toPathSegments = trimEmptyStringsFromArrayEdges(processedToPath.split("/"));

  const shorterPathLength = Math.min(fromPathSegments.length, toPathSegments.length);
  let commonPathEndIndex = shorterPathLength;

  // Find the first index where the path segments differ. This marks the end of the common base path.
  for (let i = 0; i < shorterPathLength; i++) {
    if (fromPathSegments[i] !== toPathSegments[i]) {
      commonPathEndIndex = i;
      break;
    }
  }

  const relativePathSegments = [];

  // For each remaining segment in the 'from' path, add '..' to navigate up to the common ancestor.
  for (let i = commonPathEndIndex; i < fromPathSegments.length; i++) {
    relativePathSegments.push("..");
  }

  // Concatenate the 'up' navigation with the remaining segments from the 'to' path.
  const finalSegments = relativePathSegments.concat(toPathSegments.slice(commonPathEndIndex));

  // Join the segments to form the final relative path string.
  return finalSegments.join("/");
}

module.exports = calculateRelativePath;
