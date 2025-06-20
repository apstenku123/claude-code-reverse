/**
 * Logs a formatted error message to the console if error logging is enabled.
 *
 * @param {string} errorMessage - The error message to be logged. Leading and trailing whitespace will be trimmed.
 * @returns {void}
 */
function logErrorMessageIfEnabled(errorMessage) {
  // Check if error logging is enabled; if not, exit early
  if (!isErrorLoggingEnabled()) return;

  // Format the error message with ANSI 256 coloring and dim styling
  const formattedErrorMessage = ansiColorFormatter.ansi256(getColorScheme().error).dim(`[ERROR] ${errorMessage.trim()}`);

  // Output the formatted error message to the console
  console.error(formattedErrorMessage);
}

module.exports = logErrorMessageIfEnabled;