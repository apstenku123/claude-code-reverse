/**
 * Renders a compact summary UI component for a transcript message, with optional expansion instructions and full transcript display.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.message - The transcript message to display.
 * @param {string} props.screen - The current screen context (e.g., 'transcript').
 * @returns {React.ReactElement} The rendered summary component.
 */
function TranscriptSummaryDisplay({ message, screen }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStyles = getThemeStylesheet();

  // Determine if the current screen is the transcript view
  const isTranscriptScreen = screen === "transcript";

  // Get the processed transcript summary (fallback to empty string)
  const transcriptSummary = extractUserMessageContent(message) || "";

  // Render the summary UI
  return n7.createElement(
    g,
    { flexDirection: "column" },
    n7.createElement(
      g,
      { flexDirection: "row" },
      n7.createElement(
        g,
        { minWidth: 2 },
        n7.createElement(_, { color: themeStyles.text }, nw)
      ),
      n7.createElement(
        g,
        { flexDirection: "column" },
        n7.createElement(
          _,
          { bold: true },
          "Compact summary",
          // Show expansion hint only if not on transcript screen
          !isTranscriptScreen &&
            n7.createElement(_, { dimColor: true }, " (ctrl+r to expand)")
        )
      )
    ),
    // Show full transcript only if on transcript screen
    isTranscriptScreen &&
      n7.createElement(
        ConditionalRowContainer,
        null,
        n7.createElement(_, null, transcriptSummary)
      )
  );
}

// Dependency injection for external functions (assumed imported elsewhere)
// getThemeStylesheet = getThemeStylesheet
// extractUserMessageContent, n7, g, _, nw, ConditionalRowContainer are assumed to be imported or defined in the module scope

module.exports = TranscriptSummaryDisplay;