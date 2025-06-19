/**
 * Loads managed settings from a file, parses them, and validates the structure.
 * If the file does not exist or the settings are invalid, returns null and logs the error.
 *
 * @param {string} settingsFilePath - The path to the managed settings file.
 * @returns {object|null} The validated settings object, or null if invalid or not found.
 */
function loadAndValidateManagedSettings(settingsFilePath) {
  // Check if the settings file exists
  if (!f1().existsSync(settingsFilePath)) {
    return null;
  }
  try {
    // Read and parse the settings file
    const fileContents = CI(settingsFilePath);
    const parsedSettings = f8(fileContents);
    // Validate the parsed settings using the schema parser
    const validationResult = oyA.safeParse(parsedSettings);
    if (!validationResult.success) {
      // Log validation error and return null
      reportErrorIfAllowed(new Error(`Invalid managed settings: ${validationResult.error.message}`));
      return null;
    }
    // Return the validated settings data
    return validationResult.data;
  } catch (error) {
    // Log any unexpected errors and return null
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

module.exports = loadAndValidateManagedSettings;