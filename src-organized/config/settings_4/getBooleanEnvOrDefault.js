/**
 * Retrieves a boolean value from an environment variable, or falls back to a default value.
 *
 * Looks up the provided environment variable name in process.env. If the variable is not defined,
 * returns the default value from the xD6 configuration object. If the variable is defined, returns true
 * if its value is the string 'true', otherwise returns false.
 *
 * @param {string} envVarName - The name of the environment variable to look up.
 * @returns {boolean|string} Returns the boolean value of the environment variable if set, otherwise the default value from xD6.
 */
function getBooleanEnvOrDefault(envVarName) {
  // Retrieve the default value from the xD6 configuration object
  const defaultValue = xD6[envVarName];
  // Retrieve the value of the environment variable
  const envValue = process.env[envVarName];

  // If the environment variable is not set, return the default value
  if (envValue === undefined) {
    return defaultValue;
  }

  // Return true if the environment variable is exactly the string 'true', otherwise false
  return envValue === "true";
}

module.exports = getBooleanEnvOrDefault;