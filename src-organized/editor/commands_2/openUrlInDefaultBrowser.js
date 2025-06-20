/**
 * Opens the specified URL or file in the user'createInteractionAccessor default browser or associated application.
 *
 * Determines the appropriate command to use based on the operating system or the BROWSER environment variable.
 * Executes the command and returns true if successful, false otherwise.
 *
 * @param {string} targetPathOrUrl - The URL or file path to open.
 * @returns {Promise<boolean>} - Resolves to true if the command executed successfully, false otherwise.
 */
async function openUrlInDefaultBrowser(targetPathOrUrl) {
  // Determine the browser command to use
  const browserEnv = process.env.BROWSER;
  const platform = process.platform;

  // Use BROWSER env if set, otherwise pick based on OS
  const openCommand = browserEnv
    ? browserEnv
    : platform === "win32"
      ? "start"
      : platform === "darwin"
        ? "open"
        : "xdg-open";

  try {
    // i0 is assumed to be a function that executes a command and returns a promise with a 'code' property
    const { code: exitCode } = await i0(openCommand, [targetPathOrUrl]);
    // Return true if the command exited successfully
    return exitCode === 0;
  } catch (error) {
    // If an error occurred, return false
    return false;
  }
}

module.exports = openUrlInDefaultBrowser;