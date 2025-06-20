/**
 * Compares two version strings or data objects based on a comparison operator.
 * Handles special cases for caret (^) and tilde (~) operators, as well as standard comparison operators.
 *
 * @param {string} currentVersion - The current version string to compare (e.g., '1.2.3').
 * @param {string} versionRequirement - The version requirement string, possibly with an operator (e.g., '>=1.2.0', '^1.2.0').
 * @returns {boolean} True if the current version satisfies the requirement, false otherwise.
 */
function compareVersionData(currentVersion, versionRequirement) {
  // Extract the comparison operator from the version requirement (e.g., ">=", "^", "~", etc.)
  const operatorMatch = versionRequirement.match(/^([<>=~^]+)/);
  const operator = operatorMatch ? operatorMatch[1] : "=";

  // For standard operators (not caret or tilde), delegate to a simple comparison function
  if (operator !== "^" && operator !== "~") {
    return d0(currentVersion, versionRequirement, operator);
  }

  // Parse the current version and requirement version into their components
  const currentVersionParts = matchAndProcessRegex(currentVersion);
  const [currentMajor, currentMinor, currentPatch, , currentPreRelease] = h1(currentVersionParts, 5);

  const requirementVersionParts = matchAndProcessRegex(versionRequirement);
  const [requiredMajor, requiredMinorRaw, requiredPatchRaw, , requiredPreRelease] = h1(requirementVersionParts, 5);

  // Normalize minor and patch versions to 'x' if they are null or undefined
  const requiredMinor = requiredMinorRaw !== null && requiredMinorRaw !== undefined ? requiredMinorRaw : "x";
  const requiredPatch = requiredPatchRaw !== null && requiredPatchRaw !== undefined ? requiredPatchRaw : "x";

  // Prepare arrays for comparison
  const currentVersionArray = [currentMajor, currentMinor, currentPatch];
  const requiredVersionArray = [requiredMajor, requiredMinor, requiredPatch];

  // If the requirement has a pre-release, handle pre-release comparison
  if (requiredPreRelease) {
    // If current version does not have a pre-release, isBlobOrFileLikeObject does not satisfy the requirement
    if (!currentPreRelease) return false;
    // If major/minor/patch do not match, requirement is not satisfied
    if (M0(currentVersionArray, requiredVersionArray) !== 0) return false;
    // Compare pre-release parts lexicographically; must not be less than required
    if (M0(currentPreRelease.split("."), requiredPreRelease.split(".")) === -1) return false;
  }

  // Find the first non-zero index in the required version array (for partial matching)
  const firstNonZeroIndex = requiredVersionArray.findIndex(part => part !== "0") + 1;
  // For tilde (~), only compare up to minor version; for caret (^), compare up to first non-zero
  const comparisonDepth = operator === "~" ? 2 : (firstNonZeroIndex > 1 ? firstNonZeroIndex : 1);

  // Compare the relevant parts of the version arrays
  if (M0(currentVersionArray.slice(0, comparisonDepth), requiredVersionArray.slice(0, comparisonDepth)) !== 0) return false;
  // Ensure that the remaining parts of the current version are not less than the requirement
  if (M0(currentVersionArray.slice(comparisonDepth), requiredVersionArray.slice(comparisonDepth)) === -1) return false;

  return true;
}

module.exports = compareVersionData;