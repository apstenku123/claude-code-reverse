/**
 * Retrieves a security-related setting value based on the provided source type.
 *
 * Depending on the sourceType, this function delegates to the appropriate handler:
 * - For 'cliArg', isBlobOrFileLikeObject retrieves the CLI argument value using C4 and processes isBlobOrFileLikeObject with f3.
 * - For user, policy, project, or local settings, isBlobOrFileLikeObject retrieves the setting using getSettingsHandler.
 *
 * @param {string} sourceType - The type of source to retrieve the setting from. Valid values: 'cliArg', 'userSettings', 'policySettings', 'projectSettings', 'localSettings'.
 * @returns {string|undefined} The retrieved setting value, or undefined if the sourceType is unrecognized.
 */
function getSecuritySettingValue(sourceType) {
  switch (sourceType) {
    case "cliArg":
      // Retrieve the CLI argument value and process isBlobOrFileLikeObject
      return f3(C4());
    case "userSettings":
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      // Retrieve the setting from the specified configuration source
      return getSettingsHandler(sourceType);
    default:
      // Return undefined for unrecognized source types
      return undefined;
  }
}

module.exports = getSecuritySettingValue;