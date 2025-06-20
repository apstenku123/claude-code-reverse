/**
 * Applies console patch settings from the provided runtime object, if available.
 *
 * This function attempts to retrieve console patch settings from the given runtime object (isWildcardOrX),
 * processes them using the zipArraysWithPadding utility, and then applies the processed settings
 * using the pz1 function. If any step in this process fails (e.g., a method or value is missing),
 * the function exits early without making changes.
 *
 * @param {Object} runtime - The runtime object that may contain console patch settings.
 * @returns {void}
 */
function applyConsolePatchSettings(runtime) {
  // Check if the runtime object provides a method to get console patch settings
  if (typeof runtime.getConsolePatchSettings !== 'function') return;

  // Retrieve the console patch settings
  const consolePatchSettings = runtime.getConsolePatchSettings();
  if (consolePatchSettings == null) return;

  // Process the settings using zipArraysWithPadding
  const processedSettings = zipArraysWithPadding(consolePatchSettings);
  if (processedSettings == null) return;

  // Apply the processed settings
  pz1(processedSettings);
}

module.exports = applyConsolePatchSettings;