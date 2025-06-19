/**
 * Renders a compact summary UI component for a transcript message, with optional expansion instructions.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The transcript message to display.
 * @param {string} props.screen - The current screen type (e.g., 'transcript').
 * @returns {React.ReactElement} The rendered summary React element.
 */
function renderTranscriptSummary({
  message,
  screen
}) {
  // Get the current theme'createInteractionAccessor stylesheet for styling purposes
  const themeStyles = getThemeStylesheet();

  // Determine if the current screen is the transcript view
  const isTranscriptScreen = screen === "transcript";

  // Get the compact summary text for the message (fallback to empty string)
  const compactSummary = extractUserMessageContent(message) || "";

  // Render the summary UI
  return n7.createElement(
    g,
    { flexDirection: "column" },
    // Row with icon and summary title
    n7.createElement(
      g,
      { flexDirection: "row" },
      // Icon section
      n7.createElement(
        g,
        { minWidth: 2 },
        n7.createElement(_, { color: themeStyles.text }, nw)
      ),
      // Summary title and optional hint
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
    // If on transcript screen, show the full summary below
    isTranscriptScreen && n7.createElement(
      ConditionalRowContainer,
      null,
      n7.createElement(_, null, compactSummary)
    )
  );
}

module.exports = renderTranscriptSummary;