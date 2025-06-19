/**
 * Renders a confirmation prompt UI for exiting an operation, with support for a custom starting message and keyboard shortcut handling.
 *
 * @param {Object} props - The properties for the confirmation prompt.
 * @param {function} props.onDone - Callback invoked when the user confirms or cancels exit. Receives (didConfirm, config) as arguments.
 * @param {string} [props.startingMessage] - Optional initial message to display to the user.
 * @returns {React.ReactElement} The rendered confirmation prompt component.
 */
function ExitConfirmationPrompt(props) {
  // Retrieve configuration/state from main loop model accessor
  const config = useMainLoopModelAccessor();

  // Set up a subscription to handle keyboard shortcut for exit
  const subscription = useKeyboardShortcut(() => props.onDone(false, config));

  return bI.createElement(
    g,
    { flexDirection: "column" },
    // Render the main confirmation message and handler
    bI.createElement(OAuthLoginFlowAccessor, {
      onDone: () => props.onDone(true, config),
      startingMessage: props.startingMessage
    }),
    // Render the keyboard shortcut hint if pending
    bI.createElement(
      g,
      { marginLeft: 3 },
      bI.createElement(
        _,
        { dimColor: true },
        subscription.pending
          ? bI.createElement(
              bI.Fragment,
              null,
              "Press ",
              subscription.keyName,
              " again to exit"
            )
          : ""
      )
    )
  );
}

module.exports = ExitConfirmationPrompt;