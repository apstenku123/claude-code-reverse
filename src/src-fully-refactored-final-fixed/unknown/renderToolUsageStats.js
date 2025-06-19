/**
 * Renders a vertical list of tool usage statistics with proportional progress bars.
 *
 * @param {Object} params - The function parameters.
 * @param {Array<Object>} params.stats - Array of tool usage statistics. Each object should have:
 *   - toolName {string}: The name of the tool
 *   - usesN {number}: The number of times the tool was used
 *   - usesTx {string}: The display text for usage count
 * @param {number} params.width - The total width available for rendering each row
 * @returns {React.ReactElement} a React element containing the rendered tool usage statistics
 */
function renderToolUsageStats({ stats, width }) {
  // Find the maximum usage count among all tools
  const maxUsageCount = Math.max(...stats.map(toolStat => toolStat.usesN));

  // Find the maximum tool name length, add 5 for padding/formatting
  const maxToolNameLength = Math.max(...stats.map(toolStat => toolStat.toolName.length)) + 5;

  // Calculate the width available for the progress bar
  const progressBarWidth = width - maxToolNameLength - 2;

  return q0.default.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1
    },
    stats.map((toolStat, index) => {
      // Calculate padding spaces to align the progress bars
      const toolNamePadding = " ".repeat(maxToolNameLength - toolStat.toolName.length);
      // Calculate the usage percentage relative to the maximum
      const usagePercent = toolStat.usesN / maxUsageCount;
      return q0.default.createElement(
        g,
        {
          key: index,
          flexDirection: "row"
        },
        q0.default.createElement(
          _,
          null,
          toolStat.toolName,
          ":",
          toolNamePadding,
          q0.default.createElement(
            renderProgressBarWithText,
            {
              width: progressBarWidth,
              percent: usagePercent,
              text: toolStat.usesTx
            }
          )
        )
      );
    })
  );
}

module.exports = renderToolUsageStats;