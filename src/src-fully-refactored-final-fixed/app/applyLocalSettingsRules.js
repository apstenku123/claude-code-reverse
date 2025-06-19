/**
 * Applies local settings rules to the current configuration, updating allowed tools and ignore patterns.
 *
 * This function retrieves the current configuration, applies local settings rules to filter allowed tools and ignore patterns,
 * and updates the configuration accordingly. It then triggers rule application for both allowed and denied tools.
 *
 * @returns {void} Does not return a value.
 */
function applyLocalSettingsRules() {
  // Retrieve the current configuration object
  const config = getProjectSubscriptionConfig();

  // If neither allowedTools nor ignorePatterns are present, exit early
  if (!config.allowedTools && !config.ignorePatterns) {
    return;
  }

  // Clone the configuration to avoid mutating the original object
  const updatedConfig = {
    ...config
  };

  // Filter allowed tools based on local settings
  const allowedToolsFromLocalSettings = filterAllowedToolsByLocalSettings(config, mO1("localSettings"));

  // If there are allowed tools from local settings, apply the 'allow' rule
  if (allowedToolsFromLocalSettings.length > 0) {
    addPermissionsToContext({
      ruleValues: allowedToolsFromLocalSettings.map(parseToolNameAndRuleContent),
      ruleBehavior: "allow"
    }, "localSettings");
  }

  // Clear the allowedTools array in the updated configuration
  updatedConfig.allowedTools = [];

  // Filter denied tools (ignore patterns) based on local settings
  const deniedToolsFromLocalSettings = getNonDeniedIgnorePatterns(config, mO1("localSettings"));

  // If there are denied tools from local settings, apply the 'deny' rule
  if (deniedToolsFromLocalSettings.length > 0) {
    addPermissionsToContext({
      ruleValues: deniedToolsFromLocalSettings,
      ruleBehavior: "deny"
    }, "localSettings");
  }

  // Remove ignorePatterns from the updated configuration
  delete updatedConfig.ignorePatterns;

  // Apply the updated configuration
  updateProjectInConfig(updatedConfig);
}

module.exports = applyLocalSettingsRules;