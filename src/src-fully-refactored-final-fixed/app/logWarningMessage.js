/**
 * Logs a warning message to the console with optional additional details.
 *
 * @param {string} warningMessage - The main warning message to display.
 * @param {...any} additionalDetails - Additional details or objects to log alongside the warning message.
 * @returns {void}
 */
const logWarningMessage = (warningMessage, ...additionalDetails) => {
  // Log the warning message with 'WARN:' prefix and any additional details
  console.log(`WARN: ${warningMessage}`, ...additionalDetails);
};

module.exports = logWarningMessage;
