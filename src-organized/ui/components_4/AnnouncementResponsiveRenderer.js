/**
 * Renders the appropriate announcement component based on terminal column width.
 * Handles announcement shown event and listens for stdin data to trigger dismissal.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onDismiss - Callback to invoke when the announcement is dismissed.
 * @returns {React.Element} The rendered announcement component.
 */
function AnnouncementResponsiveRenderer({ onDismiss }) {
  // Retrieve terminal columns from custom hook
  const { columns: terminalColumns } = Z4();

  // Show announcement event on mount
  q0.default.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_ga_announcement_shown", {});
  }, []);

  // Listen for stdin data to trigger onDismiss
  q0.default.useEffect(() => {
    // Handler for stdin data event
    const handleStdinData = () => {
      onDismiss();
    };
    // Subscribe to stdin data
    process.stdin.on("data", handleStdinData);
    // Cleanup subscription on unmount or when onDismiss changes
    return () => {
      process.stdin.off("data", handleStdinData);
    };
  }, [onDismiss]);

  // Render the appropriate announcement component based on terminal width
  if (terminalColumns < 50) {
    return q0.default.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else if (terminalColumns < 84) {
    return q0.default.createElement(ClaudeCodeStatsPanel, { onDismiss });
  } else {
    return q0.default.createElement(ClaudeCodeStatsPanel, { onDismiss });
  }
}

module.exports = AnnouncementResponsiveRenderer;