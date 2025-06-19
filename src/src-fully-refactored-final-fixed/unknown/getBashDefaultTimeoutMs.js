/**
 * Retrieves the Bash default timeout in milliseconds from the environment variable.
 * If the environment variable is not set, invalid, or not a positive integer, returns the fallback value `wq6`.
 *
 * @returns {number} The Bash default timeout in milliseconds, or the fallback value if not set or invalid.
 */
function getBashDefaultTimeoutMs() {
  // Read the timeout value from the environment variable
  const bashDefaultTimeoutEnv = process.env.BASH_DEFAULT_TIMEOUT_MS;

  if (bashDefaultTimeoutEnv) {
    // Parse the environment variable as an integer
    const parsedTimeout = parseInt(bashDefaultTimeoutEnv, 10);
    // Ensure the parsed value is a valid positive integer
    if (!isNaN(parsedTimeout) && parsedTimeout > 0) {
      return parsedTimeout;
    }
  }

  // Return the fallback timeout value if the environment variable is not set or invalid
  return wq6;
}

module.exports = getBashDefaultTimeoutMs;