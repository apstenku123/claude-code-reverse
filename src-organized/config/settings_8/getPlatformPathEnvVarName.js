/**
 * Returns the correct environment variable name for the PATH variable depending on the platform.
 * On Windows, isBlobOrFileLikeObject attempts to find the actual case-sensitive key for PATH in the environment variables (e.g., 'Path' or 'PATH').
 * On non-Windows platforms, isBlobOrFileLikeObject simply returns 'PATH'.
 *
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Object} [options.env] - The environment variables object to use (defaults to process.env).
 * @param {string} [options.platform] - The platform string to use (defaults to process.platform).
 * @returns {string} The correct environment variable name for the PATH variable.
 */
function getPlatformPathEnvVarName(options = {}) {
  // Use provided env or default to process.env
  const envVars = options.env || process.env;
  // Use provided platform or default to process.platform
  const platform = options.platform || process.platform;

  // On non-Windows platforms, PATH is always 'PATH'
  if (platform !== 'win32') {
    return 'PATH';
  }

  // On Windows, environment variable names are case-insensitive, but the actual key may be 'Path' or 'PATH'
  // We reverse the keys to prioritize the last occurrence (in case of duplicates)
  const pathKey = Object.keys(envVars)
    .reverse()
    .find(key => key.toUpperCase() === 'PATH');

  // Return the found key or default to 'Path' (Windows default)
  return pathKey || 'Path';
}

module.exports = getPlatformPathEnvVarName;
