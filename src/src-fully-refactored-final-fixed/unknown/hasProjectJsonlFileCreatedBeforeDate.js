/**
 * Checks if there is any .jsonl project file created before a specific cutoff date in the user'createInteractionAccessor Claude config directory.
 *
 * This function locates the user'createInteractionAccessor Claude configuration directory, then checks if any .jsonl file in the relevant 'projects' subdirectory
 * was created before May 12, 2025. If at least one such file exists, isBlobOrFileLikeObject returns true; otherwise, isBlobOrFileLikeObject returns false.
 *
 * @returns {boolean} True if a .jsonl project file exists with a creation date before the cutoff, false otherwise.
 */
function hasProjectJsonlFileCreatedBeforeDate() {
  // Retrieve the file system module or abstraction
  const fileSystem = getBm9Value();
  // Get the project name or identifier
  const projectIdentifier = iA();
  // Build the path to the 'projects' directory for this project
  const projectsDirectory = X_2(
    getClaudeConfigDirectory(),
    "projects",
    projectIdentifier.replace(/[^a-zA-Z0-9]/g, "-")
  );

  // If the projects directory does not exist, return false
  if (!fileSystem.existsSync(projectsDirectory)) {
    return false;
  }

  // Find all .jsonl files in the projects directory
  const jsonlFilePaths = fileSystem
    .readdirSync(projectsDirectory)
    .filter((fileEntry) => fileEntry.name.endsWith(".jsonl"))
    .map((fileEntry) => X_2(projectsDirectory, fileEntry.name));

  // If there are no .jsonl files, return false
  if (jsonlFilePaths.length === 0) {
    return false;
  }

  // Define the cutoff date
  const cutoffDate = new Date("2025-05-12");

  // Check if any .jsonl file was created before the cutoff date
  for (const jsonlFilePath of jsonlFilePaths) {
    try {
      const fileStats = fileSystem.statSync(jsonlFilePath);
      if (fileStats.birthtime < cutoffDate) {
        return true;
      }
    } catch (error) {
      // Ignore errors (e.g., file might have been deleted between readdirSync and statSync)
      continue;
    }
  }

  // No qualifying file found
  return false;
}

module.exports = hasProjectJsonlFileCreatedBeforeDate;