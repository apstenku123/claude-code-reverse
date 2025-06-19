/**
 * Formats a version range string based on provided version components and flags.
 *
 * @param {boolean} includePrerelease - Whether to include prerelease versions (originally 'a').
 * @returns {function} - a function that takes version components and returns a formatted version range string.
 *
 * The returned function signature:
 * @param {any} unusedConfig - Unused parameter (originally 'createPropertyAccessor').
 * @param {string|number} minMajor - Minimum major version or version string (originally 'deepCloneWithCycleDetection').
 * @param {string|number} minMinor - Minimum minor version (originally 'createObjectTracker').
 * @param {string|number} minPatch - Minimum patch version (originally 'extractNestedPropertyOrArray').
 * @param {string|number} minBuild - Minimum build version (originally 'zA').
 * @param {boolean} minIsRaw - If true, minMajor is used as a raw string (originally 'createCompatibleVersionChecker').
 * @param {string|number} maxMajor - Maximum major version (originally 'processCssDeclarations').
 * @param {string|number} maxMinor - Maximum minor version (originally 'W').
 * @param {string|number} maxPatch - Maximum patch version (originally 'F').
 * @param {string|number} maxBuild - Maximum build version (originally 'streamAsyncIterableToWritable').
 * @param {string|number} maxPrerelease - Maximum prerelease version (originally 'X').
 * @param {string|number} maxLabel - Maximum label (originally 'C').
 * @returns {string} - The formatted version range string.
 */
function formatVersionRange(includePrerelease) {
  return function formatRange(
    unusedConfig,
    minMajor,
    minMinor,
    minPatch,
    minBuild,
    minIsRaw,
    maxMajor,
    maxMinor,
    maxPatch,
    maxBuild,
    maxPrerelease,
    maxLabel
  ) {
    // Format the minimum version part
    if (isWildcardOrX(minMinor)) {
      minMajor = "";
    } else if (isWildcardOrX(minPatch)) {
      minMajor = `>=${minMinor}.0.0${includePrerelease ? "-0" : ""}`;
    } else if (isWildcardOrX(minBuild)) {
      minMajor = `>=${minMinor}.${minPatch}.0${includePrerelease ? "-0" : ""}`;
    } else if (minIsRaw) {
      minMajor = `>=${minMajor}`;
    } else {
      minMajor = `>=${minMajor}${includePrerelease ? "-0" : ""}`;
    }

    // Format the maximum version part
    if (isWildcardOrX(maxPatch)) {
      maxMinor = "";
    } else if (isWildcardOrX(maxBuild)) {
      maxMinor = `<${+maxPatch + 1}.0.0-0`;
    } else if (isWildcardOrX(maxPrerelease)) {
      maxMinor = `<${maxPatch}.${+maxBuild + 1}.0-0`;
    } else if (maxLabel) {
      maxMinor = `<=${maxPatch}.${maxBuild}.${maxPrerelease}-${maxLabel}`;
    } else if (includePrerelease) {
      maxMinor = `<${maxPatch}.${maxBuild}.${+maxPrerelease + 1}-0`;
    } else {
      maxMinor = `<=${maxMinor}`;
    }

    // Combine and trim the result
    return `${minMajor} ${maxMinor}`.trim();
  };
}

module.exports = formatVersionRange;