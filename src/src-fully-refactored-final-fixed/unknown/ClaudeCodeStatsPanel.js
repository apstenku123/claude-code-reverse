/**
 * Renders the Claude Code statistics and top tools panel for the CLI UI.
 * Displays usage statistics, developer engagement, and top tools in a styled layout.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDismiss - Callback invoked when the panel is dismissed.
 * @returns {React.ReactElement} The rendered stats panel component.
 */
function ClaudeCodeStatsPanel({ onDismiss }) {
  // Get current theme colors/styles
  const theme = getThemeStylesheet();
  // Get layout columns (width) from configuration or context
  const { columns: panelWidth } = Z4();

  // List of top tools with usage statistics
  const topToolsStats = [
    { toolName: "Read", usesTx: "47.5M", usesN: 47500000 },
    { toolName: "Edit", usesTx: "39.3M", usesN: 39300000 },
    { toolName: "Bash", usesTx: "17.9M", usesN: 17900000 },
    { toolName: "Grep", usesTx: "14.7M", usesN: 14700000 },
    { toolName: "Write", usesTx: "6.8M", usesN: 6800000 }
  ];

  // Render the main panel layout
  return q0.default.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      width: panelWidth
    },
    // Header panel
    q0.default.createElement(
      g,
      {
        borderStyle: "round",
        borderColor: theme.claude,
        paddingLeft: 1,
        paddingRight: 1
      },
      q0.default.createElement(renderWelcomeMessage, null)
    ),
    // Possibly a sub-header or divider
    q0.default.createElement(
      g,
      null,
      q0.default.createElement(Q0A, null)
    ),
    // Statistics panels row
    q0.default.createElement(
      g,
      {
        gap: 1,
        flexDirection: "row"
      },
      // "Claude Code in Numbers" panel
      q0.default.createElement(
        g,
        {
          borderStyle: "round",
          borderColor: theme.secondaryBorder,
          flexDirection: "column",
          paddingLeft: 1,
          paddingRight: 1,
          flexGrow: 1,
          flexBasis: 0
        },
        q0.default.createElement(
          _,
          { bold: true, color: theme.text },
          "CLAUDE CODE IN NUMBERS"
        ),
        q0.default.createElement(
          g,
          { flexDirection: "column", marginTop: 1 },
          q0.default.createElement(
            g,
            null,
            q0.default.createElement(_, null, "115 sendHttpRequestOverSocket ", q0.default.createElement(_, { color: theme.remember }, "developers"))
          ),
          q0.default.createElement(
            g,
            null,
            q0.default.createElement(_, null, "195 M "),
            q0.default.createElement(_, { color: theme.success }, "lines of code changed last week")
          )
        )
      ),
      // "Claude Code in Vibes" panel
      q0.default.createElement(
        g,
        {
          borderStyle: "round",
          borderColor: theme.secondaryBorder,
          flexDirection: "column",
          paddingLeft: 1,
          paddingRight: 1,
          flexGrow: 1,
          flexBasis: 0
        },
        q0.default.createElement(
          _,
          { bold: true, color: theme.text },
          "CLAUDE CODE IN VIBES"
        ),
        q0.default.createElement(
          g,
          { flexDirection: "column", marginTop: 1 },
          q0.default.createElement(
            g,
            null,
            q0.default.createElement(_, null, "Billions of"),
            q0.default.createElement(_, { color: theme.claude }, " reticulations")
          ),
          q0.default.createElement(
            g,
            null,
            q0.default.createElement(_, null, "81% of devs "),
            q0.default.createElement(_, { color: theme.bashBorder }, "auto-accepting")
          )
        )
      )
    ),
    // Top tools panel
    q0.default.createElement(
      g,
      {
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        flexDirection: "column",
        paddingLeft: 1,
        paddingRight: 1
      },
      q0.default.createElement(
        _,
        { bold: true, color: theme.text },
        "CLAUDE’s TOP TOOLS"
      ),
      q0.default.createElement(
        g,
        { marginTop: 1 },
        q0.default.createElement(A0A, {
          stats: topToolsStats,
          width: panelWidth - 3 // Adjust width for padding/borders
        })
      )
    ),
    // Footer message
    q0.default.createElement(
      g,
      { marginTop: 1 },
      q0.default.createElement(_, { color: theme.remember }, "Press Enter to continue")
    )
  );
}

module.exports = ClaudeCodeStatsPanel;