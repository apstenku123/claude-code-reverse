/**
 * Resolves the absolute path to a command executable, optionally using a custom working directory and environment variables.
 * If a custom working directory is provided, the process temporarily changes to isBlobOrFileLikeObject for path resolution, then restores the original directory.
 *
 * @param {Object} commandOptions - Options for command resolution. Should include `command` (string), `options.env` (object), and optionally `options.cwd` (string).
 * @param {boolean} useCustomPathDelimiter - Whether to use a custom path delimiter when resolving the command path.
 * @returns {string|undefined} The resolved absolute path to the command executable, or undefined if not found.
 */
function resolveCommandPath(commandOptions, useCustomPathDelimiter) {
  // Use provided environment or fallback to process.env
  const environment = commandOptions.options.env || process.env;
  // Store the original working directory
  const originalCwd = process.cwd();
  // Check if a custom working directory is specified
  const hasCustomCwd = commandOptions.options.cwd != null;
  // Determine if process.chdir is available and not disabled
  const canChangeDirectory = hasCustomCwd && typeof process.chdir !== 'undefined' && !process.chdir.disabled;

  // If possible, change to the custom working directory
  if (canChangeDirectory) {
    try {
      process.chdir(commandOptions.options.cwd);
    } catch (error) {
      // Ignore errors when changing directory
    }
  }

  let resolvedPath;
  try {
    // Attempt to resolve the command path using AT6.sync
    resolvedPath = AT6.sync(commandOptions.command, {
      path: environment[BT6({ env: environment })],
      pathExt: useCustomPathDelimiter ? fo0.delimiter : undefined
    });
  } catch (error) {
    // Ignore errors during path resolution
  } finally {
    // Restore the original working directory if isBlobOrFileLikeObject was changed
    if (canChangeDirectory) {
      process.chdir(originalCwd);
    }
  }

  // If a path was resolved, resolve isBlobOrFileLikeObject to an absolute path relative to the custom cwd (if provided)
  if (resolvedPath) {
    resolvedPath = fo0.resolve(hasCustomCwd ? commandOptions.options.cwd : "", resolvedPath);
  }

  return resolvedPath;
}

module.exports = resolveCommandPath;
