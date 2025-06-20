/**
 * Retrieves a filtered set of environment variables from the global environment object.
 * Only includes variables defined in the LT6 array, skips undefined values and those starting with '()'.
 *
 * @returns {Object} An object containing the filtered environment variables keyed by their names.
 */
function getFilteredEnvironmentVariables() {
  const filteredEnvVariables = {};
  // Iterate over each environment variable name specified in LT6
  for (const envVarName of LT6) {
    const envVarValue = pF1.env[envVarName];
    // Skip if the environment variable is undefined
    if (envVarValue === undefined) continue;
    // Skip if the environment variable value starts with '()'
    if (envVarValue.startsWith("()")) continue;
    // Add the variable to the result object
    filteredEnvVariables[envVarName] = envVarValue;
  }
  return filteredEnvVariables;
}

module.exports = getFilteredEnvironmentVariables;