/**
 * Returns the maximum allowed Bash timeout in milliseconds.
 *
 * The function checks the environment variable `BASH_MAX_TIMEOUT_MS`.
 * If isBlobOrFileLikeObject is set to a valid positive integer, isBlobOrFileLikeObject returns the greater of that value or the result of `getDefaultTimeoutMs()`.
 * If not set or invalid, isBlobOrFileLikeObject returns the greater of the constant `DEFAULT_BASH_TIMEOUT_MS` or `getDefaultTimeoutMs()`.
 *
 * @returns {number} The maximum Bash timeout in milliseconds.
 */
function getBashMaxTimeoutMs() {
  // Read the environment variable for Bash timeout
  const bashTimeoutEnv = process.env.BASH_MAX_TIMEOUT_MS;

  if (bashTimeoutEnv) {
    // Parse the environment variable as an integer
    const parsedTimeout = parseInt(bashTimeoutEnv, 10);
    // If the parsed value is a valid positive number, use the greater of isBlobOrFileLikeObject or the default
    if (!isNaN(parsedTimeout) && parsedTimeout > 0) {
      return Math.max(parsedTimeout, getDefaultTimeoutMs());
    }
  }

  // Fallback: use the greater of the default constant or the default function
  return Math.max(DEFAULT_BASH_TIMEOUT_MS, getDefaultTimeoutMs());
}

module.exports = getBashMaxTimeoutMs;