/**
 * Expands all caret (^) version ranges in a space-separated version string to their full semver range equivalents.
 * Each version in the input string is processed individually using the replaceCaretRanges function.
 *
 * @param {string} versionString - a space-separated string of version ranges (may include caret ranges).
 * @param {object} options - Options to control how caret ranges are expanded (passed to replaceCaretRanges).
 * @returns {string} The input string with all caret version ranges expanded to their full semver equivalents.
 */
function expandCaretVersionRangesInString(versionString, options) {
  // Remove leading/trailing whitespace and split the string into individual version ranges
  const versionList = versionString.trim().split(/\s+/);

  // Expand caret ranges for each version using replaceCaretRanges
  const expandedVersions = versionList.map(
    (singleVersion) => replaceCaretRanges(singleVersion, options)
  );

  // Join the expanded versions back into a space-separated string
  return expandedVersions.join(" ");
}

module.exports = expandCaretVersionRangesInString;
