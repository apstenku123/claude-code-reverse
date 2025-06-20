/**
 * Retrieves a mapping of defined environment variables from the pF1.env object,
 * filtering out any variables that are undefined or whose value starts with '()'.
 * The set of environment variable names to check is provided by the global LT6 array.
 *
 * @returns {Object} An object mapping environment variable names to their values, for all defined and valid entries in pF1.env.
 */
function getDefinedPF1EnvironmentVariables() {
  const definedEnvironmentVariables = {};
  // Iterate over each environment variable name specified in LT6
  for (const environmentVariableName of LT6) {
    const environmentVariableValue = pF1.env[environmentVariableName];
    // Skip if the environment variable is undefined
    if (environmentVariableValue === undefined) continue;
    // Skip if the environment variable value starts with '()'
    if (environmentVariableValue.startsWith("()")) continue;
    // Add the valid environment variable to the result object
    definedEnvironmentVariables[environmentVariableName] = environmentVariableValue;
  }
  return definedEnvironmentVariables;
}

module.exports = getDefinedPF1EnvironmentVariables;