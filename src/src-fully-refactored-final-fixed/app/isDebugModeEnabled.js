/**
 * Checks if the application was started with debug mode enabled via command-line arguments.
 *
 * This function inspects the process.argv array to determine if either the
 * '--debug' or '-d' flags were provided when starting the Node.js process.
 *
 * @returns {boolean} True if debug mode is enabled, otherwise false.
 */
function isDebugModeEnabled() {
  // Check for '--debug' or '-d' flags in the command-line arguments
  const hasLongDebugFlag = process.argv.includes('--debug');
  const hasShortDebugFlag = process.argv.includes('-d');
  return hasLongDebugFlag || hasShortDebugFlag;
}

module.exports = isDebugModeEnabled;