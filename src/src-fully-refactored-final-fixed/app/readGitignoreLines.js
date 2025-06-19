/**
 * Reads the .gitignore file from the current working directory and returns its non-empty lines as an array.
 *
 * @returns {string[]} An array of non-empty lines from the .gitignore file. Returns an empty array if the file does not exist or an error occurs.
 */
function readGitignoreLines() {
  try {
    // Construct the full path to the .gitignore file in the current working directory
    const gitignorePath = zK5(iA(), ".gitignore");

    // Check if the .gitignore file exists
    if (!getBm9Value().existsSync(gitignorePath)) {
      return [];
    }

    // Read the file contents as UTF-8 and split into lines
    const fileContents = getBm9Value().readFileSync(gitignorePath, {
      encoding: "utf-8"
    });
    const lines = fileContents.split(/\r?\n/);

    // Filter out empty or whitespace-only lines
    const nonEmptyLines = lines.filter(line => line.trim());
    return nonEmptyLines;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return an empty array
    reportErrorIfAllowed(new Error(`Error reading .gitignore: ${error}`));
    return [];
  }
}

module.exports = readGitignoreLines;