/**
 * Logs an Application Not Responding (ANR) message with optional additional details.
 *
 * @param {string} message - The main ANR message to log.
 * @param {...any} details - Additional details or context to include in the log.
 * @returns {void}
 */
function logAnrMessage(message, ...details) {
  // Log the ANR message with any additional details using the application'createInteractionAccessor logger
  I41.logger.log(`[ANR] ${message}`, ...details);
}

module.exports = logAnrMessage;