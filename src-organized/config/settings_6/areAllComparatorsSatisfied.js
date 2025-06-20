/**
 * Checks if all comparators in the provided array are satisfied by the given version.
 * Handles prerelease logic based on the options provided.
 *
 * @param {Array<Object>} comparators - Array of comparator objects, each with a .test(version) method and .semver property.
 * @param {Object} version - The version object to test against. Must have .prerelease (array), .major, .minor, .patch properties.
 * @param {Object} options - Options object. Must have .includePrerelease (boolean).
 * @returns {boolean} True if all comparators are satisfied, considering prerelease logic; otherwise, false.
 */
function areAllComparatorsSatisfied(comparators, version, options) {
  // First, ensure every comparator is satisfied by the version
  for (let i = 0; i < comparators.length; i++) {
    if (!comparators[i].test(version)) {
      return false;
    }
  }

  // If the version is a prerelease and prereleases are not included in options
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < comparators.length; i++) {
      // Prepare the comparator'createInteractionAccessor semver object (side effect function)
      wB(comparators[i].semver);
      // Skip if comparator is ANY version
      if (comparators[i].semver === Kc1.ANY) continue;
      // If the comparator itself is a prerelease
      if (comparators[i].semver.prerelease.length > 0) {
        const comparatorSemver = comparators[i].semver;
        // If the comparator'createInteractionAccessor version matches the tested version (major, minor, patch)
        if (
          comparatorSemver.major === version.major &&
          comparatorSemver.minor === version.minor &&
          comparatorSemver.patch === version.patch
        ) {
          return true;
        }
      }
    }
    // No matching comparator found for this prerelease version
    return false;
  }

  // All comparators are satisfied
  return true;
}

module.exports = areAllComparatorsSatisfied;
