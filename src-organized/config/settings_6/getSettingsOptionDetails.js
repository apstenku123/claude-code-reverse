/**
 * Returns detailed information for a given settings option type.
 *
 * Depending on the provided settings type, this factory function returns an object
 * containing a label, description, and value for that settings option. Used to populate
 * UI dropdowns or similar controls with human-readable settings information.
 *
 * @param {string} settingsType - The type of settings option. Accepted values are:
 *   - "localSettings"
 *   - "projectSettings"
 *   - "userSettings"
 * @returns {{label: string, description: string, value: string}|undefined} An object containing label, description, and value for the settings option, or undefined if the type is unrecognized.
 */
function getSettingsOptionDetails(settingsType) {
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
        // Description is a static path for user settings
        description: "Saved in at ~/.claude/settings.json",
        value: settingsType
      };
    default:
      // If an unknown settings type is provided, return undefined
      return undefined;
  }
}

module.exports = getSettingsOptionDetails;