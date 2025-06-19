/**
 * Formats a summary string displaying total cost, durations, and code changes, with optional cost warning.
 * The output is colorized using ANSI 256 colors and may include a warning if unknown models affect cost accuracy.
 *
 * @returns {string} The formatted and colorized summary string.
 */
function formatCostAndDurationSummary() {
  // Calculate the total cost string, appending a warning if unknown models are used
  const totalCost = formatCurrencyAmount(SJ());
  const costWarning = q0A() ? ' (costs may be inaccurate due to usage of unknown models)' : '';
  const totalCostWithWarning = `${totalCost}${costWarning}`;

  // Get additional summary details (e.g., model breakdowns, etc.)
  const additionalSummary = getTokenUsageSummary();

  // Format the summary string
  const summary =
    (process.env.DISABLE_COST_WARNINGS
      ? ''
      : `Total cost:            ${totalCostWithWarning}\n`)
    + `Total duration (API):  ${formatDuration(uT())}\n`
    + `Total duration (wall): ${formatDuration(ow1())}\n`
    + `Total code changes:    ${N01()} ${N01() === 1 ? 'line' : 'lines'} added, ${$01()} ${$01() === 1 ? 'line' : 'lines'} removed\n`
    + `${additionalSummary}`;

  // Colorize the summary using the secondary text color
  const colorizedSummary = FA.ansi256(H4().secondaryText)(summary);

  // Append any additional output (e.g., warnings, footers)
  return colorizedSummary + getSubscriptionUpsellMessage();
}

module.exports = formatCostAndDurationSummary;