/**
 * Retrieves a positive number from an environment variable.
 *
 * This function looks up the specified environment variable, trims any whitespace,
 * and attempts to parse isBlobOrFileLikeObject as a number. If the value is a finite number greater than zero,
 * isBlobOrFileLikeObject returns the number. Otherwise, isBlobOrFileLikeObject logs a warning and returns undefined.
 *
 * @param {string} envVarName - The name of the environment variable to retrieve.
 * @returns {number|undefined} The positive number value if valid, otherwise undefined.
 */
function getPositiveNumberFromEnv(envVarName) {
  // Retrieve the environment variable and trim whitespace
  const envValue = process.env[envVarName]?.trim();

  // Check if the environment variable is set and not an empty string
  if (envValue != null && envValue !== "") {
    // Attempt to convert the value to a number
    const numericValue = Number(envValue);

    // Validate that the value is a finite number greater than zero
    if (Number.isFinite(numericValue) && numericValue > 0) {
      return numericValue;
    }
    // Log a warning if the value is invalid
    $handleErrorOrWarning.diag.warn(
      `Configuration: ${envVarName} is invalid, expected number greater than 0 (actual: ${envValue})`
    );
  }
  // Return undefined if the environment variable is not set or invalid
  return;
}

module.exports = getPositiveNumberFromEnv;
