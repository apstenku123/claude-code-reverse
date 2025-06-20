/**
 * Searches a directory (derived from the given entry name) for a file or directory
 * whose normalized name matches the normalized form of the input entry, and whose
 * resolved path does not match the input entry. Returns the name of the first such match found.
 *
 * @param {string} entryName - The name of the entry to match against directory contents.
 * @returns {string|undefined} The name of the matching entry, or undefined if none found or on error.
 */
function findMatchingEntryName(entryName) {
  const fsModule = f1(); // Get the filesystem module or abstraction
  try {
    const directoryPath = ExA(entryName); // Resolve the directory path from the entry name
    const normalizedInputName = lO1(entryName, iO1(entryName)); // Normalize the input entry name

    // If the directory does not exist, return undefined
    if (!fsModule.existsSync(directoryPath)) return;

    // Read directory contents and filter for matching entries
    const matchingEntry = fsModule.readdirSync(directoryPath)
      .filter(dirEntry => {
        // Normalize the directory entry name
        const normalizedDirEntryName = lO1(dirEntry.name, iO1(dirEntry.name));
        // Check if normalized names match and the resolved path is not the same as the input
        return (
          normalizedDirEntryName === normalizedInputName &&
          Jv(directoryPath, dirEntry.name) !== entryName
        );
      })[0];

    // If a matching entry is found, return its name
    if (matchingEntry) return matchingEntry.name;
    return;
  } catch (error) {
    reportErrorIfAllowed(error); // Handle/log the error
    return;
  }
}

module.exports = findMatchingEntryName;