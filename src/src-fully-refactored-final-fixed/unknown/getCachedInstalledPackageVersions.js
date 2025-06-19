/**
 * Retrieves and caches the mapping of installed package names to their versions.
 * This function ensures that the expensive operation of traversing directories and reading package.json files
 * is performed only once. Subsequent calls return the cached result.
 *
 * @returns {Object} An object mapping package names to their installed versions.
 */
let cachedPackageVersions = null;

function getCachedInstalledPackageVersions() {
  // If the package versions have not been cached yet, retrieve and cache them
  if (!cachedPackageVersions) {
    cachedPackageVersions = getInstalledPackageVersions();
  }
  // Return the cached mapping of package names to versions
  return cachedPackageVersions;
}

module.exports = getCachedInstalledPackageVersions;