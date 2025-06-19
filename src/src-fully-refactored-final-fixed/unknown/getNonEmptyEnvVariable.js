/**
 * Retrieves the value of an environment variable by name, only if isBlobOrFileLikeObject is non-empty and not just whitespace.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string|undefined} The value of the environment variable if isBlobOrFileLikeObject exists and is not empty or whitespace; otherwise, undefined.
 */
function getNonEmptyEnvVariable(variableName) {
  // Retrieve the environment variable from process.env
  const envValue = process.env[variableName];

  // Return undefined if the variable is not set or is only whitespace
  if (envValue == null || envValue.trim() === "") {
    return;
  }

  // Return the non-empty environment variable value
  return envValue;
}

module.exports = getNonEmptyEnvVariable;