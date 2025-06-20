/**
 * Renders a compact summary panel for a transcript message, with optional expansion instructions.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The transcript message to summarize.
 * @param {string} props.screen - The current screen context (e.g., 'transcript').
 * @returns {React.ReactElement} The rendered summary panel React element.
 */
function TranscriptSummaryPanel({
  message,
  screen
}) {
  // Get the current theme'createInteractionAccessor stylesheet (for colors, etc.)
  const themeStyles = getThemeStylesheet();
  // Determine if the current screen is the transcript view
  const isTranscriptScreen = screen === "transcript";
  // Get the compact summary for the message (or empty string if not available)
  const compactSummary = extractUserMessageContent(message) || "";

  return n7.createElement(
    g,
    { flexDirection: "column" },
    // Row: Icon and Title
    n7.createElement(
      g,
      { flexDirection: "row" },
      // Icon with minimum width
      n7.createElement(
        g,
        { minWidth: 2 },
        n7.createElement(
          _,
          { color: themeStyles.text },
          nw // Icon component or element
        )
      ),
      // Title and optional expansion hint
      n7.createElement(
        g,
        { flexDirection: "column" },
        n7.createElement(
          _,
          { bold: true },
          "Compact summary",
          // Show expansion hint only if not on transcript screen
          !isTranscriptScreen && n7.createElement(
            _,
            { dimColor: true },
            " (ctrl+r to expand)"
          )
        )
      )
    ),
    // If on transcript screen, show the compact summary content
    isTranscriptScreen && n7.createElement(
      ConditionalRowContainer,
      null,
      n7.createElement(
        _,
        null,
        compactSummary
      )
    )
  );
}

module.exports = TranscriptSummaryPanel;