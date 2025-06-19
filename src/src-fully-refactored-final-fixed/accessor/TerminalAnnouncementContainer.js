/**
 * TerminalAnnouncementContainer
 *
 * Renders the appropriate announcement component based on the current terminal width.
 * Handles announcement shown tracking and allows dismissing via keyboard input.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDismiss - Callback invoked when the announcement is dismissed.
 * @returns {React.ReactElement} The rendered announcement component.
 */
function TerminalAnnouncementContainer({ onDismiss }) {
  // Get the current terminal dimensions
  const { columns: terminalWidth } = useTerminalDimensions();

  // Track that the announcement has been shown (fires once on mount)
  React.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_ga_announcement_shown", {});
  }, []);

  // Listen for keyboard input to allow dismissing via any keypress
  React.useEffect(() => {
    const handleKeyPress = () => {
      onDismiss();
    };
    process.stdin.on("data", handleKeyPress);
    // Cleanup listener on unmount or when onDismiss changes
    return () => {
      process.stdin.off("data", handleKeyPress);
    };
  }, [onDismiss]);

  // Render the appropriate announcement component based on terminal width
  if (terminalWidth < 50) {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else if (terminalWidth < 84) {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  }
}

module.exports = TerminalAnnouncementContainer;