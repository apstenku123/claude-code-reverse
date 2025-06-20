/**
 * Logs a message related to the Sharp installation process.
 * If the input is an Error, logs an installation error message to the console as an error.
 * Otherwise, logs a standard informational message to the console.
 *
 * @param {Error|string} installationMessage - The error object or informational message to log.
 * @returns {void} This function does not return a value.
 */
const logSharpInstallationMessage = (installationMessage) => {
  // Check if the provided message is an Error instance
  if (installationMessage instanceof Error) {
    // Log the error message to the console as an error
    console.error(`sharp: Installation error: ${installationMessage.message}`);
  } else {
    // Log the informational message to the console
    console.log(`sharp: ${installationMessage}`);
  }
};

module.exports = logSharpInstallationMessage;
