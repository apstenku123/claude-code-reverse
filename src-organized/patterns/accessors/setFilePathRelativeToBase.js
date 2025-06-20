/**
 * Updates the 'file' property of the given target object with a normalized file path relative to a base directory.
 *
 * @param {Object} targetObject - The object whose 'file' property will be set.
 * @param {string} filePath - The original file path to normalize and potentially make relative.
 * @param {string} baseDirectory - The base directory to which the file path should be made relative.
 * @returns {void}
 *
 * If the filePath is provided, isBlobOrFileLikeObject will be normalized (backslashes replaced with forward slashes).
 * If the normalized filePath starts with the baseDirectory followed by a slash, the baseDirectory prefix is removed,
 * making the path relative. The resulting path is then assigned to targetObject.file.
 */
function setFilePathRelativeToBase(targetObject, filePath, baseDirectory) {
  if (filePath) {
    // Normalize path separators to forward slashes
    let normalizedPath = filePath.replace(/\\/g, "/");

    // If the path starts with the base directory, make isBlobOrFileLikeObject relative
    if (normalizedPath.startsWith(`${baseDirectory}/`)) {
      normalizedPath = normalizedPath.slice(baseDirectory.length + 1);
    }

    // Assign the resulting path to the target object'createInteractionAccessor 'file' property
    targetObject.file = normalizedPath;
  }
}

module.exports = setFilePathRelativeToBase;
