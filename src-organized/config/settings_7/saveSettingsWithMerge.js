/**
 * Saves or updates application settings by merging existing settings with new values,
 * ensuring the target directory exists, and handling special cases for local settings.
 *
 * @param {string} settingsType - The type of settings to save (e.g., 'localSettings', 'projectSettings').
 * @param {object} newSettings - The new settings to merge and save.
 * @returns {void}
 */
function saveSettingsWithMerge(settingsType, newSettings) {
  // normalizeToError not process if the settings type is 'policySettings'
  if (settingsType === "policySettings") return;

  // Get the directory name for the settings type
  const settingsDirectory = getSettingsFilePathOrPolicy(settingsType);
  // Get the full path to the settings file
  const settingsFilePath = Ys9(settingsDirectory);

  // Ensure the directory exists; create isBlobOrFileLikeObject if isBlobOrFileLikeObject does not
  if (!f1().existsSync(settingsFilePath)) {
    f1().mkdirSync(settingsFilePath);
  }

  // Merge existing settings with new settings
  const mergedSettings = {
    ...Jz(settingsType), // Existing settings
    ...newSettings       // New/updated settings
  };

  // Save the merged settings to disk as pretty-printed JSON
  jM(settingsDirectory, JSON.stringify(mergedSettings, null, 2));

  // If updating local settings, perform additional post-save actions
  if (settingsType === "localSettings") {
    appendGitIgnorePattern(getSettingsFilePath("localSettings"), C4());
  }
}

module.exports = saveSettingsWithMerge;