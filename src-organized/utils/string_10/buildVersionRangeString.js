/**
 * Constructs a version range string based on provided version components and flags.
 *
 * @param {boolean} includePrerelease - Whether to include prerelease versions (affects hyphenation in output).
 * @returns {function} - a function that, given version components and flags, returns a version range string.
 *
 * The returned function signature:
 *   (
 *     unusedConfig: any,
 *     major: string | number,
 *     minor: string | number,
 *     patch: string | number,
 *     isMajorWildcard: boolean,
 *     isMinorWildcard: boolean,
 *     isPatchWildcard: boolean,
 *     isLowerBoundOnly: boolean,
 *     upperMajor: string | number,
 *     upperMinor: string | number,
 *     upperPatch: string | number,
 *     upperPrerelease: string | number
 *   ) => string
 */
function buildVersionRangeString(includePrerelease) {
  /**
   * @param {any} unusedConfig - Unused parameter (for compatibility with original signature).
   * @param {string|number} major - Lower bound major version.
   * @param {string|number} minor - Lower bound minor version.
   * @param {string|number} patch - Lower bound patch version.
   * @param {boolean} isMajorWildcard - True if major is wildcard/x/empty.
   * @param {boolean} isMinorWildcard - True if minor is wildcard/x/empty.
   * @param {boolean} isPatchWildcard - True if patch is wildcard/x/empty.
   * @param {boolean} isLowerBoundOnly - If true, lower bound is inclusive only.
   * @param {string|number} upperMajor - Upper bound major version.
   * @param {string|number} upperMinor - Upper bound minor version.
   * @param {string|number} upperPatch - Upper bound patch version.
   * @param {string|number} upperPrerelease - Upper bound prerelease identifier.
   * @returns {string} Version range string (e.g., ">=1.2.3 <2.0.0-0").
   */
  return function versionRangeString(
    unusedConfig,
    major,
    minor,
    patch,
    isMajorWildcard,
    isMinorWildcard,
    isPatchWildcard,
    isLowerBoundOnly,
    upperMajor,
    upperMinor,
    upperPatch,
    upperPrerelease
  ) {
    let lowerBound;
    let upperBound;

    // Build lower bound string
    if (isWildcardOrX(minor)) {
      // If minor is wildcard/x/empty, no lower bound
      lowerBound = "";
    } else if (isWildcardOrX(patch)) {
      // If patch is wildcard/x/empty, lower bound is ">=major.0.0" (optionally with -0 for prerelease)
      lowerBound = `>=${minor}.0.0${includePrerelease ? "-0" : ""}`;
    } else if (isWildcardOrX(isLowerBoundOnly)) {
      // If isLowerBoundOnly is wildcard/x/empty, lower bound is ">=minor.patch.0" (optionally with -0)
      lowerBound = `>=${minor}.${patch}.0${includePrerelease ? "-0" : ""}`;
    } else if (isLowerBoundOnly) {
      // If lower bound only, use ">=lowerBound"
      lowerBound = `>=${major}`;
    } else {
      // Default: ">=lowerBound" (optionally with -0)
      lowerBound = `>=${major}${includePrerelease ? "-0" : ""}`;
    }

    // Build upper bound string
    if (isWildcardOrX(upperMajor)) {
      // No upper bound
      upperBound = "";
    } else if (isWildcardOrX(upperMinor)) {
      // If upperMinor is wildcard/x/empty, upper bound is "<upperMajor+1.0.0-0"
      upperBound = `<${+upperMajor + 1}.0.0-0`;
    } else if (isWildcardOrX(upperPatch)) {
      // If upperPatch is wildcard/x/empty, upper bound is "<upperMajor.upperMinor+1.0-0"
      upperBound = `<${upperMajor}.${+upperMinor + 1}.0-0`;
    } else if (upperPrerelease) {
      // If upperPrerelease is set, upper bound is "<=upperMajor.upperMinor.upperPatch-upperPrerelease"
      upperBound = `<=${upperMajor}.${upperMinor}.${upperPatch}-${upperPrerelease}`;
    } else if (includePrerelease) {
      // If includePrerelease, upper bound is "<upperMajor.upperMinor.upperPatch+1-0"
      upperBound = `<${upperMajor}.${upperMinor}.${+upperPatch + 1}-0`;
    } else {
      // Default: "<=upperBound"
      upperBound = `<=${upperMajor}`;
    }

    // Return the trimmed version range string
    return `${lowerBound} ${upperBound}`.trim();
  };
}

/**
 * Checks if a value is a wildcard ("*"), "x", or empty string (case-insensitive).
 * @param {any} value
 * @returns {boolean}
 */
function isWildcardOrX(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "*" ||
    (typeof value === "string" && value.toLowerCase() === "x")
  );
}

module.exports = buildVersionRangeString;
