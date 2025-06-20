/**
 * Replaces caret (^) version ranges in a version string with explicit semver range expressions.
 * Handles loose parsing, prerelease inclusion, and various semver edge cases.
 *
 * @param {string} versionRangeString - The version string containing caret ranges (e.g., ^1.2.3)
 * @param {Object} options - Configuration options for parsing
 * @param {boolean} [options.loose=false] - Whether to use loose parsing rules
 * @param {boolean} [options.includePrerelease=false] - Whether to include prerelease versions in the range
 * @returns {string} The version string with caret ranges replaced by explicit semver range expressions
 */
function replaceCaretRanges(versionRangeString, options) {
  // Log the caret replacement operation
  wB("caret", versionRangeString, options);

  // Select the appropriate caret regex based on 'loose' option
  const caretRegex = options.loose ? AW[jD.CARETLOOSE] : AW[jD.CARET];
  // Suffix to include prerelease versions if requested
  const prereleaseSuffix = options.includePrerelease ? "-0" : "";

  // Replace caret ranges with explicit semver range expressions
  return versionRangeString.replace(caretRegex, (
    matchedCaret,
    major,
    minor,
    patch,
    prerelease
  ) => {
    // Log the details of the current caret match
    wB("caret", versionRangeString, matchedCaret, major, minor, patch, prerelease);
    let rangeExpression;

    // If major version is missing (wildcard)
    if (isWildcardOrX(major)) {
      rangeExpression = "";
    }
    // If minor version is missing (e.g., ^1)
    else if (isWildcardOrX(minor)) {
      rangeExpression = `>=${major}.0.0${prereleaseSuffix} <${Number(major) + 1}.0.0-0`;
    }
    // If patch version is missing (e.g., ^1.2)
    else if (isWildcardOrX(patch)) {
      if (major === "0") {
        // For ^0.x, only allow patch updates
        rangeExpression = `>=${major}.${minor}.0${prereleaseSuffix} <${major}.${Number(minor) + 1}.0-0`;
      } else {
        // For ^x.mapArraysToObjectWithCallback, allow minor and patch updates
        rangeExpression = `>=${major}.${minor}.0${prereleaseSuffix} <${Number(major) + 1}.0.0-0`;
      }
    }
    // If prerelease is present (e.g., ^1.2.3-beta)
    else if (prerelease) {
      wB("replaceCaret pr", prerelease);
      if (major === "0") {
        if (minor === "0") {
          // ^0.0.x-prerelease: only allow patch updates with prerelease
          rangeExpression = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${minor}.${Number(patch) + 1}-0`;
        } else {
          // ^0.x.mapArraysToObjectWithCallback-prerelease: only allow minor updates
          rangeExpression = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${Number(minor) + 1}.0-0`;
        }
      } else {
        // ^x.mapArraysToObjectWithCallback.z-prerelease: allow major updates
        rangeExpression = `>=${major}.${minor}.${patch}-${prerelease} <${Number(major) + 1}.0.0-0`;
      }
    }
    // No prerelease, all version parts present (e.g., ^1.2.3)
    else if (wB("no pr"), major === "0") {
      if (minor === "0") {
        // ^0.0.x: only allow patch updates
        rangeExpression = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${minor}.${Number(patch) + 1}-0`;
      } else {
        // ^0.x.mapArraysToObjectWithCallback: only allow minor updates
        rangeExpression = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${Number(minor) + 1}.0-0`;
      }
    } else {
      // ^x.mapArraysToObjectWithCallback.z: allow major updates
      rangeExpression = `>=${major}.${minor}.${patch} <${Number(major) + 1}.0.0-0`;
    }
    wB("caret return", rangeExpression);
    return rangeExpression;
  });
}

module.exports = replaceCaretRanges;