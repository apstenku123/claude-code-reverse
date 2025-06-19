/**
 * Returns a human-readable description for a given settings source key.
 *
 * @param {string} settingsSourceKey - The key identifying the source of the settings.
 * @returns {string|undefined} a human-readable description of the settings source, or undefined if the key is unrecognized.
 */
function getSettingsSourceDescription(settingsSourceKey) {
  switch (settingsSourceKey) {
    case "cliArg":
      return "CLI argument";
    case "localSettings":
      return "project local settings";
    case "projectSettings":
      return "project settings";
    case "policySettings":
      return "policy settings";
    case "userSettings":
      return "user settings";
    // No default: returns undefined for unrecognized keys
  }
}

module.exports = getSettingsSourceDescription;