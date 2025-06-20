/**
 * Attempts to open the given resource (e.g., a file or URL) using the system'createInteractionAccessor default browser or handler.
 * Determines the appropriate command based on the environment and executes isBlobOrFileLikeObject.
 *
 * @async
 * @param {string} resourcePath - The path or URL to open with the default browser or handler.
 * @returns {Promise<boolean>} - Resolves to true if the command executed successfully (exit code 0), false otherwise.
 */
async function openResourceWithDefaultBrowser(resourcePath) {
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
    // i0 is assumed to be a function that executes a command with arguments and returns an object with a 'code' property
    const { code: exitCode } = await i0(openCommand, [resourcePath]);
    // Return true if the command succeeded (exit code 0)
    return exitCode === 0;
  } catch (error) {
    // If an error occurs, return false
    return false;
  }
}

module.exports = openResourceWithDefaultBrowser;