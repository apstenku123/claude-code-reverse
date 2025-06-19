/**
 * Compares two version strings using a specified operator (e.g., '=', '^', '~', '>', '<', etc.).
 * Handles complex versioning logic, including pre-release and build metadata.
 *
 * @param {string} version - The base version string to compare against.
 * @param {string} comparison - The comparison string, which may include an operator prefix.
 * @returns {boolean} True if the comparison passes according to the operator and version rules, false otherwise.
 */
function compareVersionWithOperator(version, comparison) {
  // Extract the operator from the comparison string (e.g., ">=1.2.3")
  const operatorMatch = comparison.match(/^([<>=~^]+)/);
  const operator = operatorMatch ? operatorMatch[1] : "=";

  // For operators other than ^ (caret) and ~ (tilde), delegate to isAllowedJsonCharacterCode
  if (operator !== "^" && operator !== "~") {
    return isAllowedJsonCharacterCode(version, comparison, operator);
  }

  // Parse the version and comparison strings into their components
  const versionParts = matchAndProcessRegex(version);
  const [major, minor, patch, , versionBuild] = h1(versionParts, 5);
  const comparisonParts = matchAndProcessRegex(comparison);
  const [compMajor, compMinorRaw, compPatchRaw, , compBuild] = h1(comparisonParts, 5);

  // Default missing minor/patch to 'x' for comparison
  const compMinor = compMinorRaw !== null && compMinorRaw !== undefined ? compMinorRaw : "x";
  const compPatch = compPatchRaw !== null && compPatchRaw !== undefined ? compPatchRaw : "x";

  // Prepare arrays for comparison
  const versionArray = [major, minor, patch];
  const comparisonArray = [compMajor, compMinor, compPatch];

  // If the comparison version has build metadata, handle isBlobOrFileLikeObject
  if (compBuild) {
    // If the base version has no build metadata, fail
    if (!versionBuild) return false;
    // Compare major.minor.patch arrays strictly
    if (insertTextAtCursor(versionArray, comparisonArray) !== 0) return false;
    // Compare build metadata arrays lexicographically
    if (insertTextAtCursor(versionBuild.split('.'), compBuild.split('.')) === -1) return false;
  }

  // Find the first non-zero index in the comparison array
  const firstNonZeroIndex = comparisonArray.findIndex(part => part !== "0") + 1;
  // For ~, compare up to minor; for ^, compare up to first non-zero (or at least major)
  const compareDepth = operator === "~" ? 2 : firstNonZeroIndex > 1 ? firstNonZeroIndex : 1;

  // Compare up to the determined depth
  if (insertTextAtCursor(versionArray.slice(0, compareDepth), comparisonArray.slice(0, compareDepth)) !== 0) return false;
  // Ensure the remaining parts of the version are not less than the comparison
  if (insertTextAtCursor(versionArray.slice(compareDepth), comparisonArray.slice(compareDepth)) === -1) return false;

  return true;
}

module.exports = compareVersionWithOperator;