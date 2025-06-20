/**
 * Attempts to initialize the console patch if the required settings and dependencies are available on the provided runtime object.
 *
 * @param {Object} runtime - The runtime object that may contain the console patch settings method.
 * @returns {void}
 */
function initializeConsolePatchIfAvailable(runtime) {
  // Check if the runtime provides the method to get console patch settings
  if (typeof runtime.getConsolePatchSettings !== 'function') return;

  // Retrieve the console patch settings
  const consolePatchSettings = runtime.getConsolePatchSettings();
  if (consolePatchSettings == null) return;

  // Transpose (zip) the settings arrays for further processing
  const transposedSettings = getTransposedArrays(consolePatchSettings);
  if (transposedSettings == null) return;

  // Initialize the console patch with the processed settings
  initializeConsolePatch(transposedSettings);
}

module.exports = initializeConsolePatchIfAvailable;