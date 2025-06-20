/**
 * Renders a warning message in a styled row with optional top margin.
 *
 * @function WarningMessageRow
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message object containing the content to display.
 * @param {string} props.message.content - The warning message text to display.
 * @param {boolean} [props.addMargin=false] - Whether to add a top margin to the row.
 * @returns {React.ReactElement} The rendered warning message row component.
 */
function WarningMessageRow({
  message,
  addMargin = false
}) {
  // Get the current terminal window size (columns)
  const { columns: terminalColumns } = useTerminalWindowSize();

  // Extract the message content and trim whitespace
  const trimmedMessageContent = message.content.trim();

  // Get the warning color from the current theme stylesheet
  const warningColor = getThemeStylesheet().warning;

  // Render the warning message inside a styled row and column
  return sj.createElement(
    g, // Row container
    {
      flexDirection: "row",
      marginTop: addMargin ? 1 : 0,
      width: "100%"
    },
    sj.createElement(
      g, // Column container
      {
        flexDirection: "column",
        width: terminalColumns - 10 // Leave some padding on the right
      },
      sj.createElement(
        _, // Text element with warning color
        {
          color: warningColor,
          wrap: "wrap"
        },
        trimmedMessageContent
      )
    )
  );
}

module.exports = WarningMessageRow;