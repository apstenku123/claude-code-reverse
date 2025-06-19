/**
 * Retrieves the appropriate settings file path or configuration object based on the provided settings type.
 *
 * @param {string} settingsType - The type of settings to retrieve. Valid values are:
 *   - 'userSettings': Returns the path to the user'createInteractionAccessor settings.json file.
 *   - 'projectSettings' or 'localSettings': Returns the path to the corresponding settings file for the project or local scope.
 *   - 'policySettings': Returns the managed settings configuration object.
 * @returns {string|object|undefined} The path to the settings file as a string, the managed settings configuration object, or undefined if the type is unrecognized.
 */
function getSettingsFileOrConfig(settingsType) {
  switch (settingsType) {
    case "userSettings":
      // Returns the path to the user'createInteractionAccessor settings.json file
      return Mi(getSettingsHandler(settingsType), "settings.json");
    case "projectSettings":
    case "localSettings":
      // Returns the path to the project or local settings file
      return Mi(getSettingsHandler(settingsType), getSettingsFilePath(settingsType));
    case "policySettings":
      // Returns the managed settings configuration object
      return getManagedSettingsConfig();
    default:
      // If the settings type is not recognized, return undefined
      return undefined;
  }
}

module.exports = getSettingsFileOrConfig;