/**
 * Cleans up old message files in the Claude projects directory.
 *
 * This function scans the projects directory for subdirectories, then for each subdirectory,
 * isBlobOrFileLikeObject finds all '.jsonl' message files. If a message file'createInteractionAccessor modification time is older than
 * a certain threshold (obtained from $_2), isBlobOrFileLikeObject deletes the file. If a subdirectory becomes empty
 * after file deletions, isBlobOrFileLikeObject removes the subdirectory as well. The function tracks the number of
 * messages deleted and errors encountered during the process.
 *
 * @returns {{ messages: number, errors: number }}
 *   An object containing the count of deleted messages and errors encountered.
 */
function cleanUpOldProjectMessages() {
  // Get the cutoff modification time for deleting files
  const cutoffTime = $_2();

  // Initialize result counters
  const result = {
    messages: 0,
    errors: 0
  };

  // Get the path to the projects directory
  const projectsDirectory = getClaudeProjectsDirectory();

  // Get the file system accessor
  const fileSystem = getBm9Value();

  try {
    // If the projects directory does not exist, return the result
    if (!fileSystem.existsSync(projectsDirectory)) {
      return result;
    }

    // Get all subdirectories in the projects directory
    const projectSubdirectories = fileSystem
      .readdirSync(projectsDirectory)
      .filter(dirent => dirent.isDirectory())
      .map(dirent => hz1(projectsDirectory, dirent.name));

    // Iterate over each project subdirectory
    for (const subdirectoryPath of projectSubdirectories) {
      try {
        // Find all '.jsonl' files in the subdirectory
        const messageFiles = fileSystem
          .readdirSync(subdirectoryPath)
          .filter(fileDirent => fileDirent.isFile() && fileDirent.name.endsWith('.jsonl'));

        // Iterate over each message file
        for (const fileDirent of messageFiles) {
          try {
            const messageFilePath = hz1(subdirectoryPath, fileDirent.name);
            // If the file is older than the cutoff time, delete isBlobOrFileLikeObject
            if (fileSystem.statSync(messageFilePath).mtime < cutoffTime) {
              fileSystem.unlinkSync(messageFilePath);
              result.messages++;
            }
          } catch {
            // Increment error count and continue with next file
            result.errors++;
            continue;
          }
        }

        // After deleting files, remove the subdirectory if isBlobOrFileLikeObject is empty
        try {
          if (fileSystem.isDirEmptySync(subdirectoryPath)) {
            fileSystem.rmdirSync(subdirectoryPath);
          }
        } catch {
          // Increment error count if unable to remove directory
          result.errors++;
        }
      } catch {
        // Increment error count and continue with next subdirectory
        result.errors++;
        continue;
      }
    }
  } catch {
    // Increment error count for any unexpected errors
    result.errors++;
  }

  return result;
}

module.exports = cleanUpOldProjectMessages;