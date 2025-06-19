/**
 * Attempts to open the provided URL or file path using the system'createInteractionAccessor default browser or application.
 * Determines the appropriate command based on the operating system or the BROWSER environment variable.
 * Returns true if the command executed successfully, false otherwise.
 *
 * @param {string} targetPathOrUrl - The URL or file path to open.
 * @returns {Promise<boolean>} - Resolves to true if the open command succeeded, false otherwise.
 */
async function openUrlWithDefaultBrowser(targetPathOrUrl) {
  // Determine the command to use for opening the URL/file
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
    // i0 is assumed to be a function that executes the command and returns an object with a 'code' property
    const { code: exitCode } = await i0(openCommand, [targetPathOrUrl]);
    // Return true if the command exited with code 0 (success)
    return exitCode === 0;
  } catch (error) {
    // If an error occurs, return false
    return false;
  }
}

module.exports = openUrlWithDefaultBrowser;