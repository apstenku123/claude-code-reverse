/**
 * Determines if a given directory entry is a hidden entry (but not '.' or '..').
 *
 * In UNIX-like systems, hidden files and directories start with a dot ('.'),
 * but '.' and '..' are special entries representing the current and parent directory.
 * This function returns true only for entries that start with a dot and are not '.' or '..'.
 *
 * @param {string} entryName - The name of the directory entry to check.
 * @returns {boolean} True if the entry is a hidden file or directory (excluding '.' and '..'), false otherwise.
 */
const isHiddenDirectoryEntry = (entryName) => {
  // Exclude the special entries '.' (current directory) and '..' (parent directory)
  if (entryName === '.' || entryName === '..') {
    return false;
  }
  // Return true if the entry starts with a dot, indicating a hidden file or directory
  return entryName.startsWith('.');
};

module.exports = isHiddenDirectoryEntry;
