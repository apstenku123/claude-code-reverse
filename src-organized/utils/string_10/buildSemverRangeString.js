/**
 * Constructs a semantic version range string based on provided version components and flags.
 * Handles wildcards, partial versions, and pre-release identifiers for both lower and upper bounds.
 *
 * @param {boolean} includePrerelease - Whether to include pre-release versions (affects range formatting)
 * @returns {function} - Function that takes version components and returns a semver range string
 *
 * The returned function parameters:
 * @param {string|number} majorStart - The starting major version (lower bound)
 * @param {string|number} minorStart - The starting minor version (lower bound)
 * @param {string|number} patchStart - The starting patch version (lower bound)
 * @param {string|number} majorEnd - The ending major version (upper bound)
 * @param {string|number} minorEnd - The ending minor version (upper bound)
 * @param {string|number} patchEnd - The ending patch version (upper bound)
 * @param {string|number} preReleaseEnd - The pre-release identifier for the upper bound
 * @param {string|number} minorWildcard - Indicates if the minor version is a wildcard (upper bound)
 * @param {string|number} patchWildcard - Indicates if the patch version is a wildcard (upper bound)
 * @param {string|number} preReleaseStart - The pre-release identifier for the lower bound
 * @returns {string} - The constructed semver range string
 */
function buildSemverRangeString(includePrerelease) {
  /**
   * @param {string|number} majorStart
   * @param {string|number} minorStart
   * @param {string|number} patchStart
   * @param {string|number} majorEnd
   * @param {string|number} minorEnd
   * @param {string|number} patchEnd
   * @param {string|number} preReleaseEnd
   * @param {string|number} minorWildcard
   * @param {string|number} patchWildcard
   * @param {string|number} preReleaseStart
   * @param {string|number} preReleaseEndBound
   * @returns {string}
   */
  return function(
    majorStart,
    minorStart,
    patchStart,
    majorEnd,
    minorEnd,
    patchEnd,
    preReleaseEnd,
    minorWildcard,
    patchWildcard,
    preReleaseStart,
    preReleaseEndBound,
    preReleaseUpperBound
  ) {
    let lowerBound;
    // Determine lower bound range string
    if (isWildcardOrX(patchStart)) {
      // If patch is wildcard, no lower bound
      lowerBound = "";
    } else if (isWildcardOrX(minorStart)) {
      // If minor is wildcard, lower bound is ">=majorStart.0.0" (optionally with -0 for prerelease)
      lowerBound = `>=${majorStart}.0.0${includePrerelease ? "-0" : ""}`;
    } else if (isWildcardOrX(majorEnd)) {
      // If majorEnd is wildcard, lower bound is ">=majorStart.minorStart.0" (optionally with -0)
      lowerBound = `>=${majorStart}.${minorStart}.0${includePrerelease ? "-0" : ""}`;
    } else if (minorEnd) {
      // If minorEnd is set, lower bound is ">=minorStart"
      lowerBound = `>=${minorStart}`;
    } else {
      // Otherwise, lower bound is ">=minorStart" (optionally with -0)
      lowerBound = `>=${minorStart}${includePrerelease ? "-0" : ""}`;
    }

    let upperBound;
    // Determine upper bound range string
    if (isWildcardOrX(patchWildcard)) {
      // If patchWildcard is wildcard, no upper bound
      upperBound = "";
    } else if (isWildcardOrX(preReleaseEnd)) {
      // If preReleaseEnd is wildcard, upper bound is "<patchWildcard+1.0.0-0"
      upperBound = `<${+patchWildcard + 1}.0.0-0`;
    } else if (isWildcardOrX(preReleaseStart)) {
      // If preReleaseStart is wildcard, upper bound is "<patchWildcard.preReleaseEnd+1.0-0"
      upperBound = `<${patchWildcard}.${+preReleaseEnd + 1}.0-0`;
    } else if (preReleaseUpperBound) {
      // If preReleaseUpperBound is set, upper bound is "<=patchWildcard.preReleaseEnd.preReleaseStart-preReleaseUpperBound"
      upperBound = `<=${patchWildcard}.${preReleaseEnd}.${preReleaseStart}-${preReleaseUpperBound}`;
    } else if (includePrerelease) {
      // If includePrerelease is true, upper bound is "<patchWildcard.preReleaseEnd.preReleaseStart+1-0"
      upperBound = `<${patchWildcard}.${preReleaseEnd}.${+preReleaseStart + 1}-0`;
    } else {
      // Otherwise, upper bound is "<=minorWildcard"
      upperBound = `<=${minorWildcard}`;
    }

    // Combine and trim the range string
    return `${lowerBound} ${upperBound}`.trim();
  };
}

// Helper function: Determines if a value is a wildcard ("*", "x", or empty string)
function isWildcardOrX(value) {
  return value === "*" || value === "x" || value === "X" || value === "";
}

module.exports = buildSemverRangeString;
