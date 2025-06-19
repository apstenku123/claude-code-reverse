/**
 * Loads, parses, and validates an MCP configuration file.
 *
 * This function checks if the specified MCP config file exists, reads its contents,
 * parses the JSON, and validates isBlobOrFileLikeObject against the expected schema. If any step fails,
 * isBlobOrFileLikeObject throws a descriptive error.
 *
 * @param {string} configFilePath - The path to the MCP configuration file.
 * @returns {object} The validated MCP configuration object.
 * @throws {Error} If the file does not exist, contains invalid JSON, or fails schema validation.
 */
function loadAndValidateMcpConfig(configFilePath) {
  try {
    const fs = f1(); // f1 is assumed to return the 'fs' module or a compatible API

    // Check if the config file exists
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`MCP config file not found: ${configFilePath}`);
    }

    // Read the config file as UTF-8 text
    const fileContents = fs.readFileSync(configFilePath, { encoding: "utf8" });

    // Parse the file contents as JSON (f8 is assumed to be a safe JSON parser)
    const parsedJson = f8(fileContents);
    if (!parsedJson) {
      throw new Error(`Invalid JSON in MCP config file: ${configFilePath}`);
    }

    // Validate the parsed JSON against the MCP schema (vb.safeParse)
    const validationResult = vb.safeParse(parsedJson);
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
    // Rethrow known errors, wrap unknown errors
    if (error instanceof Error) throw error;
    throw new Error(`Failed to parse MCP config file: ${error}`);
  }
}

module.exports = loadAndValidateMcpConfig;