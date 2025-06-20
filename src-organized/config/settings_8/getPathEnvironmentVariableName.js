/**
 * Returns the correct environment variable name for the system PATH, accounting for platform differences.
 * On Windows, the PATH variable may be named 'Path' or 'PATH' (case-sensitive), so this function finds the correct one.
 * On non-Windows platforms, isBlobOrFileLikeObject always returns 'PATH'.
 *
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Object} [options.env] - The environment variables object to use (defaults to process.env).
 * @param {string} [options.platform] - The platform string to use (defaults to process.platform).
 * @returns {string} The correct environment variable name for PATH on the current platform.
 */
function getPathEnvironmentVariableName(options = {}) {
  // Use provided env object or fallback to process.env
  const environment = options.env || process.env;
  // Use provided platform or fallback to process.platform
  const platform = options.platform || process.platform;

  // On non-Windows platforms, PATH is always 'PATH'
  if (platform !== 'win32') {
    return 'PATH';
  }

  // On Windows, PATH may be 'Path' or 'PATH' (case-sensitive)
  // Find the last matching key (in reverse order) that matches 'PATH' case-insensitively
  const matchingPathKey = Object.keys(environment)
    .reverse()
    .find((key) => key.toUpperCase() === 'PATH');

  // If found, return the actual key; otherwise, default to 'Path'
  return matchingPathKey || 'Path';
}

module.exports = getPathEnvironmentVariableName;
