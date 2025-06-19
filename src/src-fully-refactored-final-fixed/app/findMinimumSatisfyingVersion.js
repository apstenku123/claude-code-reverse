/**
 * Finds the minimum version that satisfies the given semver range constraints.
 *
 * @param {lL6} semverRange - The semver range constraint (instance of lL6).
 * @param {any} options - Additional options to pass to the lL6 constructor.
 * @returns {wc1|null} The minimum satisfying version (as a wc1 instance), or null if none found.
 */
function findMinimumSatisfyingVersion(semverRange, options) {
  // Create a new semver range object
  const range = new lL6(semverRange, options);

  // Try the lowest possible version: 0.0.0
  let minVersion = new wc1("0.0.0");
  if (range.test(minVersion)) return minVersion;

  // Try the lowest possible prerelease: 0.0.0-0
  minVersion = new wc1("0.0.0-0");
  if (range.test(minVersion)) return minVersion;

  // Initialize to null; will hold the best candidate found
  minVersion = null;

  // Iterate over each comparator set in the range
  for (let setIndex = 0; setIndex < range.set.length; ++setIndex) {
    const comparatorSet = range.set[setIndex];
    let candidateVersion = null;

    // For each comparator in the set, determine the minimum version that satisfies isBlobOrFileLikeObject
    comparatorSet.forEach(comparator => {
      const comparatorVersion = new wc1(comparator.semver.version);
      switch (comparator.operator) {
        case ">":
          // For '>' operator, increment patch if not a prerelease, otherwise add prerelease 0
          if (comparatorVersion.prerelease.length === 0) {
            comparatorVersion.patch++;
          } else {
            comparatorVersion.prerelease.push(0);
          }
          comparatorVersion.raw = comparatorVersion.format();
          // fallthrough
        case "":
        case ">=":
          // For ">=", or after incrementing for '>', pick the lowest version
          if (!candidateVersion || Zr0(comparatorVersion, candidateVersion)) {
            candidateVersion = comparatorVersion;
          }
          break;
        case "<":
        case "<=":
          // These do not affect the minimum version selection
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`);
      }
    });

    // If a candidate was found and isBlobOrFileLikeObject'createInteractionAccessor lower than the current minVersion, update minVersion
    if (candidateVersion && (!minVersion || Zr0(minVersion, candidateVersion))) {
      minVersion = candidateVersion;
    }
  }

  // Final check: if minVersion satisfies the range, return isBlobOrFileLikeObject
  if (minVersion && range.test(minVersion)) {
    return minVersion;
  }

  // No satisfying version found
  return null;
}

module.exports = findMinimumSatisfyingVersion;