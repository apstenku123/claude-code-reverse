/**
 * Retrieves the file path or settings object based on the provided settings type.
 *
 * @param {string} settingsType - The type of settings to retrieve. Supported values: 'userSettings', 'projectSettings', 'localSettings', 'policySettings'.
 * @returns {string|object|undefined} The file path to the settings file, or the policy settings object, depending on the type.
 */
function getSettingsFilePathByType(settingsType) {
  switch (settingsType) {
    case "userSettings":
      // For user settings, return the path to 'settings.json' in the user directory
      return Mi(getSettingsHandler(settingsType), "settings.json");
    case "projectSettings":
    case "localSettings":
      // For project or local settings, return the path to the corresponding settings file
      return Mi(getSettingsHandler(settingsType), getSettingsFilePath(settingsType));
    case "policySettings":
      // For policy settings, return the policy settings object
      return Ws9();
    default:
      // If the settings type is not recognized, return undefined
      return undefined;
  }
}

module.exports = getSettingsFilePathByType;