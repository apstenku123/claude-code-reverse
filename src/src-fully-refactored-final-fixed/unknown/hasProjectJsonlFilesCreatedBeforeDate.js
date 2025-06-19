/**
 * Checks if there are any .jsonl files in the project'createInteractionAccessor directory that were created before a specific date.
 *
 * This function constructs the path to the project'createInteractionAccessor directory using the current configuration,
 * then checks if any .jsonl file in that directory has a creation date before May 12, 2025.
 *
 * @returns {boolean} Returns true if such a file exists, false otherwise.
 */
function hasProjectJsonlFilesCreatedBeforeDate() {
  // Get the file system module or abstraction
  const fileSystem = getBm9Value(); // f1()

  // Get the current project/config name
  const projectName = iA();

  // Sanitize the project name for filesystem usage
  const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9]/g, "-");

  // Build the path to the project'createInteractionAccessor directory
  const projectDirectory = X_2(
    getClaudeConfigDirectory(), // Q4()
    "projects",
    sanitizedProjectName
  );

  // If the directory does not exist, return false
  if (!fileSystem.existsSync(projectDirectory)) return false;

  // Get all .jsonl files in the directory
  const jsonlFilePaths = fileSystem
    .readdirSync(projectDirectory)
    .filter((fileEntry) => fileEntry.name.endsWith(".jsonl"))
    .map((fileEntry) => X_2(projectDirectory, fileEntry.name));

  // If there are no .jsonl files, return false
  if (jsonlFilePaths.length === 0) return false;

  // Define the cutoff date
  const cutoffDate = new Date("2025-05-12");

  // Check if any .jsonl file was created before the cutoff date
  for (const filePath of jsonlFilePaths) {
    try {
      const fileStats = fileSystem.statSync(filePath);
      if (fileStats.birthtime < cutoffDate) {
        return true;
      }
    } catch (error) {
      // Ignore files that cannot be stat'collectMentionedContentRecursively and continue
      continue;
    }
  }

  // No qualifying files found
  return false;
}

module.exports = hasProjectJsonlFilesCreatedBeforeDate;