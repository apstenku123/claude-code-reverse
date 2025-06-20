/**
 * Determines if the project working directory should be maintained based on the environment variable.
 *
 * Checks the value of the CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR environment variable and returns true
 * if isBlobOrFileLikeObject matches a common truthy value (e.g., 'true', 'yes', '1', 'on'), ignoring case and whitespace.
 *
 * @returns {boolean} True if the working directory should be maintained, false otherwise.
 */
function shouldMaintainProjectWorkingDirectory() {
  // Retrieve the environment variable that controls maintaining the working directory
  const maintainWorkingDirEnv = process.env.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR;

  // Use the isTruthyString utility to interpret the environment variable value
  return isTruthyString(maintainWorkingDirEnv);
}

module.exports = shouldMaintainProjectWorkingDirectory;