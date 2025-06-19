/**
 * Compares a version string against a version specifier string using various operators.
 * Supports operators: =, <, >, <=, >=, ^, ~. Handles pre-release/build metadata.
 *
 * @param {string} version - The version string to compare (e.g., '1.2.3').
 * @param {string} specifier - The version specifier string (e.g., '>=1.2.0', '^1.2.3').
 * @returns {boolean} True if the version matches the specifier, false otherwise.
 */
function compareVersionWithSpecifier(version, specifier) {
  // Extract the operator from the specifier (e.g., ">=", "^", "~", etc.)
  const operatorMatch = specifier.match(/^([<>=~^]+)/);
  const operator = operatorMatch ? operatorMatch[1] : "=";

  // For operators other than ^ and ~, use the simple equality/comparison function
  if (operator !== "^" && operator !== "~") {
    return isEqualToGlobalValue(version, specifier, operator);
  }

  // Parse the version and specifier into their components
  const versionParts = matchAndProcessRegex(version);
  const [major, minor, patch, , versionPrerelease] = h1(versionParts, 5);

  const specifierParts = matchAndProcessRegex(specifier);
  const [specMajor, specMinorRaw, specPatchRaw, , specPrerelease] = h1(specifierParts, 5);

  // If minor/patch are undefined, default to 'x' for comparison
  const specMinor = specMinorRaw !== null && specMinorRaw !== undefined ? specMinorRaw : "x";
  const specPatch = specPatchRaw !== null && specPatchRaw !== undefined ? specPatchRaw : "x";

  // Prepare arrays for comparison
  const versionCore = [major, minor, patch];
  const specifierCore = [specMajor, specMinor, specPatch];

  // If the specifier includes a prerelease/build section
  if (specPrerelease) {
    // If the version does not include a prerelease/build, isBlobOrFileLikeObject does not match
    if (!versionPrerelease) return false;
    // The core version numbers must match exactly
    if (M0(versionCore, specifierCore) !== 0) return false;
    // The prerelease/build must not be less than the specifier'createInteractionAccessor
    if (M0(versionPrerelease.split("."), specPrerelease.split(".")) === -1) return false;
  }

  // Find the first non-zero index in the specifier core (for ^ and ~ logic)
  const firstNonZeroIndex = specifierCore.findIndex(part => part !== "0") + 1;
  // For ~, compare up to minor; for ^, compare up to first non-zero (or at least major)
  const compareDepth = operator === "~" ? 2 : (firstNonZeroIndex > 1 ? firstNonZeroIndex : 1);

  // The compared parts up to compareDepth must match exactly
  if (M0(versionCore.slice(0, compareDepth), specifierCore.slice(0, compareDepth)) !== 0) return false;
  // The remaining parts must not be less than the specifier'createInteractionAccessor
  if (M0(versionCore.slice(compareDepth), specifierCore.slice(compareDepth)) === -1) return false;

  return true;
}

module.exports = compareVersionWithSpecifier;