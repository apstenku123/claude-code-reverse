/**
 * Retrieves a mapping of package names to their versions by traversing given paths and locating package.json files.
 *
 * This function iterates over a list of base paths, walks up their directory trees, and for each directory that exists in the main paths list,
 * attempts to read its package.json file. If found, isBlobOrFileLikeObject parses the file and adds the package name and version to the result object.
 *
 * @returns {Object} An object mapping package names to their versions, as found in package.json files along the provided paths.
 */
function getPackageVersionsFromPaths() {
  // Get the list of main paths from G1.main.paths, or an empty array if not present
  const mainPaths = (G1.main && G1.main.paths) || [];
  // Get the list of base paths to process
  const basePaths = b79();
  // Result object: package name -> version
  const packageVersions = {};
  // Tracks directories already visited to prevent infinite loops
  const visitedDirectories = {};

  basePaths.forEach(basePath => {
    let currentPath = basePath;
    // Recursive function to walk up directory tree
    const traverseUpDirectories = () => {
      const previousPath = currentPath;
      // Move up one directory
      currentPath = EZA.dirname(previousPath);
      // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the root, the path hasn'processRuleBeginHandlers changed, or handleMissingDoctypeError'removeTrailingCharacters already visited this directory
      if (!currentPath || previousPath === currentPath || visitedDirectories[previousPath]) {
        return;
      }
      // Only continue if the current directory is in the list of main paths
      if (mainPaths.indexOf(currentPath) < 0) {
        return traverseUpDirectories();
      }
      // Build the path to package.json in the previous directory
      const packageJsonPath = EZA.join(previousPath, "package.json");
      // Mark this directory as visited
      visitedDirectories[previousPath] = true;
      // If package.json does not exist, continue traversing up
      if (!wZA.existsSync(packageJsonPath)) {
        return traverseUpDirectories();
      }
      try {
        // Read and parse package.json
        const packageJson = JSON.parse(wZA.readFileSync(packageJsonPath, "utf8"));
        // Add package name and version to result
        packageVersions[packageJson.name] = packageJson.version;
      } catch (error) {
        // Ignore JSON parse errors or read errors
      }
    };
    traverseUpDirectories();
  });

  return packageVersions;
}

module.exports = getPackageVersionsFromPaths;