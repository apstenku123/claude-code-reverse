/**
 * Renders a UI component that prompts the user to confirm exiting an operation.
 * Displays a starting message and, if a pending state is detected, instructs the user to press a key again to exit.
 *
 * @param {Object} props - The properties for the component.
 * @param {function} props.onDone - Callback invoked when the exit process is completed or cancelled.
 * @param {string} props.startingMessage - The initial message to display to the user.
 * @returns {React.ReactElement} The rendered exit prompt component.
 */
function ExitPromptComponent(props) {
  // Retrieve configuration or context needed for the exit process
  const config = useMainLoopModelAccessor();

  // Set up a subscription or listener for the exit process
  // Calls props.onDone(false, config) when triggered
  const subscription = useCtrlKeyActionHandler(() => props.onDone(false, config));

  return bI.createElement(
    g,
    { flexDirection: "column" },
    // Render the starting message and handle the 'onDone' event
    bI.createElement(OAuthLoginFlowAccessor, {
      onDone: () => props.onDone(true, config),
      startingMessage: props.startingMessage
    }),
    // Render the exit prompt if the subscription is pending
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

module.exports = ExitPromptComponent;