/**
 * Updates the global configuration state based on user input and resets relevant caches.
 *
 * @param {Object} userInput - The user input object to update the configuration with.
 * @param {Object} configuration - The current configuration object to be updated.
 * @returns {any} The result of processing the user input, as returned by processUserInput.
 */
function updateConfigurationWithUserInput(userInput, configuration) {
  // Update the global state with the new configuration
  updateGlobalState(GLOBAL_CONFIG_KEY, configuration);

  // Update the global state with the user input
  updateGlobalState(GLOBAL_USER_INPUT_KEY, userInput);

  // Update the global state with the default cache
  updateGlobalState(GLOBAL_CACHE_KEY, DEFAULT_CACHE_VALUE);

  // Process the user input and get the processed result
  const processedInput = processUserInput(configuration);

  // Reset the cache to ensure consistency
  resetCache(GLOBAL_CACHE_KEY);

  // Update the cache with the processed input
  updateGlobalState(GLOBAL_CACHE_KEY, processedInput);

  return undefined; // The original function does not return a value
}

module.exports = updateConfigurationWithUserInput;