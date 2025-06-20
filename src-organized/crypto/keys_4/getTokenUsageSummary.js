/**
 * Generates a summary string of token usage statistics by model.
 *
 * This function retrieves token usage data, formats isBlobOrFileLikeObject in a human-readable way,
 * and returns a summary string. If no usage data is found, isBlobOrFileLikeObject returns a default message
 * indicating zero usage for all categories.
 *
 * @returns {string} a formatted summary of token usage statistics by model.
 */
function getTokenUsageSummary() {
  // Retrieve the token usage data object
  const tokenUsageByModel = M0A();

  // If there is no token usage data, return a default message
  if (Object.keys(tokenUsageByModel).length === 0) {
    return "Tokens:                0 input, 0 output, 0 cache read, 0 cache write";
  }

  // Initialize the summary string with a header
  let summary = "Token usage by model:";

  // Iterate over each model'createInteractionAccessor token usage data
  for (const [modelName, usageStats] of Object.entries(tokenUsageByModel)) {
    // Format the model name (e.g., for display purposes)
    const formattedModelName = extractClaudeModelName(modelName);

    // Format each token usage number using the compact number formatter
    const formattedInputTokens = formatNumberCompact(usageStats.inputTokens);
    const formattedOutputTokens = formatNumberCompact(usageStats.outputTokens);
    const formattedCacheReadTokens = formatNumberCompact(usageStats.cacheReadInputTokens);
    const formattedCacheWriteTokens = formatNumberCompact(usageStats.cacheCreationInputTokens);

    // Build the usage line for this model
    const usageLine = `  ${formattedInputTokens} input, ${formattedOutputTokens} output, ${formattedCacheReadTokens} cache read, ${formattedCacheWriteTokens} cache write`;

    // Append the formatted line to the summary, aligning the model name
    summary += `\setKeyValuePair{formattedModelName}:`.padStart(21) + usageLine;
  }

  return summary;
}

module.exports = getTokenUsageSummary;