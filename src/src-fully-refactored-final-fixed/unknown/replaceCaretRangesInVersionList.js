/**
 * Replaces caret (^) semver ranges in a space-separated list of version strings with explicit semver range expressions.
 * Each version string is processed individually using the replaceCaretRanges function.
 *
 * @param {string} versionList - a space-separated list of version strings, possibly containing caret ranges.
 * @param {object} options - Configuration options to pass to replaceCaretRanges (e.g., loose parsing, prerelease handling).
 * @returns {string} The processed version list with caret ranges replaced by explicit semver ranges.
 */
function replaceCaretRangesInVersionList(versionList, options) {
  // Remove leading/trailing whitespace and split the string into individual version strings
  const versionStrings = versionList.trim().split(/\s+/);

  // Process each version string with replaceCaretRanges
  const processedVersions = versionStrings.map(
    (version) => replaceCaretRanges(version, options)
  );

  // Join the processed versions back into a space-separated string
  return processedVersions.join(" ");
}

module.exports = replaceCaretRangesInVersionList;
