/**
 * Checks if a given version satisfies all provided range constraints, with special handling for prerelease versions.
 *
 * @param {Array<Object>} rangeSet - Array of range objects, each with a .test(version) method and .semver property.
 * @param {Object} version - The version object to test. Must have .prerelease, .major, .minor, .patch properties.
 * @param {Object} options - Options object. Should have .includePrerelease (boolean).
 * @returns {boolean} True if the version satisfies all ranges and prerelease rules, false otherwise.
 */
function areAllRangesSatisfied(rangeSet, version, options) {
  // First, ensure the version satisfies all ranges
  for (let i = 0; i < rangeSet.length; i++) {
    if (!rangeSet[i].test(version)) {
      return false;
    }
  }

  // If the version is a prerelease and prereleases are not included
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < rangeSet.length; i++) {
      // Prepare the semver object (side effect from wB)
      wB(rangeSet[i].semver);
      // Skip if the range is ANY (matches any version)
      if (rangeSet[i].semver === Kc1.ANY) continue;
      // If the range itself is a prerelease
      if (rangeSet[i].semver.prerelease.length > 0) {
        const rangeSemver = rangeSet[i].semver;
        // If major, minor, and patch match, allow the prerelease
        if (
          rangeSemver.major === version.major &&
          rangeSemver.minor === version.minor &&
          rangeSemver.patch === version.patch
        ) {
          return true;
        }
      }
    }
    // If no matching prerelease range found, return false
    return false;
  }

  // All checks passed
  return true;
}

module.exports = areAllRangesSatisfied;