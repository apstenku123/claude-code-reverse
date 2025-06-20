/**
 * Removes all characters from the input string that are not valid for filenames.
 * Allowed characters are alphanumeric, underscore (_), hyphen (-), dot (.), and forward slash (/).
 *
 * @param {string} filename - The input string to sanitize for use as a filename.
 * @returns {string} The sanitized string containing only valid filename characters.
 */
function removeInvalidFilenameCharacters(filename) {
  // Replace any character that is not a word character, hyphen, dot, or slash with an empty string
  return filename.replace(/[^\w\-.\/]+/gi, "");
}

module.exports = removeInvalidFilenameCharacters;
