/**
 * Updates the 'file' property of the target object with a normalized file path,
 * removing a specified prefix if present.
 *
 * @param {Object} targetObject - The object whose 'file' property will be set.
 * @param {string} filePath - The file path to normalize and assign.
 * @param {string} prefix - The prefix to remove from the file path if present.
 * @returns {void}
 */
function setNormalizedFilePathIfPrefixed(targetObject, filePath, prefix) {
  if (filePath) {
    // Normalize backslashes to forward slashes
    let normalizedPath = filePath.replace(/\\/g, "/");

    // If the path starts with the given prefix followed by a slash, remove the prefix
    if (normalizedPath.startsWith(`${prefix}/`)) {
      normalizedPath = normalizedPath.slice(prefix.length + 1);
    }

    // Set the normalized (and possibly trimmed) path to the 'file' property
    targetObject.file = normalizedPath;
  }
}

module.exports = setNormalizedFilePathIfPrefixed;