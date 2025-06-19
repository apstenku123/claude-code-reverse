/**
 * Retrieves a mapping of package names to their versions by traversing given paths and locating package.json files.
 *
 * This function iterates through a list of base paths, recursively traverses up the directory tree,
 * and collects the name and version of each package.json found, provided the directory is within the allowed search paths.
 *
 * @returns {Object} An object mapping package names to their versions, as found in package.json files.
 */
function getDependencyVersionsFromPaths() {
  // Retrieve the list of allowed search paths from G1.main.paths, or use an empty array if not available
  const allowedSearchPaths = (G1.main && G1.main.paths) || [];
  // Get the list of initial directories to search from b79()
  const initialDirectories = b79();
  // Object to store the mapping of package names to their versions
  const packageVersions = {};
  // Object to keep track of directories that have already been processed
  const processedDirectories = {};

  initialDirectories.forEach(startDir => {
    let currentDir = startDir;
    /**
     * Recursively traverses up the directory tree from currentDir,
     * looking for package.json files in allowed search paths.
     */
    const traverseUpwards = () => {
      const previousDir = currentDir;
      // Move up one directory level
      currentDir = EZA.dirname(previousDir);
      // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the root, the directory hasn'processRuleBeginHandlers changed, or handleMissingDoctypeError'removeTrailingCharacters already processed this directory
      if (!currentDir || previousDir === currentDir || processedDirectories[previousDir]) {
        return;
      }
      // Only continue if the current directory is within the allowed search paths
      if (allowedSearchPaths.indexOf(currentDir) < 0) {
        return traverseUpwards();
      }
      // Construct the path to package.json in the current directory
      const packageJsonPath = EZA.join(previousDir, "package.json");
      // Mark this directory as processed
      processedDirectories[previousDir] = true;
      // If package.json does not exist, continue traversing upwards
      if (!wZA.existsSync(packageJsonPath)) {
        return traverseUpwards();
      }
      try {
        // Read and parse the package.json file
        const packageJson = JSON.parse(wZA.readFileSync(packageJsonPath, "utf8"));
        // Store the package name and version
        packageVersions[packageJson.name] = packageJson.version;
      } catch (error) {
        // Ignore errors and continue
      }
    };
    traverseUpwards();
  });

  return packageVersions;
}

module.exports = getDependencyVersionsFromPaths;