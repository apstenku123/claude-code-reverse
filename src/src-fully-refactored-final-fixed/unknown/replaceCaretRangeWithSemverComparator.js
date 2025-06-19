/**
 * Replaces caret (^) version ranges in a semver string with explicit comparator ranges.
 * This function is typically used to expand caret ranges (e.g., ^1.2.3) into their equivalent semver comparator expressions.
 *
 * @param {string} versionRange - The version range string potentially containing caret (^) expressions.
 * @param {Object} options - Options for parsing and replacement.
 * @param {boolean} [options.loose=false] - Whether to use loose parsing rules.
 * @param {boolean} [options.includePrerelease=false] - Whether to include prerelease versions in the comparator range.
 * @returns {string} The version range string with caret expressions replaced by explicit comparator ranges.
 */
function replaceCaretRangeWithSemverComparator(versionRange, options) {
  // Log the caret replacement attempt
  wB("caret", versionRange, options);

  // Select the appropriate caret regex based on 'loose' option
  const caretRegex = options.loose ? AW[jD.CARETLOOSE] : AW[jD.CARET];
  // If includePrerelease is true, add '-0' to the comparator to include prereleases
  const prereleaseSuffix = options.includePrerelease ? "-0" : "";

  // Replace all caret expressions in the versionRange string
  return versionRange.replace(caretRegex, (
    matchedCaret,
    major,
    minor,
    patch,
    prerelease
  ) => {
    // Log the caret replacement match details
    wB("caret", versionRange, matchedCaret, major, minor, patch, prerelease);
    let comparatorRange;

    // If major is missing (wildcard)
    if (isWildcardOrX(major)) {
      comparatorRange = "";
    }
    // If minor is missing (e.g., ^1)
    else if (isWildcardOrX(minor)) {
      comparatorRange = `>=${major}.0.0${prereleaseSuffix} <${+major + 1}.0.0-0`;
    }
    // If patch is missing (e.g., ^1.2)
    else if (isWildcardOrX(patch)) {
      if (major === "0") {
        // For ^0.x, only allow patch updates
        comparatorRange = `>=${major}.${minor}.0${prereleaseSuffix} <${major}.${+minor + 1}.0-0`;
      } else {
        // For ^x.mapArraysToObjectWithCallback, allow minor and patch updates
        comparatorRange = `>=${major}.${minor}.0${prereleaseSuffix} <${+major + 1}.0.0-0`;
      }
    }
    // If prerelease is present (e.g., ^1.2.3-beta)
    else if (prerelease) {
      wB("replaceCaret pr", prerelease);
      if (major === "0") {
        if (minor === "0") {
          // ^0.0.x-prerelease: only patch updates
          comparatorRange = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${minor}.${+patch + 1}-0`;
        } else {
          // ^0.x.mapArraysToObjectWithCallback-prerelease: only minor updates
          comparatorRange = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${+minor + 1}.0-0`;
        }
      } else {
        // ^x.mapArraysToObjectWithCallback.z-prerelease: allow major updates
        comparatorRange = `>=${major}.${minor}.${patch}-${prerelease} <${+major + 1}.0.0-0`;
      }
    }
    // No prerelease, all version parts present (e.g., ^1.2.3)
    else {
      wB("no pr");
      if (major === "0") {
        if (minor === "0") {
          // ^0.0.x: only patch updates
          comparatorRange = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${minor}.${+patch + 1}-0`;
        } else {
          // ^0.x.mapArraysToObjectWithCallback: only minor updates
          comparatorRange = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${+minor + 1}.0-0`;
        }
      } else {
        // ^x.mapArraysToObjectWithCallback.z: allow major updates
        comparatorRange = `>=${major}.${minor}.${patch} <${+major + 1}.0.0-0`;
      }
    }
    // Log the comparator range being returned
    wB("caret return", comparatorRange);
    return comparatorRange;
  });
}

module.exports = replaceCaretRangeWithSemverComparator;
