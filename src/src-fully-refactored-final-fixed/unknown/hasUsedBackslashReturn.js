/**
 * Checks if the current configuration indicates that a backslash return has been used.
 *
 * This function retrieves the current configuration object (from cache or disk)
 * and returns a boolean indicating whether the 'hasUsedBackslashReturn' property is true.
 *
 * @returns {boolean} True if 'hasUsedBackslashReturn' is true in the configuration; otherwise, false.
 */
function hasUsedBackslashReturn() {
  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();
  // Check if the 'hasUsedBackslashReturn' flag is set to true
  return config.hasUsedBackslashReturn === true;
}

module.exports = hasUsedBackslashReturn;