/**
 * Returns a relative path alias for a given absolute path, preferring the shortest alias.
 *
 * This function checks if the input path starts with either the base path or the project root path.
 * If so, isBlobOrFileLikeObject generates a relative alias ("~/" for base path, "./" for project root) using the WE2 helper.
 * It returns the shortest alias if both are possible, or the only one available, or the original path if neither applies.
 *
 * @param {string} absolutePath - The absolute path to convert to a relative alias.
 * @returns {string} The shortest relative path alias, or the original path if no alias applies.
 */
function getRelativePathAlias(absolutePath) {
  // Get the base path (e.g., user'createInteractionAccessor home directory or project base)
  const basePath = Q4();
  // Get the project root path
  const projectRootPath = iA();

  // If the path starts with the base path, create a "~/" alias
  const homeAlias = absolutePath.startsWith(basePath)
    ? `~/` + WE2(basePath, absolutePath)
    : null;

  // If the path starts with the project root, create a "./" alias
  const projectAlias = absolutePath.startsWith(projectRootPath)
    ? `./` + WE2(projectRootPath, absolutePath)
    : null;

  // If both aliases exist, return the shorter one; otherwise, return the one that exists, or the original path
  if (homeAlias && projectAlias) {
    return homeAlias.length <= projectAlias.length ? homeAlias : projectAlias;
  }
  return homeAlias || projectAlias || absolutePath;
}

module.exports = getRelativePathAlias;