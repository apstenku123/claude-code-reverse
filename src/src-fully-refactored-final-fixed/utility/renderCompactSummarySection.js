/**
 * Renders the compact summary section for a transcript or message screen.
 *
 * @param {Object} props - The properties for rendering the summary section.
 * @param {string} props.message - The message or transcript content to display.
 * @param {string} props.screen - The current screen type (e.g., 'transcript').
 * @returns {React.ReactElement} The rendered compact summary section as a React element.
 */
function renderCompactSummarySection({
  message,
  screen
}) {
  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStyles = getThemeStylesheet();

  // Determine if the current screen is the transcript view
  const isTranscriptScreen = screen === "transcript";

  // Get the compact summary text (or empty string if not available)
  const compactSummaryText = extractUserMessageContent(message) || "";

  // Render the compact summary section
  return n7.createElement(
    g, // Outer container
    { flexDirection: "column" },
    n7.createElement(
      g, // Row for icon and label
      { flexDirection: "row" },
      n7.createElement(
        g, // Icon container
        { minWidth: 2 },
        n7.createElement(
          _, // Icon element
          { color: themeStyles.text },
          nw // Icon content (assumed to be defined elsewhere)
        )
      ),
      n7.createElement(
        g, // Column for label and shortcut hint
        { flexDirection: "column" },
        n7.createElement(
          _, // Label element
          { bold: true },
          "Compact summary",
          // If not on transcript screen, show shortcut hint
          !isTranscriptScreen && n7.createElement(
            _,
            { dimColor: true },
            " (ctrl+r to expand)"
          )
        )
      )
    ),
    // If on transcript screen, show the compact summary text
    isTranscriptScreen && n7.createElement(
      ConditionalRowContainer,
      null,
      n7.createElement(
        _,
        null,
        compactSummaryText
      )
    )
  );
}

module.exports = renderCompactSummarySection;