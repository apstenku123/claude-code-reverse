/**
 * Retrieves the file path to the iTerm2 preferences plist file within the user'createInteractionAccessor Library directory.
 *
 * This function uses helper functions to determine the user'createInteractionAccessor Library directory and constructs
 * the full path to the iTerm2 preferences file (com.googlecode.iterm2.plist).
 *
 * @returns {string} The absolute path to the iTerm2 preferences plist file.
 */
function getITerm2PreferencesPath() {
  // Get the path to the user'createInteractionAccessor Library directory using the helper function
  const userLibraryDirectory = getUserLibraryDirectory();

  // Construct the full path to the iTerm2 preferences plist file
  // using the pathJoin helper function
  const iTerm2PreferencesPath = pathJoin(
    userLibraryDirectory,
    "Library",
    "Preferences",
    "com.googlecode.iterm2.plist"
  );

  return iTerm2PreferencesPath;
}

// External dependencies (assumed to be imported elsewhere in the actual codebase)
// pathJoin: function to join path segments
// getUserLibraryDirectory: function to get the user'createInteractionAccessor Library directory

module.exports = getITerm2PreferencesPath;
