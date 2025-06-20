/**
 * Determines whether release notes should be shown to the user.
 *
 * This function retrieves the user'createInteractionAccessor configuration (from cache or disk),
 * checks if the user has seen the latest release notes, and returns true
 * if the release notes should be shown (i.e., the user has not seen them).
 *
 * @returns {boolean} True if release notes should be shown, false otherwise.
 */
function shouldShowReleaseNotes() {
  // Retrieve the user'createInteractionAccessor configuration object (from cache or fresh from disk)
  const userConfig = getCachedOrFreshConfig();

  // Determine if the user has seen the latest release notes
  // getReleaseNotesInfo returns an object with a hasReleaseNotes property
  const { hasReleaseNotes } = getReleaseNotesInfo(userConfig.lastReleaseNotesSeen);

  // If hasReleaseNotes is false, the user has NOT seen the latest notes, so show them
  return !hasReleaseNotes;
}

module.exports = shouldShowReleaseNotes;