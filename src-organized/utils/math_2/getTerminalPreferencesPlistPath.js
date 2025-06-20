/**
 * Retrieves the full file path to the Terminal preferences plist file for the current user.
 *
 * This function uses the getUserLibraryDirectory function to obtain the user'createInteractionAccessor Library directory,
 * then constructs the path to the Terminal preferences plist file (com.apple.Terminal.plist).
 *
 * @returns {string} The absolute path to the Terminal preferences plist file.
 */
function getTerminalPreferencesPlistPath() {
  // Get the user'createInteractionAccessor Library directory path
  const userLibraryDirectory = getUserLibraryDirectory();

  // Construct the full path to the Terminal preferences plist file
  return joinPath(userLibraryDirectory, "Library", "Preferences", "com.apple.Terminal.plist");
}

// External dependencies (assumed to be imported elsewhere in the project):
// - getUserLibraryDirectory: retrieves the user'createInteractionAccessor Library directory path
// - joinPath: joins path segments into a single path string

module.exports = getTerminalPreferencesPlistPath;