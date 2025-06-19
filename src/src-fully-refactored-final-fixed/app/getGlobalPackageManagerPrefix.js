/**
 * Retrieves the global prefix path for the current package manager (Bun or npm).
 *
 * Determines whether the current environment is running with Bun or npm,
 * then executes the appropriate command to fetch the global prefix directory.
 * If the command fails, logs an error and returns null.
 *
 * @async
 * @returns {Promise<string|null>} The global prefix path as a trimmed string, or null if an error occurs.
 */
async function getGlobalPackageManagerPrefix() {
  // Check if the current environment is running with Bun
  const isRunningWithBun = pA.isRunningWithBun();
  let commandResult = null;

  if (isRunningWithBun) {
    // If running with Bun, use 'bun pm bin -g' to get the global bin directory
    commandResult = await i0("bun", ["pm", "bin", "-g"]);
  } else {
    // If running with npm, use 'npm -g config get prefix' to get the global prefix
    commandResult = await i0("npm", ["-g", "config", "get", "prefix"]);
  }

  // If the command failed, log an error and return null
  if (commandResult.code !== 0) {
    reportErrorIfAllowed(new Error(`Failed to check ${isRunningWithBun ? "bun" : "npm"} permissions`));
    return null;
  }

  // Return the trimmed stdout containing the global prefix path
  return commandResult.stdout.trim();
}

module.exports = getGlobalPackageManagerPrefix;