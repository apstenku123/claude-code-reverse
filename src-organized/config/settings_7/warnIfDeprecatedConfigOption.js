/**
 * Warns the user if they attempt to add a deprecated configuration option via the CLI.
 *
 * This function checks if the provided configuration key is either 'allowedTools' or 'ignorePatterns'.
 * If so, isBlobOrFileLikeObject warns the user that this option has been migrated to settings.json and provides guidance
 * on how to update their configuration accordingly.
 *
 * @param {string} configKey - The configuration key being added (e.g., 'allowedTools', 'ignorePatterns').
 * @param {any} configValue - The value associated with the configuration key.
 * @returns {void}
 */
function warnIfDeprecatedConfigOption(configKey, configValue) {
  // Only warn if the configKey is one of the deprecated options
  if (configKey !== "allowedTools" && configKey !== "ignorePatterns") {
    return;
  }

  // Construct a helpful warning message for the user
  console.warn(
    `Warning: "claude config add ${configKey}" has been migrated to settings.json and will be removed in a future version.

Instead, add rules to .claude/settings.json:
${JSON.stringify(createPermissionsObject(configKey, configValue), null, 2)}
See https://docs.anthropic.com/en/docs/claude-code/settings for more information on settings.json.
`
  );
}

module.exports = warnIfDeprecatedConfigOption;