/**
 * Retrieves the file path to the iTerm2 preferences plist file from the user'createInteractionAccessor Library Preferences directory.
 *
 * This function uses helper functions to construct the full path to the 'com.googlecode.iterm2.plist' file,
 * which stores iTerm2 application preferences on macOS systems.
 *
 * @returns {string} The full file path to the iTerm2 preferences plist file.
 */
function getITerm2PreferencesPlistPath() {
  // Get the base path to the user'createInteractionAccessor Library directory using the createInteractionAccessor$6 helper
  const libraryDirectoryPath = createInteractionAccessor$6();

  // Use the r$6 helper to construct the full path to the iTerm2 preferences plist file
  // Arguments: basePath, subdirectory1, subdirectory2, filename
  const preferencesPlistPath = r$6(
    libraryDirectoryPath,
    "Library",
    "Preferences",
    "com.googlecode.iterm2.plist"
  );

  return preferencesPlistPath;
}

module.exports = getITerm2PreferencesPlistPath;