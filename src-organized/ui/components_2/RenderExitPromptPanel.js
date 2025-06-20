/**
 * Renders a panel prompting the user to confirm exit, with a message and key hint.
 *
 * @param {Object} props - The properties for the exit prompt panel.
 * @param {function(boolean, any):void} props.onDone - Callback invoked when the user completes or cancels the exit action.
 * @param {string} props.startingMessage - The initial message to display to the user.
 * @returns {React.ReactElement} The rendered exit prompt panel React element.
 */
function RenderExitPromptPanel(props) {
  // Retrieve configuration or context needed for the exit action
  const config = useMainLoopModelAccessor();

  // Set up a subscription or listener for the exit action
  const subscription = useCtrlKeyActionHandler(() => props.onDone(false, config));

  return bI.createElement(
    g,
    { flexDirection: "column" },
    // Render the main exit prompt message and handler
    bI.createElement(OAuthLoginFlowAccessor, {
      onDone: () => props.onDone(true, config),
      startingMessage: props.startingMessage
    }),
    // Render the key hint message if the exit action is pending
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

module.exports = RenderExitPromptPanel;