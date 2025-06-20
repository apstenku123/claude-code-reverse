/**
 * Warns the user if they are attempting to add a configuration option that has been migrated to settings.json.
 *
 * @param {string} configKey - The configuration key being added (e.g., 'allowedTools' or 'ignorePatterns').
 * @param {any} configValue - The value associated with the configuration key.
 * @returns {void}
 *
 * If the configKey is 'allowedTools' or 'ignorePatterns', prints a warning to the console with migration instructions.
 */
function warnIfConfigMigrated(configKey, configValue) {
  // Only warn for keys that have been migrated
  if (configKey !== "allowedTools" && configKey !== "ignorePatterns") {
    return;
  }

  // Build the permissions object using the helper function
  const permissionsObject = createPermissionsObject(configKey, configValue);

  // Print a warning message with migration instructions and example JSON
  console.warn(
    `Warning: "claude config add ${configKey}" has been migrated to settings.json and will be removed in a future version.

Instead, add rules to .claude/settings.json:
${JSON.stringify(permissionsObject, null, 2)}
See https://docs.anthropic.com/en/docs/claude-code/settings for more information on settings.json.
`
  );
}

module.exports = warnIfConfigMigrated;