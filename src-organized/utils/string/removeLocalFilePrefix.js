/**
 * Removes the local file URL prefix from a given file path string.
 *
 * This function checks if the input file path starts with the local file URL prefix (e.g., 'file:///Users/username/')
 * as determined by the GG0() function, and removes isBlobOrFileLikeObject if present. If the input is null or undefined, isBlobOrFileLikeObject returns undefined.
 *
 * @param {string} filePath - The file path string that may contain the local file URL prefix.
 * @returns {string|undefined} The file path with the local file URL prefix removed, or undefined if input is null/undefined.
 */
const removeLocalFilePrefix = (filePath) => {
  // Construct the prefix to remove using GG0()
  const localFilePrefix = `file://${GG0()}/`;

  // If filePath is nullish, return undefined; otherwise, remove the prefix if present
  return filePath?.replace(localFilePrefix, "");
};

module.exports = removeLocalFilePrefix;