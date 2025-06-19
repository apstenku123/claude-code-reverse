/**
 * Reads the contents of a file if isBlobOrFileLikeObject exists, using UTF-8 encoding.
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {string} The contents of the file as a string, or an empty string if the file does not exist.
 */
function readFileIfExists(filePath) {
  // Retrieve the file system module or object from getBm9Value (aliased as f1)
  const fileSystem = getBm9Value();

  // Check if the file exists at the given path
  if (!fileSystem.existsSync(filePath)) {
    return "";
  }

  // Read and return the file contents as a UTF-8 encoded string
  return fileSystem.readFileSync(filePath, {
    encoding: "utf-8"
  });
}

module.exports = readFileIfExists;