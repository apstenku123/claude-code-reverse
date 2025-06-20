/**
 * Reads a UTF-8 encoded file, parses each non-empty line as JSON, and returns an array of parsed objects.
 * If a line cannot be parsed as JSON, logs the error and skips that line.
 * If the file cannot be read, logs the error and returns an empty array.
 *
 * @param {string} filePath - The path to the file to read and parse.
 * @returns {Promise<Array<Object>>} - Promise resolving to an array of parsed JSON objects from each line.
 */
async function parseJsonLinesFromFile(filePath) {
  try {
    // Read the file contents as a UTF-8 string
    const fileContents = await ea9(filePath, "utf8");

    // If the file is empty or contains only whitespace, return an empty array
    if (!fileContents.trim()) {
      return [];
    }

    // Split the file into lines, filter out empty lines, and parse each line as JSON
    return fileContents
      .split('\n')
      .filter(line => line.trim()) // Remove empty or whitespace-only lines
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (parseError) {
          // Log parsing error and skip this line
          reportErrorIfAllowed(new Error(`Error parsing line in ${filePath}: ${parseError}`));
          return null;
        }
      })
      .filter(parsedObject => parsedObject !== null); // Remove lines that failed to parse
  } catch (readError) {
    // Log file read error and return an empty array
    reportErrorIfAllowed(new Error(`Error opening file ${filePath}: ${readError}`));
    return [];
  }
}

module.exports = parseJsonLinesFromFile;