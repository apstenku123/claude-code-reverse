/**
 * Renders a compact summary panel UI component, optionally including a transcript summary.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.message - The message or content to be summarized.
 * @param {string} props.screen - The current screen context (e.g., 'transcript').
 * @returns {React.ReactElement} The rendered compact summary panel component.
 */
function CompactSummaryPanel({
  message,
  screen
}) {
  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet();

  // Determine if the current screen is the transcript view
  const isTranscriptScreen = screen === "transcript";

  // Get the summary text using extractUserMessageContent, fallback to empty string if undefined
  const summaryText = extractUserMessageContent(message) || "";

  // Render the compact summary panel
  return n7.createElement(
    g,
    { flexDirection: "column" },
    // Header row with icon and title
    n7.createElement(
      g,
      { flexDirection: "row" },
      // Icon section
      n7.createElement(
        g,
        { minWidth: 2 },
        n7.createElement(_, { color: themeStylesheet.text }, nw)
      ),
      // Title and hint section
      n7.createElement(
        g,
        { flexDirection: "column" },
        n7.createElement(
          _,
          { bold: true },
          "Compact summary",
          // Show the expand hint only if not on transcript screen
          !isTranscriptScreen && n7.createElement(
            _,
            { dimColor: true },
            " (ctrl+r to expand)"
          )
        )
      )
    ),
    // If on transcript screen, show the summary text below
    isTranscriptScreen && n7.createElement(
      ConditionalRowContainer,
      null,
      n7.createElement(_, null, summaryText)
    )
  );
}

module.exports = CompactSummaryPanel;