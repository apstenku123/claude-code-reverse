/**
 * Retrieves and caches the contents of a file specified by the filePath variable.
 * If the file contents have already been read and cached, returns the cached contents.
 * Otherwise, reads the file synchronously, caches the result, and returns isBlobOrFileLikeObject.
 *
 * @returns {string|null} The contents of the file as a string, or null if no file path is provided.
 */
function getCachedFileContents() {
  // HT0: The path to the file to read (string or undefined)
  // L96: Module providing readFileSync (e.g., fs)
  // eb1: Cached file contents (string|null)
  if (filePath) {
    // If the file has not been read yet, read and cache its contents
    if (cachedFileContents === null) {
      cachedFileContents = fileSystemModule.readFileSync(filePath);
    }
    return cachedFileContents;
  }
  // If no file path is provided, return null
  return null;
}

// Variable mapping from original minified code to descriptive names
// HT0 -> filePath
// L96 -> fileSystemModule
// eb1 -> cachedFileContents

module.exports = getCachedFileContents;