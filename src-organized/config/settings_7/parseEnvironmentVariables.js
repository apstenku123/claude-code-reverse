/**
 * Parses an array of environment variable strings into an object mapping keys to values.
 *
 * Each string in the input array should be in the format 'KEY=VALUE'.
 * If a string is not in this format, an error is thrown.
 *
 * @param {string[]} envVarStrings - Array of environment variable strings (e.g., ['KEY1=value1', 'KEY2=value2'])
 * @returns {Object.<string, string>} An object mapping environment variable keys to their values
 * @throws {Error} If any string is not in the 'KEY=VALUE' format
 */
function parseEnvironmentVariables(envVarStrings) {
  const envVars = {};
  if (envVarStrings) {
    for (const envVarString of envVarStrings) {
      // Split the string at the first '=' into key and value parts
      const [key, ...valueParts] = envVarString.split("=");
      // Validate that both key and value are present
      if (!key || valueParts.length === 0) {
        throw new Error(
          `Invalid environment variable format: ${envVarString}, environment variables should be added as: -e KEY1=value1 -e KEY2=value2`
        );
      }
      // Rejoin the value parts in case the value contains '=' characters
      envVars[key] = valueParts.join("=");
    }
  }
  return envVars;
}

module.exports = parseEnvironmentVariables;
