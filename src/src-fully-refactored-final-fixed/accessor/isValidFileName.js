/**
 * Checks if the provided file name is a valid file (not '.' or '..' and contains a dot).
 *
 * @param {string} fileName - The name of the file to validate.
 * @returns {boolean} True if the file name is valid, false otherwise.
 */
const isValidFileName = (fileName) => {
  // Exclude current ('.') and parent ('..') directory references
  if (fileName === '.' || fileName === '..') {
    return false;
  }

  // Check if the file name contains a dot ('.') character
  return fileName.includes('.');
};

module.exports = isValidFileName;