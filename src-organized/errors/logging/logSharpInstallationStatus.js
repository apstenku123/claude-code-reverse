/**
 * Logs the status of the Sharp installation process.
 *
 * If the input is an Error instance, logs an error message to the console.
 * Otherwise, logs a standard informational message.
 *
 * @param {Error|string} installationStatus - The status of the Sharp installation. Can be an Error object or a status message string.
 * @returns {void}
 */
const logSharpInstallationStatus = (installationStatus) => {
  // Check if the installationStatus is an Error instance
  if (installationStatus instanceof Error) {
    // Log error message with details from the Error object
    console.error(`sharp: Installation error: ${installationStatus.message}`);
  } else {
    // Log informational message
    console.log(`sharp: ${installationStatus}`);
  }
};

module.exports = logSharpInstallationStatus;
