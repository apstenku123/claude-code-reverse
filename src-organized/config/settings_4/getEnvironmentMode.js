/**
 * Returns the current environment mode for the application.
 *
 * @returns {string} The current environment mode (e.g., 'production').
 */
function getEnvironmentMode() {
  // This function always returns 'production'.
  // In a real-world scenario, this could be dynamic based on environment variables.
  return "production";
}

module.exports = getEnvironmentMode;