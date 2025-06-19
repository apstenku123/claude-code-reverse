/**
 * Determines if a given directory name represents a hidden directory, excluding the special entries '.' and '..'.
 *
 * In Unix-like systems, hidden directories start with a dot ('.'), but '.' and '..' are special entries representing the current and parent directories, respectively.
 * This function returns true only for hidden directories that are not these special entries.
 *
 * @param {string} directoryName - The name of the directory to check.
 * @returns {boolean} True if the directory is hidden (starts with a dot) and is not '.' or '..'; otherwise, false.
 */
const isHiddenNonSpecialDirectory = (directoryName) => {
  // Exclude the special entries '.' (current directory) and '..' (parent directory)
  if (directoryName === '.' || directoryName === '..') {
    return false;
  }
  // Check if the directory name starts with a dot, indicating a hidden directory
  return directoryName.startsWith('.');
};

module.exports = isHiddenNonSpecialDirectory;
