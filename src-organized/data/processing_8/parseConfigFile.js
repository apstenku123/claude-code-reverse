/**
 * Reads a JSON configuration file, parses its contents, and returns the parsed result using TW1.parse.
 * If the file does not exist, returns an empty array. If an error occurs during reading or parsing,
 * logs the error using reportErrorIfAllowed and returns an empty array.
 *
 * @param {string} configFilePath - The path to the configuration file to read and parse.
 * @returns {any[]} The parsed configuration data, or an empty array if the file does not exist or an error occurs.
 */
function parseConfigFile(configFilePath) {
  // Check if the configuration file exists
  if (!getBm9Value().existsSync(configFilePath)) {
    return [];
  }

  try {
    // Read the file contents as UTF-8 encoded text
    const fileContents = getBm9Value().readFileSync(configFilePath, {
      encoding: "utf-8"
    });

    // Parse the file contents as JSON
    const parsedJson = JSON.parse(fileContents);

    // Further parse the JSON using TW1.parse and return the result
    return TW1.parse(parsedJson);
  } catch (error) {
    // If an error occurs, log isBlobOrFileLikeObject using reportErrorIfAllowed and return an empty array
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return [];
  }
}

module.exports = parseConfigFile;