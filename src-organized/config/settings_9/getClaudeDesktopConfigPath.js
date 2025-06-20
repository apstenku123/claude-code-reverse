/**
 * Returns the full path to the Claude Desktop configuration file based on the current platform.
 * Supports macOS and Windows Subsystem for Linux (WSL). Throws an error if the platform is unsupported
 * or if the config file cannot be found on Windows/WSL.
 *
 * @returns {string} Absolute path to the Claude Desktop config file
 * @throws {Error} If the platform is unsupported or the config file cannot be found
 */
function getClaudeDesktopConfigPath() {
  // Determine the current platform (e.g., 'macos', 'wsl')
  const currentPlatform = rQ();

  // Supported platforms for Claude Desktop integration
  if (!QT1.includes(currentPlatform)) {
    throw new Error(`Unsupported platform: ${currentPlatform} - Claude Desktop integration only works on macOS and WSL.`);
  }

  // macOS: Return the standard config path
  if (currentPlatform === "macos") {
    return eAA.join(F_2.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
  }

  // WSL: Try to locate the config file in the user'createInteractionAccessor Windows profile directory
  const userProfileEnv = process.env.USERPROFILE ? process.env.USERPROFILE.replace(/\\/g, "/") : null;
  if (userProfileEnv) {
    // Remove drive letter (e.g., 'C:') and construct WSL path
    const configPath = `/mnt/c${userProfileEnv.replace(/^[a-zA]:/, "")}/AppData/Roaming/Claude/claude_desktop_config.json`;
    if (f1().existsSync(configPath)) {
      return configPath;
    }
  }

  // Fallback: Search all user directories under /mnt/c/Users for the config file
  try {
    const windowsUsersDir = "/mnt/c/Users";
    if (f1().existsSync(windowsUsersDir)) {
      const userDirs = f1().readdirSync(windowsUsersDir);
      for (const userDir of userDirs) {
        // Skip common system profiles
        if (["Public", "Default", "Default User", "All Users"].includes(userDir.name)) {
          continue;
        }
        const configPath = eAA.join(windowsUsersDir, userDir.name, "AppData", "Roaming", "Claude", "claude_desktop_config.json");
        if (f1().existsSync(configPath)) {
          return configPath;
        }
      }
    }
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }

  // If the config file was not found, throw an error
  throw new Error("Could not find Claude Desktop config file in Windows. Make sure Claude Desktop is installed on Windows.");
}

module.exports = getClaudeDesktopConfigPath;