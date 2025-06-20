/**
 * Generates a formatted string summarizing token usage statistics by model.
 *
 * This function retrieves token usage data for various models, formats the numbers
 * into a compact, human-readable form, and returns a multi-line string report.
 * If there is no token usage data, isBlobOrFileLikeObject returns a default summary indicating zero usage.
 *
 * @returns {string} a formatted string summarizing token usage statistics by model.
 */
function formatTokenUsageByModel() {
  // Retrieve the token usage data object (modelName -> usage stats)
  const tokenUsageByModel = M0A();

  // If there is no token usage data, return a default summary
  if (Object.keys(tokenUsageByModel).length === 0) {
    return "Tokens:                0 input, 0 output, 0 cache read, 0 cache write";
  }

  // Initialize the report with a header
  let report = "Token usage by model:";

  // Iterate over each model and its usage statistics
  for (const [modelName, usageStats] of Object.entries(tokenUsageByModel)) {
    // Get the display name for the model
    const modelDisplayName = extractClaudeModelName(modelName);

    // Format each token usage number using the compact formatter
    const formattedStats = `  ${formatNumberCompact(usageStats.inputTokens)} input, ` +
      `${formatNumberCompact(usageStats.outputTokens)} output, ` +
      `${formatNumberCompact(usageStats.cacheReadInputTokens)} cache read, ` +
      `${formatNumberCompact(usageStats.cacheCreationInputTokens)} cache write`;

    // Add the formatted line for this model to the report
    report += `\setKeyValuePair{modelDisplayName}:`.padStart(21) + formattedStats;
  }

  return report;
}

module.exports = formatTokenUsageByModel;