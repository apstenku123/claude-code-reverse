/**
 * Determines the type of shell currently being used based on the SHELL environment variable.
 *
 * @returns {string} The name of the detected shell ("zsh", "bash", "fish"), or "unknown" if not recognized.
 */
function getCurrentShellType() {
  // Retrieve the SHELL environment variable, defaulting to an empty string if undefined
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

  // If none of the known shells are detected, return "unknown"
  return "unknown";
}

module.exports = getCurrentShellType;
