/**
 * Retrieves security-related settings or arguments based on the provided source type.
 *
 * Depending on the sourceType, this function will either process CLI arguments or fetch
 * specific user, policy, project, or local settings.
 *
 * @param {string} sourceType - The type of settings or arguments to retrieve. Valid values:
 *   - "cliArg": Retrieves and processes command-line arguments.
 *   - "userSettings", "policySettings", "projectSettings", "localSettings":
 *     Retrieves the corresponding settings.
 * @returns {string|undefined} The requested settings or arguments as a string, or undefined if the sourceType is not recognized.
 */
function getSecuritySettings(sourceType) {
  switch (sourceType) {
    case "cliArg":
      // Fetch CLI arguments and process them
      return f3(C4());
    case "userSettings":
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      // Fetch the corresponding settings
      return getSettingsHandler(sourceType);
    default:
      // Return undefined for unrecognized source types
      return undefined;
  }
}

module.exports = getSecuritySettings;
