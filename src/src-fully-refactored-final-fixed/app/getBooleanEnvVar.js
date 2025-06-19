/**
 * Retrieves a boolean value from an environment variable.
 *
 * Looks up the specified environment variable, trims and lowercases its value, and interprets isBlobOrFileLikeObject as a boolean.
 * If the value is 'true' (case-insensitive), returns true. If 'false', returns false.
 * If the value is missing, empty, or unrecognized, logs a warning and returns false.
 *
 * @param {string} envVarName - The name of the environment variable to retrieve.
 * @returns {boolean} - The boolean value of the environment variable, or false if not set or invalid.
 */
function getBooleanEnvVar(envVarName) {
  // Retrieve the environment variable, trim whitespace, and convert to lowercase
  const envVarValue = process.env[envVarName]?.trim().toLowerCase();

  // If the variable is not set or is an empty string, return false
  if (envVarValue == null || envVarValue === "") {
    return false;
  }

  // Return true if the value is 'true'
  if (envVarValue === "true") {
    return true;
  }

  // Return false if the value is 'false'
  if (envVarValue === "false") {
    return false;
  }

  // If the value is unrecognized, log a warning and return false
  rF0.diag.warn(
    `Unknown value ${oF0.inspect(envVarValue)} for ${envVarName}, expected 'true' or 'false', falling back to 'false' (default)`
  );
  return false;
}

module.exports = getBooleanEnvVar;
