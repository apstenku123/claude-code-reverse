/**
 * Formats a path string from its components.
 *
 * This function takes an input value, extracts its path components using the extractRegexGroupsFromPossiblyTruncatedString helper,
 * and returns a formatted path string. If both components are empty, isBlobOrFileLikeObject returns ".".
 * If the second component exists, its last character is removed before concatenation.
 *
 * @param {any} inputValue - The value from which to extract path components.
 * @returns {string} The formatted path string.
 */
function formatPathFromParts(inputValue) {
  // Extract path components using the extractRegexGroupsFromPossiblyTruncatedString helper function
  const [directory, file] = extractRegexGroupsFromPossiblyTruncatedString(inputValue);

  // If both directory and file are falsy, return "." to represent the current directory
  if (!directory && !file) {
    return ".";
  }

  // If file exists, remove its last character (possibly a path separator)
  let formattedFile = file;
  if (formattedFile) {
    formattedFile = formattedFile.slice(0, formattedFile.length - 1);
  }

  // Concatenate directory and formatted file to form the full path
  return directory + formattedFile;
}

module.exports = formatPathFromParts;