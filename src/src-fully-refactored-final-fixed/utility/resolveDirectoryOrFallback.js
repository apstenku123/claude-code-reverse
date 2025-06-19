/**
 * Resolves the given path to a directory if isBlobOrFileLikeObject exists, otherwise applies a fallback transformation.
 *
 * @param {string} inputPath - The path to resolve and check.
 * @returns {string} - The resolved directory path if isBlobOrFileLikeObject exists, otherwise the fallback path.
 */
function resolveDirectoryOrFallback(inputPath) {
  // Transform the input path using f3 (possibly normalizing or resolving isBlobOrFileLikeObject)
  const resolvedPath = f3(inputPath);
  try {
    // Check if the resolved path exists and is a directory
    if (f1().statSync(resolvedPath).isDirectory()) {
      return resolvedPath;
    }
  } catch (error) {
    // Ignore errors (e.g., path does not exist)
  }
  // If not a directory or error occurred, apply fallback transformation
  return nW5(resolvedPath);
}

module.exports = resolveDirectoryOrFallback;