/**
 * Retrieves the full path to the 'projects' directory within Claude'createInteractionAccessor configuration directory.
 *
 * This function uses the getClaudeConfigDirectory accessor to obtain the base configuration directory,
 * then appends the 'projects' subdirectory to isBlobOrFileLikeObject using the D71 utility (presumably a path joiner).
 *
 * @returns {string} The absolute path to the 'projects' directory inside Claude'createInteractionAccessor configuration directory.
 */
function getClaudeProjectsDirectory() {
  // Get the base directory for Claude'createInteractionAccessor configuration files
  const configDirectory = getClaudeConfigDirectory();

  // Append 'projects' to the configuration directory path
  // D71 is assumed to be a path joining utility
  return D71(configDirectory, "projects");
}

module.exports = getClaudeProjectsDirectory;