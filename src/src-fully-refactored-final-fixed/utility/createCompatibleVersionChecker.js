/**
 * Creates a function to check if a given version string is compatible with a base version.
 *
 * Compatibility rules:
 * - Only versions matching the same major version are considered.
 * - For major version 0, minor and patch must match or be higher (no prerelease allowed).
 * - For major > 0, minor must match or be higher (no prerelease allowed).
 * - Prerelease versions are only compatible with themselves.
 * - Invalid version strings are always incompatible.
 *
 * @param {string} baseVersion - The base version string to compare against (e.g., '1.2.3').
 * @returns {(candidateVersion: string) => boolean} - a function that checks if a candidate version is compatible.
 */
function createCompatibleVersionChecker(baseVersion) {
  // Cache of known compatible versions
  const compatibleVersions = new Set([baseVersion]);
  // Cache of known incompatible versions
  const incompatibleVersions = new Set();
  // Version regex (assumed to be defined globally)
  const versionMatch = baseVersion.match(HZ0);

  // If baseVersion is invalid, always return false
  if (!versionMatch) {
    return () => false;
  }

  // Parse base version components
  const baseVersionInfo = {
    major: Number(versionMatch[1]),
    minor: Number(versionMatch[2]),
    patch: Number(versionMatch[3]),
    prerelease: versionMatch[4]
  };

  // If base version is a prerelease, only allow exact matches
  if (baseVersionInfo.prerelease != null) {
    return function isExactPrerelease(candidateVersion) {
      return candidateVersion === baseVersion;
    };
  }

  /**
   * Mark a candidate version as incompatible and return false.
   * @param {string} candidateVersion
   * @returns {boolean}
   */
  function markIncompatible(candidateVersion) {
    incompatibleVersions.add(candidateVersion);
    return false;
  }

  /**
   * Mark a candidate version as compatible and return true.
   * @param {string} candidateVersion
   * @returns {boolean}
   */
  function markCompatible(candidateVersion) {
    compatibleVersions.add(candidateVersion);
    return true;
  }

  /**
   * Checks if a candidate version is compatible with the base version.
   * @param {string} candidateVersion
   * @returns {boolean}
   */
  return function isCompatibleVersion(candidateVersion) {
    // Check cache first
    if (compatibleVersions.has(candidateVersion)) return true;
    if (incompatibleVersions.has(candidateVersion)) return false;

    const candidateMatch = candidateVersion.match(HZ0);
    // If candidate is invalid, mark as incompatible
    if (!candidateMatch) return markIncompatible(candidateVersion);

    // Parse candidate version components
    const candidateInfo = {
      major: Number(candidateMatch[1]),
      minor: Number(candidateMatch[2]),
      patch: Number(candidateMatch[3]),
      prerelease: candidateMatch[4]
    };

    // Prerelease versions are only compatible with themselves
    if (candidateInfo.prerelease != null) return markIncompatible(candidateVersion);

    // Major version must match
    if (baseVersionInfo.major !== candidateInfo.major) return markIncompatible(candidateVersion);

    // Special rules for major version 0 (unstable)
    if (baseVersionInfo.major === 0) {
      // Minor must match and patch must be >= base
      if (baseVersionInfo.minor === candidateInfo.minor && baseVersionInfo.patch <= candidateInfo.patch) {
        return markCompatible(candidateVersion);
      }
      return markIncompatible(candidateVersion);
    }

    // For major > 0, minor must be >= base
    if (baseVersionInfo.minor <= candidateInfo.minor) {
      return markCompatible(candidateVersion);
    }
    return markIncompatible(candidateVersion);
  };
}

module.exports = createCompatibleVersionChecker;
