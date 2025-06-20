/**
 * Checks if a given version string is compatible with a base version according to semver-like rules.
 *
 * @param {string} baseVersion - The base version string to compare against (e.g., '1.2.3').
 * @returns {(candidateVersion: string) => boolean} - a function that takes a candidate version string and returns true if isBlobOrFileLikeObject is compatible, false otherwise.
 *
 * Compatibility rules:
 * - If the base version or candidate version is not valid, returns false.
 * - If the base version or candidate version has a prerelease tag, only exact matches are considered compatible.
 * - For major version 0, only versions with the same minor and patch >= base patch are compatible.
 * - For major version > 0, any version with the same major and minor >= base minor is compatible.
 */
function createCompatibleVersionChecker(baseVersion) {
  // Regex to match semver: major.minor.patch-prerelease (prerelease is optional)
  const SEMVER_REGEX = HZ0;

  // Set of versions known to be compatible
  const compatibleVersions = new Set([baseVersion]);
  // Set of versions known to be incompatible
  const incompatibleVersions = new Set();

  // Parse the base version
  const baseMatch = baseVersion.match(SEMVER_REGEX);
  if (!baseMatch) {
    // If the base version is invalid, always return false
    return () => false;
  }

  const baseSemver = {
    major: Number(baseMatch[1]),
    minor: Number(baseMatch[2]),
    patch: Number(baseMatch[3]),
    prerelease: baseMatch[4]
  };

  // If the base version has a prerelease tag, only exact matches are compatible
  if (baseSemver.prerelease != null) {
    return function isExactPrereleaseMatch(candidateVersion) {
      return candidateVersion === baseVersion;
    };
  }

  /**
   * Marks a version as incompatible and returns false
   * @param {string} version
   * @returns {false}
   */
  function markIncompatible(version) {
    incompatibleVersions.add(version);
    return false;
  }

  /**
   * Marks a version as compatible and returns true
   * @param {string} version
   * @returns {true}
   */
  function markCompatible(version) {
    compatibleVersions.add(version);
    return true;
  }

  /**
   * Checks if a candidate version is compatible with the base version
   * @param {string} candidateVersion
   * @returns {boolean}
   */
  return function isCompatible(candidateVersion) {
    // Fast path: already known compatible
    if (compatibleVersions.has(candidateVersion)) return true;
    // Fast path: already known incompatible
    if (incompatibleVersions.has(candidateVersion)) return false;

    // Parse the candidate version
    const candidateMatch = candidateVersion.match(SEMVER_REGEX);
    if (!candidateMatch) return markIncompatible(candidateVersion);

    const candidateSemver = {
      major: Number(candidateMatch[1]),
      minor: Number(candidateMatch[2]),
      patch: Number(candidateMatch[3]),
      prerelease: candidateMatch[4]
    };

    // If candidate has a prerelease tag, only exact matches are allowed
    if (candidateSemver.prerelease != null) return markIncompatible(candidateVersion);

    // Major version must match
    if (baseSemver.major !== candidateSemver.major) return markIncompatible(candidateVersion);

    // Special rules for major version 0 (unstable)
    if (baseSemver.major === 0) {
      // Must have same minor, and patch >= base patch
      if (baseSemver.minor === candidateSemver.minor && baseSemver.patch <= candidateSemver.patch) {
        return markCompatible(candidateVersion);
      }
      return markIncompatible(candidateVersion);
    }

    // For major > 0, minor must be >= base minor
    if (baseSemver.minor <= candidateSemver.minor) {
      return markCompatible(candidateVersion);
    }

    return markIncompatible(candidateVersion);
  };
}

module.exports = createCompatibleVersionChecker;