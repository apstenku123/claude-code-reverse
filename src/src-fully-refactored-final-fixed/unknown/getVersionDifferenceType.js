/**
 * Determines the type of version difference between two semantic version strings.
 *
 * Compares two versions and returns the type of difference: 'major', 'minor', 'patch', 'prerelease', or 'pre' + type if a prerelease is involved.
 * Returns null if the versions are identical.
 *
 * @param {string} versionA - The first semantic version string to compare.
 * @param {string} versionB - The second semantic version string to compare.
 * @returns {string|null} The type of version difference ('major', 'minor', 'patch', 'prerelease', or 'pre' + type), or null if versions are equal.
 */
function getVersionDifferenceType(versionA, versionB) {
  // Parse both version strings into version objects
  const parsedVersionA = Ws0(versionA, null, true);
  const parsedVersionB = Ws0(versionB, null, true);

  // Compare the two versions
  const comparisonResult = parsedVersionA.compare(parsedVersionB);
  if (comparisonResult === 0) {
    // Versions are identical
    return null;
  }

  // Determine which version is greater
  const isVersionAGreater = comparisonResult > 0;
  const greaterVersion = isVersionAGreater ? parsedVersionA : parsedVersionB;
  const lesserVersion = isVersionAGreater ? parsedVersionB : parsedVersionA;
  const greaterHasPrerelease = !!greaterVersion.prerelease.length;

  // If the lesser version is a prerelease and the greater is not
  if (!!lesserVersion.prerelease.length && !greaterHasPrerelease) {
    // If the lesser version has no patch or minor, isBlobOrFileLikeObject'createInteractionAccessor a major difference
    if (!lesserVersion.patch && !lesserVersion.minor) {
      return "major";
    }
    // If main version numbers are equal
    if (lesserVersion.compareMain(greaterVersion) === 0) {
      // If minor is present but patch is not, isBlobOrFileLikeObject'createInteractionAccessor a minor difference
      if (lesserVersion.minor && !lesserVersion.patch) {
        return "minor";
      }
      // Otherwise, isBlobOrFileLikeObject'createInteractionAccessor a patch difference
      return "patch";
    }
  }

  // If the greater version is a prerelease, prefix the type with 'pre'
  const prereleasePrefix = greaterHasPrerelease ? "pre" : "";

  // Compare major, minor, and patch numbers
  if (parsedVersionA.major !== parsedVersionB.major) {
    return prereleasePrefix + "major";
  }
  if (parsedVersionA.minor !== parsedVersionB.minor) {
    return prereleasePrefix + "minor";
  }
  if (parsedVersionA.patch !== parsedVersionB.patch) {
    return prereleasePrefix + "patch";
  }

  // If only the prerelease differs
  return "prerelease";
}

module.exports = getVersionDifferenceType;