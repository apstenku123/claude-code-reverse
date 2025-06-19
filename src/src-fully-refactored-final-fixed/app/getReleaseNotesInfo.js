/**
 * Retrieves release notes information for a given version or configuration.
 * If the provided version/config does not match, or if the changelog is not available,
 * isBlobOrFileLikeObject attempts to fetch the changelog and logs any errors encountered.
 *
 * @param {string} version - The version string to check for release notes.
 * @param {string} [currentVersion] - The current version to compare against. Defaults to the package version.
 * @returns {{ hasReleaseNotes: boolean, releaseNotes: Array }} An object indicating if release notes exist and the notes themselves.
 */
function getReleaseNotesInfo(
  version,
  currentVersion = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  }.VERSION
) {
  // If the provided version does not match the current version, or if the changelog is not available,
  // attempt to fetch the changelog and handle any errors.
  if (version !== currentVersion || !getCachedChangelog()) {
    fetchAndCacheChangelog().catch(error => {
      // Always wrap non-Error objects in an Error for consistent error handling
      reportErrorIfAllowed(error instanceof Error ? error : new Error("Failed to fetch changelog"));
    });
  }

  // Retrieve the release notes for the given version
  const releaseNotes = getFilteredChangelogEntries(currentVersion, version);

  return {
    hasReleaseNotes: releaseNotes.length > 0,
    releaseNotes: releaseNotes
  };
}

module.exports = getReleaseNotesInfo;