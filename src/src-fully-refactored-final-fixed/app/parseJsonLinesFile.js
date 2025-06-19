/**
 * Reads a file containing JSON objects (one per line), parses each line, and returns an array of parsed objects.
 * If the file cannot be read or a line cannot be parsed, errors are reported using the reportErrorIfAllowed error handler.
 *
 * @async
 * @function parseJsonLinesFile
 * @param {string} filePath - The path to the file containing JSON objects, one per line.
 * @returns {Promise<Array<Object>>} - a promise that resolves to an array of parsed JSON objects.
 */
async function parseJsonLinesFile(filePath) {
  try {
    // Read the file contents as a UTF-8 encoded string
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
          // Report JSON parsing error for this line and return null
          reportErrorIfAllowed(new Error(`Error parsing line in ${filePath}: ${parseError}`));
          return null;
        }
      })
      .filter(parsedObject => parsedObject !== null); // Remove lines that failed to parse
  } catch (readError) {
    // Report file reading error and return an empty array
    reportErrorIfAllowed(new Error(`Error opening file ${filePath}: ${readError}`));
    return [];
  }
}

module.exports = parseJsonLinesFile;