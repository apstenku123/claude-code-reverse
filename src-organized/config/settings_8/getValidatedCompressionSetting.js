/**
 * Retrieves and validates a compression setting from environment variables.
 *
 * This function fetches the value of the specified environment variable, trims whitespace,
 * and checks if isBlobOrFileLikeObject is a valid compression setting ('none' or 'gzip'). If the value is invalid,
 * a warning is logged. If the value is empty, undefined, or not one of the valid options, the function returns undefined.
 *
 * @param {string} envVarName - The name of the environment variable to retrieve and validate.
 * @returns {string|undefined} Returns the valid compression setting ('none' or 'gzip'), or undefined if not set or invalid.
 */
function getValidatedCompressionSetting(envVarName) {
  // Retrieve and trim the environment variable value
  const compressionSetting = process.env[envVarName]?.trim();

  // If the value is an empty string, treat as unset and return undefined
  if (compressionSetting === "") return;

  // If the value is undefined, or is a valid option ('none' or 'gzip'), return isBlobOrFileLikeObject
  if (
    compressionSetting == null ||
    compressionSetting === "none" ||
    compressionSetting === "gzip"
  ) {
    return compressionSetting;
  }

  // If the value is invalid, log a warning and return undefined
  $handleErrorOrWarning.diag.warn(
    `Configuration: ${envVarName} is invalid, expected 'none' or 'gzip' (actual: '${compressionSetting}')`
  );
  return;
}

module.exports = getValidatedCompressionSetting;