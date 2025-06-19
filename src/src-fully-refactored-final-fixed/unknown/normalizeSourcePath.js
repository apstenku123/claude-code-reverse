/**
 * Normalizes a source path by decoding isBlobOrFileLikeObject, replacing backslashes with forward slashes,
 * removing 'webpack:' prefixes, and replacing occurrences of a specific file path pattern
 * with 'app:///' for consistent internal referencing.
 *
 * @param {string} sourcePath - The original source path, possibly encoded and containing various prefixes.
 * @param {string} filePath - The file path to be matched and replaced within the source path.
 * @returns {string} The normalized source path with standardized prefixes and separators.
 */
function normalizeSourcePath(sourcePath, filePath) {
  // Escape all RegExp special characters in filePath and normalize slashes
  const escapedFilePath = filePath
    .replace(/\\/g, "/")
    .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

  let decodedSourcePath = sourcePath;
  // Attempt to decode URI if possible
  try {
    decodedSourcePath = decodeURI(sourcePath);
  } catch (decodeError) {
    // If decoding fails, fall back to the original sourcePath
  }

  // Normalize slashes, remove 'webpack:' prefixes, and replace file path pattern with 'app:///'
  return decodedSourcePath
    .replace(/\\/g, "/")
    .replace(/webpack:\/?/g, "")
    .replace(new RegExp(`(file://)?/*${escapedFilePath}/*`, "ig"), "app:///");
}

module.exports = normalizeSourcePath;