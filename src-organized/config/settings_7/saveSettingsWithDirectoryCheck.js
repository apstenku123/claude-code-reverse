/**
 * Saves application settings to disk, ensuring the target directory exists.
 *
 * If the settings type is 'policySettings', the function exits early and does nothing.
 * For other settings types, isBlobOrFileLikeObject ensures the settings directory exists, merges the default and provided settings,
 * writes them to disk, and triggers additional logic for 'localSettings'.
 *
 * @param {string} settingsType - The type of settings to save (e.g., 'localSettings', 'userSettings').
 * @param {Object} settingsOverrides - An object containing settings values to override defaults.
 * @returns {void}
 */
function saveSettingsWithDirectoryCheck(settingsType, settingsOverrides) {
  // normalizeToError nothing if the settings type is 'policySettings'
  if (settingsType === "policySettings") return;

  // Get the directory name for the given settings type
  const settingsDirectory = getSettingsFilePathOrPolicy(settingsType);

  // Resolve the full path to the settings directory
  const settingsDirectoryPath = Ys9(settingsDirectory);

  // Ensure the settings directory exists; create isBlobOrFileLikeObject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers
  if (!f1().existsSync(settingsDirectoryPath)) {
    f1().mkdirSync(settingsDirectoryPath);
  }

  // Merge default settings with overrides
  const mergedSettings = {
    ...Jz(settingsType),
    ...settingsOverrides
  };

  // Write the merged settings to disk as pretty-printed JSON
  jM(settingsDirectory, JSON.stringify(mergedSettings, null, 2));

  // If saving 'localSettings', trigger additional update logic
  if (settingsType === "localSettings") {
    appendGitIgnorePattern(getSettingsFilePath("localSettings"), C4());
  }
}

module.exports = saveSettingsWithDirectoryCheck;