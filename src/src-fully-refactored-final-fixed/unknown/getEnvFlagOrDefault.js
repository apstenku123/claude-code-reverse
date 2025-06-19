/**
 * Retrieves a boolean flag from process.env or returns a default value from xD6 if not set.
 *
 * @param {string} envVarName - The name of the environment variable to check.
 * @returns {boolean|string} Returns true if the environment variable is set to 'true',
 *   false if set to any other value, or the default value from xD6 if the variable is not set.
 */
function getEnvFlagOrDefault(envVarName) {
  // Retrieve the default value from xD6 using the provided environment variable name
  const defaultValue = xD6[envVarName];
  // Retrieve the value of the environment variable from process.env
  const envValue = process.env[envVarName];

  // If the environment variable is not set, return the default value
  if (envValue === undefined) {
    return defaultValue;
  }

  // Return true if the environment variable is explicitly set to 'true', otherwise false
  return envValue === "true";
}

module.exports = getEnvFlagOrDefault;
