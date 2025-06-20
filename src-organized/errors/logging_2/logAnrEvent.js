/**
 * Logs an Application Not Responding (ANR) event message with optional additional arguments.
 *
 * This function is a wrapper around the logger'createInteractionAccessor log method, prefixing the message with '[ANR]'.
 *
 * @param {string} message - The main message to log, describing the ANR event.
 * @param {...any} additionalArguments - Additional arguments to include in the log output.
 * @returns {void}
 */
function logAnrEvent(message, ...additionalArguments) {
  // Prefix the log message with '[ANR]' and pass all arguments to the logger
  I41.logger.log(`[ANR] ${message}`, ...additionalArguments);
}

module.exports = logAnrEvent;