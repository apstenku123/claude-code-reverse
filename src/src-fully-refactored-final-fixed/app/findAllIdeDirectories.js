/**
 * Searches for all possible '.claude/ide' directories on the system, including Windows Subsystem for Linux (WSL) environments.
 *
 * @returns {string[]} An array of absolute paths to found '.claude/ide' directories.
 */
function findAllIdeDirectories() {
  const ideDirectories = [];
  const fileSystem = f1(); // Provides file system methods like existsSync, readdirSync
  const platformType = rQ(); // Returns the current platform type, e.g., 'wsl', 'win32', etc.
  const mainIdePath = so(Q4(), "ide"); // Constructs the main '.claude/ide' path

  // Check if the main IDE directory exists
  if (fileSystem.existsSync(mainIdePath)) {
    ideDirectories.push(mainIdePath);
  }

  // If not running in WSL, return the found directories
  if (platformType !== "wsl") {
    return ideDirectories;
  }

  // In WSL, attempt to find IDE directories in Windows user profiles
  const userProfile = process.env.USERPROFILE;
  if (userProfile) {
    // Convert Windows path to WSL path (e.g., C:\Users\Name -> /mnt/c/Users/Name)
    const wslUserProfilePath = userProfile
      .replace(/\\/g, "/")
      .replace(/^([a-zA]):/i, (match, driveLetter) => `/mnt/${driveLetter.toLowerCase()}`);
    const wslIdePath = ro(wslUserProfilePath, ".claude", "ide");
    if (fileSystem.existsSync(wslIdePath)) {
      ideDirectories.push(wslIdePath);
    }
  }

  // Attempt to find IDE directories in all users under /mnt/c/Users
  try {
    const windowsUsersRoot = "/mnt/c/Users";
    if (fileSystem.existsSync(windowsUsersRoot)) {
      const userDirectories = fileSystem.readdirSync(windowsUsersRoot);
      for (const userDir of userDirectories) {
        // Skip system/default user directories
        if (
          userDir.name === "Public" ||
          userDir.name === "Default" ||
          userDir.name === "Default User" ||
          userDir.name === "All Users"
        ) {
          continue;
        }
        // Construct the path to the user'createInteractionAccessor '.claude/ide' directory
        const userIdePath = so(windowsUsersRoot, userDir.name, ".claude", "ide");
        if (fileSystem.existsSync(userIdePath)) {
          ideDirectories.push(userIdePath);
        }
      }
    }
  } catch (error) {
    // Log the error using reportErrorIfAllowed, ensuring isBlobOrFileLikeObject'createInteractionAccessor an Error object
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }

  return ideDirectories;
}

module.exports = findAllIdeDirectories;