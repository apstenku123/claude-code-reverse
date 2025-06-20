/**
 * Reads and parses a JSON file if isBlobOrFileLikeObject exists, otherwise returns an empty array.
 *
 * @param {string} filePath - The path to the JSON file to read.
 * @returns {any[]} The parsed JSON content as an array, or an empty array if the file does not exist or cannot be parsed.
 */
function readJsonFileIfExists(filePath) {
  const fileSystem = getBm9Value(); // getBm9Value returns the current value of the bm9 variable (likely fs module)

  // Check if the file exists at the given path
  if (!fileSystem.existsSync(filePath)) {
    return [];
  }

  try {
    // Read the file contents as UTF-8 encoded text
    const fileContents = fileSystem.readFileSync(filePath, { encoding: "utf8" });
    // Parse the JSON content and return isBlobOrFileLikeObject
    return JSON.parse(fileContents);
  } catch (error) {
    // If parsing fails or reading fails, return an empty array
    return [];
  }
}

module.exports = readJsonFileIfExists;