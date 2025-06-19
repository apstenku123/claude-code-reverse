/**
 * Searches for all possible locations of the Claude IDE configuration directory across different environments.
 *
 * This function checks the default config directory, WSL user directories, and user profiles for the presence
 * of the '.claude/ide' directory. It returns an array of all found paths.
 *
 * @returns {string[]} Array of absolute paths to found Claude IDE configuration directories.
 */
function findClaudeIdeDirectories() {
  const foundDirectories = [];
  const fileSystem = getBm9Value(); // Provides fs-like API (existsSync, readdirSync)
  const runtimeEnvironment = rQ(); // Returns current runtime environment (e.g., 'wsl', 'windows')
  const defaultConfigDir = so(getClaudeConfigDirectory(), "ide"); // Path to default Claude IDE config

  // Check if the default config directory exists
  if (fileSystem.existsSync(defaultConfigDir)) {
    foundDirectories.push(defaultConfigDir);
  }

  // If not running in WSL, return what handleMissingDoctypeError'removeTrailingCharacters found so far
  if (runtimeEnvironment !== "wsl") {
    return foundDirectories;
  }

  // In WSL: try to find config in the Windows user profile
  const userProfile = process.env.USERPROFILE;
  if (userProfile) {
    // Convert Windows path to WSL path (e.g., C:\Users\Name -> /mnt/c/Users/Name)
    const wslUserProfile = userProfile
      .replace(/\\/g, "/")
      .replace(/^([a-zA]):/i, (match, driveLetter) => `/mnt/${driveLetter.toLowerCase()}`);
    const wslConfigDir = ro(wslUserProfile, ".claude", "ide");
    if (fileSystem.existsSync(wslConfigDir)) {
      foundDirectories.push(wslConfigDir);
    }
  }

  // In WSL: check all user directories under /mnt/c/Users
  try {
    const windowsUsersDir = "/mnt/c/Users";
    if (fileSystem.existsSync(windowsUsersDir)) {
      const userDirs = fileSystem.readdirSync(windowsUsersDir);
      for (const userDirEntry of userDirs) {
        // Skip system/default users
        if (["Public", "Default", "Default User", "All Users"].includes(userDirEntry.name)) {
          continue;
        }
        const possibleConfigDir = so(windowsUsersDir, userDirEntry.name, ".claude", "ide");
        if (fileSystem.existsSync(possibleConfigDir)) {
          foundDirectories.push(possibleConfigDir);
        }
      }
    }
  } catch (error) {
    // Log error using reportErrorIfAllowed, wrapping non-Error objects
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }

  return foundDirectories;
}

module.exports = findClaudeIdeDirectories;