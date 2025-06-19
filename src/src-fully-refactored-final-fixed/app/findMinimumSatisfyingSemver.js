/**
 * Finds the minimum semantic version that satisfies the given semver range.
 *
 * @param {lL6} semverRange - The semver range to test against (instance of lL6).
 * @param {any} options - Additional options passed to the lL6 constructor.
 * @returns {wc1|null} The minimum satisfying semantic version (as wc1 instance), or null if none found.
 *
 * The function attempts to find the lowest semantic version that satisfies the provided range.
 * It first checks for '0.0.0' and '0.0.0-0'. If neither satisfies, isBlobOrFileLikeObject iterates through the range sets
 * to find the minimal version according to the range'createInteractionAccessor comparators and operators.
 */
function findMinimumSatisfyingSemver(semverRangeInput, options) {
  // Create a semver range instance
  const semverRange = new lL6(semverRangeInput, options);

  // Try the lowest possible version: 0.0.0
  let minSatisfyingVersion = new wc1("0.0.0");
  if (semverRange.test(minSatisfyingVersion)) {
    return minSatisfyingVersion;
  }

  // Try the next lowest: 0.0.0-0 (prerelease)
  minSatisfyingVersion = new wc1("0.0.0-0");
  if (semverRange.test(minSatisfyingVersion)) {
    return minSatisfyingVersion;
  }

  // If neither worked, search through the range sets
  let lowestVersion = null;
  for (let setIndex = 0; setIndex < semverRange.set.length; ++setIndex) {
    const comparatorSet = semverRange.set[setIndex];
    let candidateVersion = null;

    // For each comparator in the set, determine the minimal version
    comparatorSet.forEach(comparator => {
      const comparatorVersion = new wc1(comparator.semver.version);
      switch (comparator.operator) {
        case ">":
          // For '>', increment patch if not prerelease, otherwise add prerelease
          if (comparatorVersion.prerelease.length === 0) {
            comparatorVersion.patch++;
          } else {
            comparatorVersion.prerelease.push(0);
          }
          comparatorVersion.raw = comparatorVersion.format();
          // fall through
        case "":
        case ">=":
          // For ">", ">=", or "" (no operator), pick the highest minimal version
          if (!candidateVersion || Zr0(comparatorVersion, candidateVersion)) {
            candidateVersion = comparatorVersion;
          }
          break;
        case "<":
        case "<=":
          // Ignore upper bounds for minimum calculation
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`);
      }
    });

    // Update the lowest version found so far
    if (candidateVersion && (!lowestVersion || Zr0(lowestVersion, candidateVersion))) {
      lowestVersion = candidateVersion;
    }
  }

  // Final check: does the found version actually satisfy the range?
  if (lowestVersion && semverRange.test(lowestVersion)) {
    return lowestVersion;
  }

  // No satisfying version found
  return null;
}

module.exports = findMinimumSatisfyingSemver;