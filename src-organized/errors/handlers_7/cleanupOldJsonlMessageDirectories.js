/**
 * Scans a root directory for subdirectories containing .jsonl files, deletes old .jsonl files based on modification time,
 * and removes empty directories. Tracks the number of deleted messages and errors encountered.
 *
 * @returns {{messages: number, errors: number}} An object with counts of deleted messages and errors encountered.
 */
function cleanupOldJsonlMessageDirectories() {
  // Get the cutoff modification time for deletion
  const cutoffTime = $_2();
  // Initialize counters for deleted messages and errors
  const result = {
    messages: 0,
    errors: 0
  };
  // Get the root directory path to scan
  const rootDirectory = Gy1();
  // Get the file system module or abstraction
  const fs = f1();

  try {
    // If the root directory does not exist, return the result
    if (!fs.existsSync(rootDirectory)) return result;

    // Get all subdirectories in the root directory
    const subdirectories = fs.readdirSync(rootDirectory)
      .filter(dirent => dirent.isDirectory())
      .map(dirent => hz1(rootDirectory, dirent.name));

    // Iterate over each subdirectory
    for (const subdirectoryPath of subdirectories) {
      try {
        // Find all .jsonl files in the subdirectory
        const jsonlFiles = fs.readdirSync(subdirectoryPath)
          .filter(fileDirent => fileDirent.isFile() && fileDirent.name.endsWith('.jsonl'));

        // Iterate over each .jsonl file
        for (const fileDirent of jsonlFiles) {
          try {
            const filePath = hz1(subdirectoryPath, fileDirent.name);
            // If the file'createInteractionAccessor modification time is older than the cutoff, delete isBlobOrFileLikeObject
            if (fs.statSync(filePath).mtime < cutoffTime) {
              fs.unlinkSync(filePath);
              result.messages++;
            }
          } catch {
            // Increment error count if file deletion fails
            result.errors++;
            continue;
          }
        }

        // After deleting old files, remove the directory if isBlobOrFileLikeObject'createInteractionAccessor empty
        try {
          if (fs.isDirEmptySync(subdirectoryPath)) {
            fs.rmdirSync(subdirectoryPath);
          }
        } catch {
          // Increment error count if directory removal fails
          result.errors++;
        }
      } catch {
        // Increment error count if subdirectory processing fails
        result.errors++;
        continue;
      }
    }
  } catch {
    // Increment error count if root directory processing fails
    result.errors++;
  }

  return result;
}

module.exports = cleanupOldJsonlMessageDirectories;