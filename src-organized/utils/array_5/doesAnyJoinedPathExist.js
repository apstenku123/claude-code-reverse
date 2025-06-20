/**
 * Checks if any joined path from the provided path segments exists in the filesystem.
 *
 * @param {Array<Array<string>>} pathSegmentsList - An array of arrays, where each inner array represents path segments to be joined.
 * @returns {boolean} True if any joined path exists in the filesystem, false otherwise.
 */
function doesAnyJoinedPathExist(pathSegmentsList) {
  // Generate a list of path segment arrays to check
  const pathsToCheck = findPluginDirectoriesForType(pathSegmentsList);

  for (const pathSegments of pathsToCheck) {
    // Join the path segments using the provided join function and separator
    const fullPath = K3.join(pathSegments, xr0);
    // Check if the file or directory exists at the constructed path
    if (f1().existsSync(fullPath)) {
      return true;
    }
  }
  // No existing path found
  return false;
}

module.exports = doesAnyJoinedPathExist;