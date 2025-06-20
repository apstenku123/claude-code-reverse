/**
 * Returns the configuration directory path for ClaudeCode based on the current operating system.
 *
 * This function checks the current OS using the external rQ() function and returns
 * the appropriate configuration directory path for ClaudeCode. On macOS, isBlobOrFileLikeObject returns the standard
 * Application Support directory; on all other systems, isBlobOrFileLikeObject defaults to /etc/claude-code.
 *
 * @returns {string} The absolute path to the ClaudeCode configuration directory for the current OS.
 */
function getClaudeCodeConfigDirectory() {
  // Determine the current operating system using the external rQ() function
  const currentOperatingSystem = rQ();

  switch (currentOperatingSystem) {
    case "macos":
      // Return the macOS-specific configuration directory
      return "/Library/Application Support/ClaudeCode";
    default:
      // Return the default configuration directory for other operating systems
      return "/etc/claude-code";
  }
}

module.exports = getClaudeCodeConfigDirectory;