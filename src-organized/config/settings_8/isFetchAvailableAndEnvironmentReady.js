/**
 * Checks if the application environment is ready and if the Fetch API is available in the current window context.
 *
 * This function first verifies that the application environment is ready by calling the external function `isEnvironmentReady` (originally Q15).
 * It then checks if the Fetch API is available on the global `window` object.
 *
 * @returns {boolean} Returns true if the environment is ready and the Fetch API is available; otherwise, false.
 */
function isFetchAvailableAndEnvironmentReady() {
  // Check if the environment is ready (external function) and Fetch API exists in the window object
  return isEnvironmentReady() && !!window.fetch;
}

module.exports = isFetchAvailableAndEnvironmentReady;