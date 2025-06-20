/**
 * Retrieves a mapping of environment variable names from LT6 to their defined values in pF1.env.
 *
 * Skips variables that are undefined or whose value starts with '()'.
 *
 * @returns {Object} An object mapping environment variable names to their values from pF1.env.
 */
function getDefinedPF1EnvVariables() {
  const definedEnvVariables = {};

  // Iterate over each environment variable name in LT6
  for (const envVarName of LT6) {
    const envVarValue = pF1.env[envVarName];

    // Skip if the environment variable is undefined
    if (envVarValue === undefined) continue;

    // Skip if the environment variable value starts with '()'
    if (envVarValue.startsWith("()")) continue;

    // Add the variable to the result object
    definedEnvVariables[envVarName] = envVarValue;
  }

  return definedEnvVariables;
}

module.exports = getDefinedPF1EnvVariables;