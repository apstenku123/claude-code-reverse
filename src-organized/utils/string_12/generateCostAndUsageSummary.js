/**
 * Generates a formatted summary of total cost, durations, code changes, and token usage statistics.
 * Optionally includes a warning if cost estimates may be inaccurate due to unknown models.
 *
 * @returns {string} a formatted, colorized summary string for CLI output.
 */
function generateCostAndUsageSummary() {
  // Calculate the total cost string, appending a warning if unknown models are used
  const totalCost = formatCurrencyAmount(SJ());
  const hasUnknownModels = q0A();
  const costWarning = hasUnknownModels ? " (costs may be inaccurate due to usage of unknown models)" : "";
  const totalCostString = `${totalCost}${costWarning}`;

  // Get the token usage summary string
  const tokenUsageSummary = getTokenUsageSummary();

  // Format the total API duration
  const totalApiDuration = formatDuration(uT());

  // Format the total wall duration
  const totalWallDuration = formatDuration(ow1());

  // Get the number of lines added and removed
  const linesAdded = N01();
  const linesRemoved = $01();
  const linesAddedLabel = linesAdded === 1 ? "line" : "lines";
  const linesRemovedLabel = linesRemoved === 1 ? "line" : "lines";

  // Build the summary string
  const summary =
    (process.env.DISABLE_COST_WARNINGS
      ? ""
      : `Total cost:            ${totalCostString}\n`)
    + `Total duration (API):  ${totalApiDuration}\n`
    + `Total duration (wall): ${totalWallDuration}\n`
    + `Total code changes:    ${linesAdded} ${linesAddedLabel} added, ${linesRemoved} ${linesRemovedLabel} removed\n`
    + `${tokenUsageSummary}`;

  // Apply color formatting to the summary
  const colorizedSummary = FA.ansi256(H4().secondaryText)(summary);

  // Append any additional output (such as warnings or footers)
  return colorizedSummary + getSubscriptionUpsellMessage();
}

module.exports = generateCostAndUsageSummary;