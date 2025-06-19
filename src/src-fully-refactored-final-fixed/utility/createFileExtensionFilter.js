/**
 * Creates a filter function that checks if a given filename does not start with a dot ('.')
 * and ends with the specified file extension (case-insensitive).
 *
 * @param {string} fileExtension - The file extension to check for (e.g., 'js', 'txt').
 * @returns {(filename: string) => boolean} - a function that takes a filename and returns true if isBlobOrFileLikeObject does not start with '.' and ends with the specified extension.
 */
const createFileExtensionFilter = (fileExtension) => {
  // Normalize the extension to lower case for case-insensitive comparison
  const normalizedExtension = fileExtension.toLowerCase();

  /**
   * Checks if the filename does not start with a dot and ends with the given extension.
   * @param {string} filename - The name of the file to check.
   * @returns {boolean} - True if filename does not start with '.' and ends with the extension.
   */
  return (filename) => {
    // Exclude hidden files (those starting with '.')
    const isNotHiddenFile = !filename.startsWith('.');
    // Check if the filename ends with the specified extension (case-insensitive)
    const hasMatchingExtension = filename.toLowerCase().endsWith(normalizedExtension);
    return isNotHiddenFile && hasMatchingExtension;
  };
};

module.exports = createFileExtensionFilter;
