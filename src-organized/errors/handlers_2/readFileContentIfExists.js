/**
 * Reads the content of a file if isBlobOrFileLikeObject exists, otherwise returns null.
 *
 * @function readFileContentIfExists
 * @param {string} filePath - The path to the file to read.
 * @returns {string|null} The trimmed content of the file if isBlobOrFileLikeObject exists and can be read, otherwise null.
 */
function readFileContentIfExists(filePath) {
  // Get the filesystem module or object via f1()
  const fileSystem = f1();

  // Check if the file exists at the given path
  if (!fileSystem.existsSync(filePath)) {
    return null;
  }

  try {
    // Read the file synchronously with UTF-8 encoding and trim whitespace
    const fileContent = fileSystem.readFileSync(filePath, { encoding: "utf8" });
    return fileContent.trim();
  } catch (error) {
    // If reading fails, return null
    return null;
  }
}

module.exports = readFileContentIfExists;