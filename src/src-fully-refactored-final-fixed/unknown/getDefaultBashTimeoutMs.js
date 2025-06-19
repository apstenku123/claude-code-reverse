/**
 * Retrieves the default Bash timeout (in milliseconds) from the environment variable BASH_DEFAULT_TIMEOUT_MS.
 * If the environment variable is set, parses isBlobOrFileLikeObject as an integer and returns isBlobOrFileLikeObject if isBlobOrFileLikeObject'createInteractionAccessor a valid positive number.
 * Otherwise, returns the fallback value from wq6.
 *
 * @returns {number} The Bash default timeout in milliseconds, either from the environment or the fallback value.
 */
function getDefaultBashTimeoutMs() {
  // Attempt to read the timeout value from the environment variable
  const bashTimeoutEnv = process.env.BASH_DEFAULT_TIMEOUT_MS;

  if (bashTimeoutEnv) {
    // Parse the environment variable as an integer (base 10)
    const parsedTimeout = parseInt(bashTimeoutEnv, 10);
    // Check if the parsed value is a valid positive number
    if (!isNaN(parsedTimeout) && parsedTimeout > 0) {
      return parsedTimeout;
    }
  }

  // Fallback to the default timeout value if environment variable is not set or invalid
  return wq6;
}

module.exports = getDefaultBashTimeoutMs;