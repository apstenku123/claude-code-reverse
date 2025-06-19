/**
 * Retrieves the maximum allowed output length for bash commands from the environment variable.
 * If the environment variable BASH_MAX_OUTPUT_LENGTH is set to a valid positive integer, that value is returned.
 * Otherwise, returns the default value defined by Uq6.
 *
 * @returns {number} The maximum output length for bash commands.
 */
function getMaxBashOutputLength() {
  // Retrieve the value from the environment variable
  const maxOutputLengthEnv = process.env.BASH_MAX_OUTPUT_LENGTH;

  if (maxOutputLengthEnv) {
    // Parse the environment variable as an integer
    const parsedMaxOutputLength = parseInt(maxOutputLengthEnv, 10);
    // Check if the parsed value is a valid positive integer
    if (!isNaN(parsedMaxOutputLength) && parsedMaxOutputLength > 0) {
      return parsedMaxOutputLength;
    }
  }
  // Fallback to the default value if the environment variable is not set or invalid
  return Uq6;
}

module.exports = getMaxBashOutputLength;