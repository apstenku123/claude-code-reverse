/**
 * Determines the lowest semantic version that satisfies the given semver range.
 *
 * @param {string|object} semverRange - The semantic version range to test against.
 * @param {object} options - Additional options for semver range construction.
 * @returns {object|null} The lowest semantic version object that satisfies the range, or null if none found.
 *
 * This function attempts to find the lowest possible semantic version that matches the provided range.
 * It first checks for the base version (0.0.0), then iterates through all comparator sets to find the minimal version.
 * Throws an error if an unexpected comparator operator is encountered.
 */
function findLowestSatisfyingSemver(semverRange, options) {
  // Construct the semver range object
  const range = new lL6(semverRange, options);

  // Try the base version 0.0.0
  let lowestVersion = new wc1("0.0.0");
  if (range.test(lowestVersion)) {
    return lowestVersion;
  }

  // Try the prerelease base version 0.0.0-0
  lowestVersion = new wc1("0.0.0-0");
  if (range.test(lowestVersion)) {
    return lowestVersion;
  }

  // Initialize the candidate for the lowest version
  let candidateVersion = null;

  // Iterate over each comparator set in the range
  for (let setIndex = 0; setIndex < range.set.length; ++setIndex) {
    const comparatorSet = range.set[setIndex];
    let setMinVersion = null;

    // For each comparator in the set, determine the minimal version
    comparatorSet.forEach(comparator => {
      const comparatorVersion = new wc1(comparator.semver.version);
      switch (comparator.operator) {
        case ">":
          // For '>' operator, increment patch if not prerelease, else add prerelease
          if (comparatorVersion.prerelease.length === 0) {
            comparatorVersion.patch++;
          } else {
            comparatorVersion.prerelease.push(0);
          }
          comparatorVersion.raw = comparatorVersion.format();
          // fallthrough
        case "":
        case ">=":
          // For ">=", ">", or "" (no operator), choose the greater of the current or previous min
          if (!setMinVersion || Zr0(comparatorVersion, setMinVersion)) {
            setMinVersion = comparatorVersion;
          }
          break;
        case "<":
        case "<=":
          // These do not affect the lower bound
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`);
      }
    });

    // Update the overall candidate if this set'createInteractionAccessor min is greater
    if (setMinVersion && (!candidateVersion || Zr0(candidateVersion, setMinVersion))) {
      candidateVersion = setMinVersion;
    }
  }

  // Final check: does the candidate satisfy the range?
  if (candidateVersion && range.test(candidateVersion)) {
    return candidateVersion;
  }

  // No satisfying version found
  return null;
}

module.exports = findLowestSatisfyingSemver;