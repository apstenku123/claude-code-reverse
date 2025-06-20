/**
 * Warns the user if they attempt to add a deprecated configuration key via the CLI.
 *
 * If the provided configKey is either "allowedTools" or "ignorePatterns",
 * this function logs a warning message indicating that the configuration has been migrated
 * to settings.json and will be removed in a future version. It also provides an example
 * of how to add the rule in .claude/settings.json using the createPermissionsObject helper.
 *
 * @param {string} configKey - The configuration key being added (e.g., "allowedTools" or "ignorePatterns").
 * @param {any} configValue - The value associated with the configuration key.
 * @returns {void}
 */
function warnIfDeprecatedConfigKey(configKey, configValue) {
  // Only warn for deprecated keys
  if (configKey !== "allowedTools" && configKey !== "ignorePatterns") {
    return;
  }

  // Generate the migrated settings object using the helper function
  const migratedSettings = createPermissionsObject(configKey, configValue);

  // Log a warning message with migration instructions and example
  console.warn(
    `Warning: "claude config add ${configKey}" has been migrated to settings.json and will be removed in a future version.\n\n` +
    `Instead, add rules to .claude/settings.json:\n` +
    `${JSON.stringify(migratedSettings, null, 2)}\n` +
    `See https://docs.anthropic.com/en/docs/claude-code/settings for more information on settings.json.\n`
  );
}

module.exports = warnIfDeprecatedConfigKey;