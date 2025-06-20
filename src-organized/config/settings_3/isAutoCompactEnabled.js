/**
 * Checks if the auto-compact feature is enabled in the current configuration.
 *
 * This function retrieves the latest configuration object (from cache or disk)
 * and returns the value of the 'autoCompactEnabled' property.
 *
 * @returns {boolean} True if auto-compact is enabled; otherwise, false.
 */
function isAutoCompactEnabled() {
  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();
  // Return the status of the auto-compact feature
  return config.autoCompactEnabled;
}

module.exports = isAutoCompactEnabled;