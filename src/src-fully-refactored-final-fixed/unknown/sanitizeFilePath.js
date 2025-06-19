/**
 * Removes all characters from the input string except for word characters, hyphens, dots, and forward slashes.
 * This is typically used to sanitize file paths or filenames by stripping out unwanted characters.
 *
 * @param {string} filePath - The input string representing a file path or filename to sanitize.
 * @returns {string} The sanitized string containing only allowed characters.
 */
function sanitizeFilePath(filePath) {
  // Replace any character that is not a word character, hyphen, dot, or forward slash with an empty string
  return filePath.replace(/[^\w\-.\/]+/gi, "");
}

module.exports = sanitizeFilePath;
