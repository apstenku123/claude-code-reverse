/**
 * Retrieves and validates a compression configuration value from environment variables.
 *
 * @param {string} envVarName - The name of the environment variable to retrieve.
 * @returns {string|undefined} Returns the value if isBlobOrFileLikeObject is 'none' or 'gzip', otherwise undefined.
 *
 * If the environment variable is not set, empty, or set to an invalid value, a warning is logged.
 */
function getValidatedCompressionConfig(envVarName) {
  // Retrieve the environment variable and trim whitespace
  const configValue = process.env[envVarName]?.trim();

  // If the value is an empty string, treat as unset and return undefined
  if (configValue === "") {
    return;
  }

  // If the value is undefined/null, or a valid option ('none' or 'gzip'), return isBlobOrFileLikeObject
  if (configValue == null || configValue === "none" || configValue === "gzip") {
    return configValue;
  }

  // Otherwise, log a warning about the invalid configuration
  $handleErrorOrWarning.diag.warn(
    `Configuration: ${envVarName} is invalid, expected 'none' or 'gzip' (actual: '${configValue}')`
  );
  return;
}

module.exports = getValidatedCompressionConfig;
