/**
 * Ensures the configuration object has the 'hasUsedBackslashReturn' flag set to true.
 * If the flag is not set, updates the configuration accordingly.
 *
 * @returns {void} This function does not return a value.
 */
function ensureBackslashReturnFlagSet() {
  // Retrieve the current configuration (from cache or disk)
  const config = getCachedOrFreshConfig();

  // If the 'hasUsedBackslashReturn' flag is not set, update the configuration
  if (!config.hasUsedBackslashReturn) {
    updateProjectsAccessor({
      ...config,
      hasUsedBackslashReturn: true
    });
  }
}

module.exports = ensureBackslashReturnFlagSet;