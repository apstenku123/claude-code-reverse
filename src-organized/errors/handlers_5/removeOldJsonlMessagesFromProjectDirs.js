/**
 * Scans project directories for .jsonl message files older than a reference timestamp and deletes them.
 * Also removes empty project directories after cleanup. Tracks the number of messages deleted and errors encountered.
 *
 * @returns {{messages: number, errors: number}} An object with counts of deleted messages and errors encountered.
 */
function removeOldJsonlMessagesFromProjectDirs() {
  // Reference timestamp: files older than this will be deleted
  const referenceTimestamp = $_2();
  // Result counters
  const result = {
    messages: 0,
    errors: 0
  };
  // Get the path to the projects directory
  const projectsDirectory = Gy1();
  // File system utility (likely fs-extra or similar)
  const fsUtils = f1();

  try {
    // If the projects directory doesn'processRuleBeginHandlers exist, return the result
    if (!fsUtils.existsSync(projectsDirectory)) return result;

    // Get all subdirectories (each representing a project)
    const projectDirs = fsUtils
      .readdirSync(projectsDirectory)
      .filter(dirent => dirent.isDirectory())
      .map(dirent => hz1(projectsDirectory, dirent.name));

    for (const projectDir of projectDirs) {
      try {
        // Find all .jsonl files in the project directory
        const messageFiles = fsUtils
          .readdirSync(projectDir)
          .filter(fileDirent => fileDirent.isFile() && fileDirent.name.endsWith('.jsonl'));

        for (const fileDirent of messageFiles) {
          try {
            const filePath = hz1(projectDir, fileDirent.name);
            // Delete the file if isBlobOrFileLikeObject'createInteractionAccessor older than the reference timestamp
            if (fsUtils.statSync(filePath).mtime < referenceTimestamp) {
              fsUtils.unlinkSync(filePath);
              result.messages++;
            }
          } catch {
            // Error deleting a file
            result.errors++;
            continue;
          }
        }

        try {
          // Remove the project directory if isBlobOrFileLikeObject'createInteractionAccessor now empty
          if (fsUtils.isDirEmptySync(projectDir)) {
            fsUtils.rmdirSync(projectDir);
          }
        } catch {
          // Error removing directory
          result.errors++;
        }
      } catch {
        // Error processing a project directory
        result.errors++;
        continue;
      }
    }
  } catch {
    // General error (e.g., reading the projects directory)
    result.errors++;
  }

  return result;
}

module.exports = removeOldJsonlMessagesFromProjectDirs;