/**
 * Returns a settings option object based on the provided settings type.
 *
 * @param {string} settingsType - The type of settings ("localSettings", "projectSettings", or "userSettings").
 * @returns {{label: string, description: string, value: string}|undefined} An object describing the settings option, or undefined if the type is unrecognized.
 */
function createSettingsOption(settingsType) {
  switch (settingsType) {
    case "localSettings":
      return {
        label: "Project settings (local)",
        // Description includes the file path for local settings
        description: `Saved in ${getSettingsFilePath("localSettings")}`,
        value: settingsType
      };
    case "projectSettings":
      return {
        label: "Project settings",
        // Description includes the file path for project settings
        description: `Checked in at ${getSettingsFilePath("projectSettings")}`,
        value: settingsType
      };
    case "userSettings":
      return {
        label: "User settings",
        // Description is a static path for user settings
        description: "Saved in at ~/.claude/settings.json",
        value: settingsType
      };
    default:
      // Return undefined for unknown settings types
      return undefined;
  }
}

module.exports = createSettingsOption;