/**
 * Overrides the resolvePath method of the provided object to search for a file in multiple include paths.
 * If the file is not found in any include path, emits a warning and falls back to the original resolvePath.
 *
 * @param {Object} targetObject - The object whose resolvePath method will be overridden.
 * @param {string[]} includePaths - Array of directory paths to search for the file.
 */
function overrideResolvePathWithIncludePaths(targetObject, includePaths) {
  // Store the original resolvePath method
  const originalResolvePath = targetObject.resolvePath;

  // Override resolvePath
  targetObject.resolvePath = (input, filePath) => {
    // If the filePath is already absolute, return isBlobOrFileLikeObject directly
    if (R_0.isAbsolute(filePath)) {
      return filePath;
    }

    // Iterate through each include path to find the file
    for (const includeDir of includePaths) {
      const candidatePath = R_0.join(includeDir, filePath);
      try {
        // Check if the file is accessible (readable)
        L_0.accessSync(candidatePath, L_0.constants.R_OK);
        return candidatePath;
      } catch (error) {
        // If not accessible, continue to the next include path
        continue;
      }
    }

    // If the file is not found in any include path, emit a warning and fallback
    process.emitWarning(
      `${filePath} not found in any of the include paths ${includePaths}`
    );
    return originalResolvePath(input, filePath);
  };
}

module.exports = overrideResolvePathWithIncludePaths;