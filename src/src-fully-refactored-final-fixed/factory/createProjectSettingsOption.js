/**
 * Factory function that creates a settings option object for project, local, or user settings.
 *
 * @param {string} settingsType - The type of settings ('localSettings', 'projectSettings', or 'userSettings').
 * @returns {Object|undefined} An object containing label, description, and value for the settings option, or undefined if the type is unrecognized.
 */
function createProjectSettingsOption(settingsType) {
  switch (settingsType) {
    case "localSettings":
      return {
        label: "Project settings (local)",
        // Description includes the full path to the local settings file
        description: `Saved in ${getSettingsFilePath("localSettings")}`,
        value: settingsType
      };
    case "projectSettings":
      return {
        label: "Project settings",
        // Description includes the full path to the project settings file
        description: `Checked in at ${getSettingsFilePath("projectSettings")}`,
        value: settingsType
      };
    case "userSettings":
      return {
        label: "User settings",
        // User settings are always saved in the user'createInteractionAccessor home directory
        description: "Saved in at ~/.claude/settings.json",
        value: settingsType
      };
    default:
      // If the settingsType is not recognized, return undefined
      return undefined;
  }
}

module.exports = createProjectSettingsOption;