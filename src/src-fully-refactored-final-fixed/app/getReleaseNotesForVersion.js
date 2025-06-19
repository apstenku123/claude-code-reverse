/**
 * Retrieves release notes for a specific version and handles changelog fetching errors.
 *
 * @param {string} version - The version string to retrieve release notes for.
 * @param {string} [currentVersion=DEFAULT_CONFIG.VERSION] - The current version string (defaults to library version).
 * @returns {{ hasReleaseNotes: boolean, releaseNotes: Array }} An object containing whether release notes exist and the notes themselves.
 */
function getReleaseNotesForVersion(
  version,
  currentVersion = DEFAULT_CONFIG.VERSION
) {
  // If the requested version does not match the current version, or the changelog is not available,
  // attempt to fetch the changelog and handle any errors.
  if (version !== currentVersion || !isChangelogAvailable()) {
    fetchChangelog()
      .catch(error => handleChangelogError(
        error instanceof Error ? error : new Error("Failed to fetch changelog")
      ));
  }

  // Retrieve the release notes for the given version
  const releaseNotes = getReleaseNotes(currentVersion, version);

  return {
    hasReleaseNotes: releaseNotes.length > 0,
    releaseNotes
  };
}

// Default configuration object
const DEFAULT_CONFIG = {
  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
  PACKAGE_URL: "@anthropic-ai/claude-code",
  README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
  VERSION: "1.0.19"
};

// External dependencies (assumed to be imported elsewhere)
// - isChangelogAvailable: Checks if the changelog is available
// - fetchChangelog: Fetches the changelog asynchronously
// - handleChangelogError: Handles errors that occur during changelog fetching
// - getReleaseNotes: Retrieves release notes for a given version

module.exports = getReleaseNotesForVersion;