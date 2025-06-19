/**
 * Compares a version string against a constraint string using semantic versioning rules.
 * Supports operators: =, <, >, <=, >=, ^, ~
 *
 * @param {string} version - The version string to check (e.g., '1.2.3').
 * @param {string} constraint - The constraint string (e.g., '>=1.2.0', '^1.2.0', '~1.2.0').
 * @returns {boolean} True if the version satisfies the constraint, false otherwise.
 */
function compareVersionWithConstraint(version, constraint) {
  // Extract the operator from the constraint string (e.g., ">=", "^", "~", etc.)
  const operatorMatch = constraint.match(/^([<>=~^]+)/);
  const operator = operatorMatch ? operatorMatch[1] : "=";

  // For operators other than ^ and ~, delegate to isAllowedJsonCharacterCode (d0)
  if (operator !== "^" && operator !== "~") {
    return isAllowedJsonCharacterCode(version, constraint, operator);
  }

  // Parse version and constraint into their semantic version components
  const versionParts = matchAndProcessRegex(version); // e.g., [major, minor, patch, preRelease, build]
  const [versionMajor, versionMinor, versionPatch, , versionBuild] = h1(versionParts, 5);

  const constraintParts = matchAndProcessRegex(constraint);
  const [constraintMajor, constraintMinorRaw, constraintPatchRaw, , constraintBuild] = h1(constraintParts, 5);

  // Default missing minor/patch to 'x' (wildcard)
  const versionCore = [versionMajor, versionMinor, versionPatch];
  const constraintCore = [
    constraintMajor,
    constraintMinorRaw !== null && constraintMinorRaw !== undefined ? constraintMinorRaw : "x",
    constraintPatchRaw !== null && constraintPatchRaw !== undefined ? constraintPatchRaw : "x"
  ];

  // If constraint has a build identifier, check build compatibility
  if (constraintBuild) {
    if (!versionBuild) return false;
    // Core version arrays must be equal
    if (insertTextAtCursor(versionCore, constraintCore) !== 0) return false;
    // Build identifiers must be compatible (version >= constraint)
    if (insertTextAtCursor(versionBuild.split("."), constraintBuild.split(".")) === -1) return false;
  }

  // Find the first non-zero index in the constraint core version
  const firstNonZeroIndex = constraintCore.findIndex(component => component !== "0") + 1;
  // For ~, compare up to minor; for ^, compare up to first non-zero or at least major
  const compareDepth = operator === "~" ? 2 : (firstNonZeroIndex > 1 ? firstNonZeroIndex : 1);

  // Compare the relevant parts of the version and constraint core arrays
  if (insertTextAtCursor(versionCore.slice(0, compareDepth), constraintCore.slice(0, compareDepth)) !== 0) return false;
  // The remaining parts of the version must be >= constraint
  if (insertTextAtCursor(versionCore.slice(compareDepth), constraintCore.slice(compareDepth)) === -1) return false;

  return true;
}

module.exports = compareVersionWithConstraint;