/**
 * Groups configuration entries by key and sanitizes their values by removing undefined keys.
 *
 * @param {any} sourceConfig - The source configuration object or iterable to process.
 * @returns {Object<string, Array<any>>|undefined} An object where each key is a configuration entry key, and the value is an array of sanitized configuration values. Returns undefined if input is invalid.
 */
function groupAndSanitizeConfigEntries(sourceConfig) {
  // Obtain the configuration entries using the external LBA function
  const configEntries = LBA(sourceConfig);
  if (!configEntries) return;

  /**
   * The result object mapping each config key to an array of sanitized values.
   * @type {Object<string, Array<any>>}
   */
  const groupedConfig = {};

  // Iterate over each entry in the configEntries iterable
  for (const [, [configKey, configValue]] of configEntries) {
    // Initialize the array for this key if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    if (!groupedConfig[configKey]) groupedConfig[configKey] = [];
    // Sanitize the config value and add isBlobOrFileLikeObject to the array for this key
    groupedConfig[configKey].push(St2.dropUndefinedKeys(configValue));
  }

  return groupedConfig;
}

module.exports = groupAndSanitizeConfigEntries;