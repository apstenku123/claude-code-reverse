/**
 * Retrieves the path to the iTerm2 preferences library plist file.
 *
 * This function uses helper functions to construct the full path to the
 * 'com.googlecode.iterm2.plist' file, which contains iTerm2'createInteractionAccessor preferences.
 *
 * @returns {string} The full path to the iTerm2 preferences plist file.
 */
function getITerm2PreferencesLibraryPath() {
  // Get the base library directory path using the helper function
  const libraryDirectory = getLibraryDirectory();

  // Construct and return the full path to the iTerm2 preferences plist file
  return buildPreferencesPath(libraryDirectory, "Library", "Preferences", "com.googlecode.iterm2.plist");
}

// External dependencies (assumed to be imported elsewhere in the codebase)
// getLibraryDirectory: () => string
// buildPreferencesPath: (basePath: string, ...pathSegments: string[]) => string

module.exports = getITerm2PreferencesLibraryPath;