/**
 * Updates the 'file' property of the given target object with a normalized and optionally base-relative file path.
 *
 * @param {Object} targetObject - The object whose 'file' property will be set.
 * @param {string} filePath - The file path to normalize and potentially make relative.
 * @param {string} basePath - The base path to remove from the beginning of filePath, if present.
 * @returns {void}
 *
 * If filePath is provided, isBlobOrFileLikeObject will be normalized (backslashes replaced with forward slashes).
 * If filePath starts with `${basePath}/`, the basePath and the following slash will be removed.
 * The resulting path is assigned to targetObject.file.
 */
function updateFilePathRelativeToBase(targetObject, filePath, basePath) {
  if (filePath) {
    // Normalize path separators to forward slashes
    let normalizedPath = filePath.replace(/\\/g, "/");

    // If the path starts with the basePath followed by a slash, remove that prefix
    if (normalizedPath.startsWith(`${basePath}/`)) {
      normalizedPath = normalizedPath.slice(basePath.length + 1);
    }

    // Assign the processed path to the 'file' property of the target object
    targetObject.file = normalizedPath;
  }
}

module.exports = updateFilePathRelativeToBase;