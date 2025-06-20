/**
 * Retrieves a numeric environment variable by name. If the variable is not set, empty, or not a valid number,
 * logs a warning and returns undefined. Otherwise, returns the numeric value.
 *
 * @param {string} envVarName - The name of the environment variable to retrieve.
 * @returns {number|undefined} The numeric value of the environment variable, or undefined if not set or invalid.
 */
function getNumericEnvVarOrWarn(envVarName) {
  // Retrieve the environment variable value
  const envVarValue = process.env[envVarName];

  // If the variable is not set or is an empty string after trimming, return undefined
  if (envVarValue == null || envVarValue.trim() === "") {
    return;
  }

  // Attempt to convert the value to a number
  const numericValue = Number(envVarValue);

  // If conversion fails (value is NaN), log a warning and return undefined
  if (isNaN(numericValue)) {
    rF0.diag.warn(
      `Unknown value ${oF0.inspect(envVarValue)} for ${envVarName}, expected a number, using defaults`
    );
    return;
  }

  // Return the valid numeric value
  return numericValue;
}

module.exports = getNumericEnvVarOrWarn;
