/**
 * Parses and validates an MCP configuration file.
 *
 * This function checks for the existence of the specified MCP config file, reads its contents,
 * parses isBlobOrFileLikeObject as JSON, validates isBlobOrFileLikeObject against a schema, and returns the validated configuration object.
 * Throws descriptive errors if the file is missing, contains invalid JSON, or fails schema validation.
 *
 * @param {string} configFilePath - The absolute or relative path to the MCP configuration file.
 * @returns {object} The validated MCP configuration object.
 * @throws {Error} If the file does not exist, contains invalid JSON, or fails schema validation.
 */
function parseMcpConfigFile(configFilePath) {
  try {
    const fs = f1(); // f1 returns the fs module or a compatible interface

    // Check if the config file exists
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`MCP config file not found: ${configFilePath}`);
    }

    // Read the config file as UTF-8 text
    const configFileContents = fs.readFileSync(configFilePath, { encoding: "utf8" });

    // Parse the file contents as JSON (f8 is a safe JSON parser)
    const parsedConfig = f8(configFileContents);
    if (!parsedConfig) {
      throw new Error(`Invalid JSON in MCP config file: ${configFilePath}`);
    }

    // Validate the parsed config against the schema using vb.safeParse
    const validationResult = vb.safeParse(parsedConfig);
    if (!validationResult.success) {
      // Collect all validation errors into a single string
      const errorMessages = validationResult.error.errors
        .map(error => `${error.path.join('.')}: ${error.message}`)
        .join(', ');
      throw new Error(`Invalid MCP configuration in ${configFilePath}: ${errorMessages}`);
    }

    // Return the validated configuration data
    return validationResult.data;
  } catch (error) {
    // Rethrow if isBlobOrFileLikeObject'createInteractionAccessor already an Error, otherwise wrap in a new Error
    if (error instanceof Error) throw error;
    throw new Error(`Failed to parse MCP config file: ${error}`);
  }
}

module.exports = parseMcpConfigFile;