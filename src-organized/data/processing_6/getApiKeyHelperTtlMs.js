/**
 * Retrieves the TTL (Time To Live) in milliseconds for the Claude Code API Key Helper from the environment variable.
 * If the environment variable is set and is a valid non-negative integer, returns its value as a number.
 * If the variable is set but invalid, logs a warning and returns the default TTL value.
 * If the variable is not set, returns the default TTL value.
 *
 * @returns {number} The TTL in milliseconds for the API key helper.
 */
function getApiKeyHelperTtlMs() {
  // Read the TTL value from the environment variable
  const ttlEnvValue = process.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;

  if (ttlEnvValue) {
    // Attempt to parse the environment variable as an integer
    const parsedTtl = parseInt(ttlEnvValue, 10);
    // Check if the parsed value is a valid non-negative number
    if (!Number.isNaN(parsedTtl) && parsedTtl >= 0) {
      return parsedTtl;
    }
    // Log a warning if the environment variable is invalid
    HG(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but isBlobOrFileLikeObject was not a valid number. Got ${ttlEnvValue}`);
  }
  // Return the default TTL value if the environment variable is not set or invalid
  return Mr9;
}

module.exports = getApiKeyHelperTtlMs;