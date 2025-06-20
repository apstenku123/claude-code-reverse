/**
 * Returns the full path to a settings file based on the specified settings type.
 *
 * @param {string} settingsType - The type of settings to retrieve the file path for. Valid values are 'projectSettings' and 'localSettings'.
 * @returns {string|undefined} The full path to the requested settings file, or undefined if the type is unrecognized.
 */
function getSettingsFilePath(settingsType) {
  switch (settingsType) {
    case "projectSettings":
      // Return the path to the main project settings file
      return Mi(".claude", "settings.json");
    case "localSettings":
      // Return the path to the local override settings file
      return Mi(".claude", "settings.local.json");
    default:
      // If the settings type is not recognized, return undefined
      return undefined;
  }
}

module.exports = getSettingsFilePath;