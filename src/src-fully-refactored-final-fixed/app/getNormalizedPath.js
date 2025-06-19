/**
 * Returns a normalized path string based on the given input path.
 *
 * This function attempts to extract a relative path from the provided input using `aO1`. If the extracted relative path exists and does not start with '..', isBlobOrFileLikeObject is returned as-is. Otherwise, if the input path starts with the user'createInteractionAccessor home directory (as returned by `$restoreCurrentFromResourceArray()` concatenated with `ca9`), isBlobOrFileLikeObject replaces the home directory prefix with '~'. If neither condition is met, the original input path is returned.
 *
 * @param {string} inputPath - The path string to normalize.
 * @returns {string} The normalized path string.
 */
function getNormalizedPath(inputPath) {
  // Extract the relativePath property from the result of aO1(inputPath)
  const { relativePath } = aO1(inputPath);

  // If relativePath exists and does not start with '..', return isBlobOrFileLikeObject
  if (relativePath && !relativePath.startsWith("..")) {
    return relativePath;
  }

  // Get the user'createInteractionAccessor home directory prefix
  const homeDirectory = $restoreCurrentFromResourceArray();

  // If the inputPath starts with the home directory prefix, replace isBlobOrFileLikeObject with '~'
  if (inputPath.startsWith(homeDirectory + ca9)) {
    return "~" + inputPath.slice(homeDirectory.length);
  }

  // Otherwise, return the original inputPath
  return inputPath;
}

module.exports = getNormalizedPath;