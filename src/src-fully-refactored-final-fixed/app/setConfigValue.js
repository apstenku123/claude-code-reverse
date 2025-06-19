/**
 * Updates a configuration value, handling global and local scopes, type validation, and special cases for arrays and JSON objects.
 *
 * @param {string} configKey - The configuration key to set.
 * @param {any} configValue - The value to set for the configuration key.
 * @param {boolean} isGlobal - Whether to set the configuration globally.
 * @returns {void}
 */
function setConfigValue(configKey, configValue, isGlobal) {
  // Notify the system of the config set attempt
  logTelemetryEventIfEnabled("tengu_config_set", {
    key: configKey,
    global: isGlobal
  });

  if (isGlobal) {
    // Validate if the key is allowed to be set globally
    if (!Ry1(configKey)) {
      console.error(`Error: Cannot set '${configKey}'. Only these keys can be modified: ${pn.join(", ")}`);
      process.exit(1);
    }

    // Special validation for 'autoUpdaterStatus' key
    if (configKey === "autoUpdaterStatus" && !qS4(configValue)) {
      console.error("Error: Invalid value for autoUpdaterStatus. Must be one of: disabled, enabled, no_permissions, not_configured");
      process.exit(1);
    }

    // Handle observable object keys that expect a JSON object
    if (isObservableObjectInConfig(configKey, isGlobal) && typeof configValue === "string") {
      try {
        const parsedValue = JSON.parse(configValue);
        if (typeof parsedValue !== "object" || parsedValue === null || Array.isArray(parsedValue)) {
          console.error("Error: 'env' must be a valid JSON object");
          process.exit(1);
        }
        const currentConfig = getCachedOrFreshConfig();
        updateProjectsAccessor({
          ...currentConfig,
          [configKey]: parsedValue
        });
        process.exit(0);
      } catch (error) {
        console.error(`Error: Failed to parse JSON for 'env': ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    }

    // Handle array-type keys by splitting the string and using 'config add' logic
    if (isArrayPropertyInConfigOrHL(configKey, isGlobal) && typeof configValue === "string") {
      console.warn(FA.yellow(`Warning: '${configKey}' is an array type. Automatically using 'config add' instead of 'config set'.`));
      const arrayValues = configValue.split(",").map(item => item.trim()).filter(item => item.length > 0);
      addArrayConfigEntries(configKey, arrayValues, isGlobal);
      return;
    }

    // Default case: set the value in the global config
    const currentConfig = getCachedOrFreshConfig();
    updateProjectsAccessor({
      ...currentConfig,
      [configKey]: configValue
    });
  } else {
    // Validate if the key is allowed to be set locally
    if (!Oy1(configKey)) {
      console.error(`Error: Cannot set '${configKey}'. Only these keys can be modified: ${cn.join(", ")}. Did you mean --global?`);
      process.exit(1);
    }

    // Handle array-type keys by splitting the string and using 'config add' logic
    if (isArrayPropertyInConfigOrHL(configKey, isGlobal) && typeof configValue === "string") {
      console.warn(FA.yellow(`Warning: '${configKey}' is an array type. Automatically using 'config add' instead of 'config set'.`));
      const arrayValues = configValue.split(",").map(item => item.trim()).filter(item => item.length > 0);
      addArrayConfigEntries(configKey, arrayValues, isGlobal);
      return;
    }

    // Default case: set the value in the local config
    const currentConfig = getProjectSubscriptionConfig();
    updateProjectInConfig({
      ...currentConfig,
      [configKey]: configValue
    });
  }
  process.exit(0);
}

module.exports = setConfigValue;