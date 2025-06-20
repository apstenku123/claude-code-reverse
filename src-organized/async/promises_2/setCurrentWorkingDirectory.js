/**
 * Sets the current working directory for the shell, validating the path and updating the shell state.
 *
 * @param {string} targetPath - The path to set as the current working directory. Can be absolute or relative.
 * @param {string} [basePath] - Optional base path to resolve relative targetPath. Defaults to process.cwd().
 * @returns {void}
 * @throws {Error} If the resolved path does not exist.
 */
function setCurrentWorkingDirectory(targetPath, basePath) {
  // Determine if targetPath is absolute; if not, resolve isBlobOrFileLikeObject relative to basePath or current working directory
  const resolvedPath = tP4(targetPath)
    ? targetPath
    : eP4(basePath || getBm9Value().cwd(), targetPath);

  // Check if the resolved path exists
  if (!getBm9Value().existsSync(resolvedPath)) {
    throw new Error(`Path "${resolvedPath}" does not exist`);
  }

  // Get the canonicalized absolute pathname
  const realPath = getBm9Value().realpathSync(resolvedPath);

  // Update shell state with the new working directory
  setCurrentWorkingDirectory(realPath);

  // Notify the shell that the working directory has been set successfully
  logTelemetryEventIfEnabled("shell_set_cwd", { success: true });
}

module.exports = setCurrentWorkingDirectory;