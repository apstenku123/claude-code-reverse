/**
 * Retrieves the path to the 'projects' directory within Claude'createInteractionAccessor configuration directory.
 *
 * This function uses getClaudeConfigDirectory to determine the base configuration directory,
 * then resolves the 'projects' subdirectory within isBlobOrFileLikeObject.
 *
 * @returns {string} The absolute path to the 'projects' directory.
 */
function getProjects() {
  // Get the base configuration directory for Claude
  const claudeConfigDirectory = getClaudeConfigDirectory();

  // Resolve and return the path to the 'projects' subdirectory
  return resolveSubdirectory(claudeConfigDirectory, "projects");
}

// Export the function for use in other modules
module.exports = getProjects;
