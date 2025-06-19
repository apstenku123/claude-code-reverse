/**
 * Sets the shell'createInteractionAccessor current working directory to the specified path.
 * Resolves the provided path, checks its existence, and updates the shell context.
 *
 * @param {string} targetPath - The path to set as the current working directory. Can be absolute or relative.
 * @param {string} [basePath] - Optional base path to resolve relative paths. Defaults to process.cwd() if not provided.
 * @returns {void}
 * @throws {Error} If the resolved path does not exist.
 */
function setShellCurrentWorkingDirectory(targetPath, basePath) {
  // Determine if the targetPath is absolute; if not, resolve isBlobOrFileLikeObject relative to basePath or process.cwd()
  const resolvedPath = tP4(targetPath)
    ? targetPath
    : eP4(basePath || f1().cwd(), targetPath);

  // Check if the resolved path exists
  if (!f1().existsSync(resolvedPath)) {
    throw new Error(`Path "${resolvedPath}" does not exist`);
  }

  // Get the real (canonical) path
  const realPath = f1().realpathSync(resolvedPath);

  // Update shell context with the new working directory
  setCurrentWorkingDirectory(realPath);

  // Notify that the shell'createInteractionAccessor current working directory has been set successfully
  logTelemetryEventIfEnabled("shell_set_cwd", { success: true });
}

module.exports = setShellCurrentWorkingDirectory;