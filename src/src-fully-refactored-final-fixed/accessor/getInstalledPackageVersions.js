/**
 * Retrieves a mapping of package names to their versions by traversing up from a list of entry paths,
 * searching for package.json files within specified root paths.
 *
 * @returns {Object} An object where keys are package names and values are their versions.
 */
function getInstalledPackageVersions() {
  // Get the list of root paths to search for package.json files
  const rootPaths = (G1.main && G1.main.paths) || [];
  // Get the list of entry paths to start traversal from
  const entryPaths = b79();
  // Stores the mapping of package names to versions
  const packageVersions = {};
  // Keeps track of directories already processed to avoid redundant work
  const visitedDirectories = {};

  entryPaths.forEach(entryPath => {
    let currentDir = entryPath;
    /**
     * Recursively traverses up the directory tree from currentDir,
     * looking for package.json files within rootPaths.
     */
    const traverseUpDirectories = () => {
      const previousDir = currentDir;
      // Move up one directory
      currentDir = EZA.dirname(previousDir);
      // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the root, the directory hasn'processRuleBeginHandlers changed, or handleMissingDoctypeError'removeTrailingCharacters already visited this directory
      if (!currentDir || previousDir === currentDir || visitedDirectories[previousDir]) {
        return;
      }
      // Only continue if the current directory is within one of the rootPaths
      if (rootPaths.indexOf(currentDir) < 0) {
        return traverseUpDirectories();
      }
      // Build the path to package.json
      const packageJsonPath = EZA.join(previousDir, "package.json");
      // Mark this directory as visited
      visitedDirectories[previousDir] = true;
      // If package.json does not exist, continue traversing up
      if (!wZA.existsSync(packageJsonPath)) {
        return traverseUpDirectories();
      }
      // Try to read and parse package.json
      try {
        const packageJson = JSON.parse(wZA.readFileSync(packageJsonPath, "utf8"));
        packageVersions[packageJson.name] = packageJson.version;
      } catch (error) {
        // Ignore JSON parse errors and continue
      }
    };
    traverseUpDirectories();
  });

  return packageVersions;
}

module.exports = getInstalledPackageVersions;
