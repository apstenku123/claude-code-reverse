/**
 * Renders the appropriate announcement component based on the current terminal window width.
 * Handles side effects such as logging the announcement display and listening for stdin data to trigger dismissal.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDismiss - Callback function to be called when the announcement is dismissed.
 * @returns {React.ReactElement} The rendered announcement component.
 */
function TerminalAnnouncementAccessor({ onDismiss }) {
  // Get the current terminal window size (columns)
  const { columns: terminalColumns } = useTerminalWindowSize();

  // Log that the announcement has been shown (side effect, runs once on mount)
  React.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_ga_announcement_shown", {});
  }, []);

  // Listen for stdin data to trigger the onDismiss callback
  React.useEffect(() => {
    const handleStdinData = () => {
      onDismiss();
    };
    process.stdin.on("data", handleStdinData);
    // Cleanup listener on unmount or when onDismiss changes
    return () => {
      process.stdin.off("data", handleStdinData);
    };
  }, [onDismiss]);

  // Render the appropriate announcement component based on terminal width
  if (terminalColumns < 50) {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else if (terminalColumns < 84) {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else {
    return React.createElement(ClaudeCodeStatsPanel, { onDismiss });
  }
}

module.exports = TerminalAnnouncementAccessor;