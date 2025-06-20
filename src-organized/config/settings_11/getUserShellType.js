/**
 * Retrieves the user'createInteractionAccessor shell type based on the SHELL environment variable.
 *
 * @returns {string} The detected shell type: 'zsh', 'bash', 'fish', or 'unknown' if none match.
 */
function getUserShellType() {
  // Get the SHELL environment variable, defaulting to an empty string if undefined
  const shellPath = process.env.SHELL || "";

  // Check for common shell types in order of specificity
  if (shellPath.includes("zsh")) {
    return "zsh";
  }
  if (shellPath.includes("bash")) {
    return "bash";
  }
  if (shellPath.includes("fish")) {
    return "fish";
  }

  // Return 'unknown' if no known shell type is detected
  return "unknown";
}

module.exports = getUserShellType;
