/**
 * Generates a formatted summary string of total cost, durations, code changes, and token usage statistics.
 * Optionally includes a warning if cost estimates may be inaccurate due to unknown models.
 * Applies ANSI color formatting for secondary text and appends any additional warnings.
 *
 * @returns {string} Formatted summary string for CLI output.
 */
function formatCostAndUsageSummary() {
  // Calculate the total cost string, appending a warning if unknown models are used
  const totalCost = formatCurrencyAmount(SJ());
  const hasUnknownModels = q0A();
  const costWarning = hasUnknownModels ? " (costs may be inaccurate due to usage of unknown models)" : "";
  const totalCostString = `${totalCost}${costWarning}`;

  // Get the token usage summary string
  const tokenUsageSummary = getTokenUsageSummary();

  // Format the total cost line, unless cost warnings are disabled via environment variable
  const costLine = process.env.DISABLE_COST_WARNINGS
    ? ""
    : `Total cost:            ${totalCostString}\n`;

  // Format the API and wall durations
  const apiDuration = formatDuration(uT());
  const wallDuration = formatDuration(ow1());

  // Get code change statistics
  const linesAdded = N01();
  const linesRemoved = $01();
  const addedLabel = linesAdded === 1 ? "line" : "lines";
  const removedLabel = linesRemoved === 1 ? "line" : "lines";

  // Compose the full summary string
  const summary =
    costLine +
    `Total duration (API):  ${apiDuration}\n` +
    `Total duration (wall): ${wallDuration}\n` +
    `Total code changes:    ${linesAdded} ${addedLabel} added, ${linesRemoved} ${removedLabel} removed\n` +
    `${tokenUsageSummary}`;

  // Apply secondary text color formatting and append any additional warnings
  return FA.ansi256(H4().secondaryText)(summary) + getSubscriptionUpsellMessage();
}

module.exports = formatCostAndUsageSummary;