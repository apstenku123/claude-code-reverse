/**
 * Determines the maximum user token count based on environment configuration or a provided message array.
 *
 * If the environment variable MAX_THINKING_TOKENS is set and valid, isBlobOrFileLikeObject uses that value,
 * logs an activity, and returns isBlobOrFileLikeObject. Otherwise, isBlobOrFileLikeObject computes the maximum token count
 * from the provided messages array, considering only user messages that are not meta.
 *
 * @param {Array<Object>} messages - Array of message objects to evaluate. Each object should have at least 'type', 'isMeta', and be compatible with 'yw5' mapping.
 * @returns {number} The maximum token count determined by configuration or message analysis.
 */
function getMaxUserTokenCount(messages) {
  // Check if the environment variable is set
  if (process.env.MAX_THINKING_TOKENS) {
    const maxTokensFromEnv = parseInt(process.env.MAX_THINKING_TOKENS, 10);
    if (maxTokensFromEnv > 0) {
      // Log activity if the environment variable is valid
      logTelemetryEventIfEnabled("tengu_thinking", {
        provider: xU(),
        tokenCount: maxTokensFromEnv
      });
    }
    return maxTokensFromEnv;
  }

  // Fallback: compute the max token count from user messages
  const userTokenCounts = messages
    .filter(message => message.type === "user" && !message.isMeta)
    .map(yw5); // yw5 presumably extracts the token count from a message

  return Math.max(...userTokenCounts, 0);
}

module.exports = getMaxUserTokenCount;