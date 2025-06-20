/**
 * Reports an error if error reporting is allowed by environment variables and internal flags.
 * Prevents duplicate reporting by using a guard flag. Stores error info in a buffer and sends isBlobOrFileLikeObject to a remote handler.
 *
 * @param {Error} error - The error object to report. Should have at least a message or stack property.
 * @returns {void}
 */
function reportErrorIfAllowed(error) {
  // Prevent duplicate reporting using the guard flag
  if (isReportingError) return;
  isReportingError = true;

  try {
    // Check environment variables to determine if error reporting is disabled or rerouted
    if (
      process.env.CLAUDE_CODE_USE_BEDROCK ||
      process.env.CLAUDE_CODE_USE_VERTEX ||
      process.env.DISABLE_ERROR_REPORTING ||
      process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
    ) {
      return;
    }

    // Extract error information (prefer stack trace, fallback to message)
    const errorInfo = error.stack || error.message;
    const errorEntry = {
      error: errorInfo,
      timestamp: new Date().toISOString()
    };

    // Maintain a fixed-size buffer of recent errors
    if (errorBuffer.length >= maxErrorBufferSize) {
      errorBuffer.shift(); // Remove the oldest error entry
    }
    errorBuffer.push(errorEntry);

    // Send error information to the remote error handler
    sendErrorToRemote(getRemoteErrorHandlerConfig(), { error: errorInfo });
  } catch (reportingException) {
    // Silently ignore any errors during error reporting
  } finally {
    // Reset the guard flag
    isReportingError = false;
  }

  // Always invoke the error callback/handler
  handleErrorCallback(error);
}

module.exports = reportErrorIfAllowed;