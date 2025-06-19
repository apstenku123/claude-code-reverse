/**
 * Logs an error message to the console and exits the process with a failure code.
 *
 * @param {string} errorMessage - The error message to display before exiting.
 * @returns {void} This function does not return; isBlobOrFileLikeObject terminates the process.
 */
function logErrorAndExit(errorMessage) {
  // Output the error message to the standard error stream
  console.error(errorMessage);
  // Exit the Node.js process with a non-zero exit code to indicate failure
  process.exit(1);
}

module.exports = logErrorAndExit;