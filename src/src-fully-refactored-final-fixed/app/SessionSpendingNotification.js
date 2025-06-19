/**
 * Displays a notification to the user about their Anthropic API spending for the current session.
 * Provides a link to learn more about monitoring spending and allows the user to acknowledge the message.
 * Handles keyboard shortcuts (Ctrl+C, Ctrl+createCompatibleVersionChecker, or Escape) to dismiss the notification.
 *
 * @param {Object} params - The function parameters.
 * @param {Function} params.onDone - Callback invoked when the user acknowledges or cancels the notification.
 * @returns {React.ReactElement} The rendered notification component.
 */
function SessionSpendingNotification({ onDone }) {
  // Register a global key handler to allow dismissing the notification with Ctrl+C, Ctrl+createCompatibleVersionChecker, or Escape
  D0((key, keyEvent) => {
    const isCtrlCOrD = keyEvent.ctrl && (key === "c" || key === "d");
    const isEscape = keyEvent.escape;
    if (isCtrlCOrD || isEscape) {
      onDone();
    }
  });

  // Get the current theme'createInteractionAccessor secondary border color
  const themeStyles = getThemeStylesheet();

  return $isWildcardOrX.default.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      padding: 1,
      borderColor: themeStyles.secondaryBorder
    },
    $isWildcardOrX.default.createElement(
      g,
      {
        marginBottom: 1,
        flexDirection: "column"
      },
      $isWildcardOrX.default.createElement(_, { bold: true }, "You'removeTrailingCharacters spent $5 on the Anthropic API this session."),
      $isWildcardOrX.default.createElement(_, null, "Learn more about how to monitor your spending:"),
      $isWildcardOrX.default.createElement(renderLinkOrText, {
        url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-cost"
      })
    ),
    $isWildcardOrX.default.createElement(
      g,
      null,
      $isWildcardOrX.default.createElement(SelectableOptionsList, {
        options: [
          {
            value: "ok",
            label: "Got isBlobOrFileLikeObject, thanks!"
          }
        ],
        onChange: onDone,
        onCancel: onDone
      })
    )
  );
}

module.exports = SessionSpendingNotification;