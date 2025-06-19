/**
 * Retrieves the value of an environment variable in a case-insensitive manner.
 *
 * This function attempts to fetch the value of the specified environment variable
 * from process.env, first using the lowercase version of the variable name, then
 * the uppercase version. If neither is found, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {string} variableName - The name of the environment variable to retrieve.
 * @returns {string} The value of the environment variable if found; otherwise, an empty string.
 */
function getEnvironmentVariableCaseInsensitive(variableName) {
  // Try to get the environment variable using lowercase
  const lowerCaseValue = process.env[variableName.toLowerCase()];

  // If not found, try uppercase
  const upperCaseValue = process.env[variableName.toUpperCase()];

  // Return the first found value, or an empty string if neither exists
  return lowerCaseValue || upperCaseValue || "";
}

module.exports = getEnvironmentVariableCaseInsensitive;