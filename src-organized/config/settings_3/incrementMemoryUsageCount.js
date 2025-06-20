/**
 * Increments the memory usage count in the current configuration object and updates the accessor.
 *
 * Retrieves the current configuration (from cache or fresh), increments its `memoryUsageCount` property by 1,
 * and updates the configuration using the accessor update function. This is useful for tracking how many times
 * memory usage has been checked or updated in the application lifecycle.
 *
 * @returns {void} This function does not return a value.
 */
function incrementMemoryUsageCount() {
  // Retrieve the current configuration object (from cache or fresh)
  const currentConfig = getCachedOrFreshConfig();

  // Increment the memory usage count, defaulting to 0 if not present
  const updatedMemoryUsageCount = (currentConfig.memoryUsageCount || 0) + 1;

  // Update the configuration with the new memory usage count
  updateProjectsAccessor({
    ...currentConfig,
    memoryUsageCount: updatedMemoryUsageCount
  });
}

module.exports = incrementMemoryUsageCount;