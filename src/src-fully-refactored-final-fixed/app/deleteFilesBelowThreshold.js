/**
 * Deletes files in a directory whose names, when processed by IU5, are below a given threshold.
 * Increments messages or errors counters based on the outcome and returns a summary object.
 *
 * @param {string} directoryPath - The path to the directory to process.
 * @param {number} threshold - The threshold value for file name comparison.
 * @param {boolean} incrementMessagesOnDelete - If true, increments messages on successful delete; otherwise, increments errors.
 * @returns {{ messages: number, errors: number }} Summary of deletions and errors encountered.
 */
function deleteFilesBelowThreshold(directoryPath, threshold, incrementMessagesOnDelete) {
  const result = {
    messages: 0,
    errors: 0
  };
  try {
    // Read all directory entries (files and folders)
    const directoryEntries = f1().readdirSync(directoryPath);
    for (const entry of directoryEntries) {
      try {
        // Check if the processed file name is below the threshold
        if (IU5(entry.name) < threshold) {
          // Delete the file
          f1().unlinkSync(hz1(directoryPath, entry.name));
          // Increment the appropriate counter based on the flag
          if (incrementMessagesOnDelete) {
            result.messages++;
          } else {
            result.errors++;
          }
        }
      } catch (fileError) {
        // Handle errors for individual file deletions
        reportErrorIfAllowed(fileError);
      }
    }
  } catch (dirError) {
    // Handle errors reading the directory, except for ENOENT (directory not found)
    if (dirError instanceof Error && "code" in dirError && dirError.code !== "ENOENT") {
      reportErrorIfAllowed(dirError);
    }
  }
  return result;
}

module.exports = deleteFilesBelowThreshold;