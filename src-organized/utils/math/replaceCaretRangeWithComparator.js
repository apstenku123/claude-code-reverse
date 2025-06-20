/**
 * Replaces caret (^) range specifiers in a version range string with explicit comparator expressions.
 * This function is typically used for parsing and expanding semver caret ranges into their equivalent comparator form.
 *
 * @param {string} versionRange - The version range string containing caret (^) specifiers.
 * @param {Object} options - Configuration options for parsing.
 * @param {boolean} [options.loose=false] - If true, uses loose parsing rules.
 * @param {boolean} [options.includePrerelease=false] - If true, includes prerelease versions in the comparator.
 * @returns {string} The version range string with caret specifiers replaced by explicit comparators.
 */
function replaceCaretRangeWithComparator(versionRange, options) {
  // Log the caret replacement activity
  wB("caret", versionRange, options);

  // Select the appropriate caret regex based on 'loose' option
  const caretRegex = options.loose ? AW[jD.CARETLOOSE] : AW[jD.CARET];
  // If including prerelease, add '-0' to lower bound
  const prereleaseSuffix = options.includePrerelease ? "-0" : "";

  // Replace all caret ranges in the versionRange string
  return versionRange.replace(caretRegex, (
    matched, // The full matched string (e.g. ^1.2.3)
    major,   // Major version part
    minor,   // Minor version part
    patch,   // Patch version part
    prerelease // Prerelease identifier (if any)
  ) => {
    // Log the details of the current caret replacement
    wB("caret", versionRange, matched, major, minor, patch, prerelease);

    let comparatorExpression;

    // If only major is specified (e.g. ^1)
    if (isWildcardOrX(major)) {
      comparatorExpression = "";
    }
    // If only major and minor are specified (e.g. ^1.2)
    else if (isWildcardOrX(minor)) {
      comparatorExpression = `>=${major}.0.0${prereleaseSuffix} <${+major + 1}.0.0-0`;
    }
    // If major, minor, and patch are specified (e.g. ^1.2.3)
    else if (isWildcardOrX(patch)) {
      if (major === "0") {
        // For ^0.x.mapArraysToObjectWithCallback, only allow patch-level changes
        comparatorExpression = `>=${major}.${minor}.0${prereleaseSuffix} <${major}.${+minor + 1}.0-0`;
      } else {
        // For ^x.mapArraysToObjectWithCallback.z where x != 0, allow minor and patch-level changes
        comparatorExpression = `>=${major}.${minor}.0${prereleaseSuffix} <${+major + 1}.0.0-0`;
      }
    }
    // If a prerelease identifier is present (e.g. ^1.2.3-alpha)
    else if (prerelease) {
      wB("replaceCaret pr", prerelease);
      if (major === "0") {
        if (minor === "0") {
          // ^0.0.x-prerelease: only allow patch-level changes
          comparatorExpression = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${minor}.${+patch + 1}-0`;
        } else {
          // ^0.x.mapArraysToObjectWithCallback-prerelease: only allow minor-level changes
          comparatorExpression = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${+minor + 1}.0-0`;
        }
      } else {
        // ^x.mapArraysToObjectWithCallback.z-prerelease: allow minor and patch-level changes
        comparatorExpression = `>=${major}.${minor}.${patch}-${prerelease} <${+major + 1}.0.0-0`;
      }
    }
    // No prerelease, but all parts specified (e.g. ^1.2.3)
    else if (wB("no pr"), major === "0") {
      if (minor === "0") {
        // ^0.0.x: only allow patch-level changes
        comparatorExpression = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${minor}.${+patch + 1}-0`;
      } else {
        // ^0.x.mapArraysToObjectWithCallback: only allow minor-level changes
        comparatorExpression = `>=${major}.${minor}.${patch}${prereleaseSuffix} <${major}.${+minor + 1}.0-0`;
      }
    } else {
      // ^x.mapArraysToObjectWithCallback.z: allow minor and patch-level changes
      comparatorExpression = `>=${major}.${minor}.${patch} <${+major + 1}.0.0-0`;
    }

    // Log the comparator expression being returned
    wB("caret return", comparatorExpression);
    return comparatorExpression;
  });
}

module.exports = replaceCaretRangeWithComparator;
