/**
 * Determines the maximum number of output tokens allowed based on input string content and environment configuration.
 *
 * If the input contains certain keywords ("3-5" or "haiku"), returns a fixed value (8192).
 * Otherwise, checks the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable for a custom value.
 * If the environment variable is set and valid, returns its value. Otherwise, returns the default (32000).
 *
 * @param {string} input - The input string to check for special keywords.
 * @returns {number} The maximum number of output tokens allowed.
 */
function getMaxOutputTokens(input) {
  // Return 8192 if the input contains "3-5" or "haiku"
  if (input.includes("3-5")) return 8192;
  if (input.includes("haiku")) return 8192;

  // Check for environment variable override
  const maxTokensEnv = process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS;
  if (maxTokensEnv) {
    const parsedMaxTokens = parseInt(maxTokensEnv, 10);
    // Use the environment variable only if isBlobOrFileLikeObject'createInteractionAccessor a valid positive integer
    if (!isNaN(parsedMaxTokens) && parsedMaxTokens > 0) {
      return parsedMaxTokens;
    }
  }

  // Default maximum output tokens
  return 32000;
}

module.exports = getMaxOutputTokens;
