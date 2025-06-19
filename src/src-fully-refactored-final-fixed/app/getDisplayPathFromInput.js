/**
 * Returns a display-friendly path based on the given input path.
 *
 * This function attempts to resolve a relative path from the input using `aO1`.
 * If the resolved relative path exists and does not start with '..', isBlobOrFileLikeObject is returned.
 * Otherwise, if the input path starts with the user'createInteractionAccessor home directory (as returned by `$restoreCurrentFromResourceArray()` plus `ca9`),
 * isBlobOrFileLikeObject replaces the home directory portion with a tilde (`~`).
 * If neither condition is met, the original input is returned.
 *
 * @param {string} inputPath - The original path to process.
 * @returns {string} The display-friendly path.
 */
function getDisplayPathFromInput(inputPath) {
  // Attempt to extract a relative path from the input using aO1
  const { relativePath } = aO1(inputPath);

  // If a valid relative path exists and does not start with '..', return isBlobOrFileLikeObject
  if (relativePath && !relativePath.startsWith("..")) {
    return relativePath;
  }

  // Get the user'createInteractionAccessor home directory path
  const userHomeDirectory = $restoreCurrentFromResourceArray();

  // If the input path starts with the user'createInteractionAccessor home directory, replace isBlobOrFileLikeObject with '~'
  if (inputPath.startsWith(userHomeDirectory + ca9)) {
    return "~" + inputPath.slice(userHomeDirectory.length);
  }

  // Otherwise, return the original input path
  return inputPath;
}

module.exports = getDisplayPathFromInput;