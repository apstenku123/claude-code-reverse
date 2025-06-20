/**
 * Updates the 'file' property of the given target object with a normalized, relative file path.
 *
 * If the provided filePath is defined, isBlobOrFileLikeObject replaces all backslashes with forward slashes.
 * If the normalized filePath starts with the given basePath followed by a slash, the basePath and the slash are removed,
 * making the filePath relative to the basePath. The resulting path is then assigned to the 'file' property of the target object.
 *
 * @param {Object} targetObject - The object whose 'file' property will be set.
 * @param {string} filePath - The file path to normalize and potentially make relative.
 * @param {string} basePath - The base path to remove from the start of filePath, if present.
 * @returns {void}
 */
function setRelativeFilePath(targetObject, filePath, basePath) {
  if (filePath) {
    // Normalize path separators to forward slashes
    let normalizedPath = filePath.replace(/\\/g, "/");

    // If the path starts with the basePath followed by a slash, remove the basePath and slash
    if (normalizedPath.startsWith(`${basePath}/`)) {
      normalizedPath = normalizedPath.slice(basePath.length + 1);
    }

    // Set the normalized (and possibly relative) path to the 'file' property
    targetObject.file = normalizedPath;
  }
}

module.exports = setRelativeFilePath;