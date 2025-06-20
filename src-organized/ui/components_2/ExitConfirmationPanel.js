/**
 * Renders a confirmation panel that prompts the user to press a key again to exit.
 * Integrates with a normalized main loop model and handles completion callbacks.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.onDone - Callback function to be called when the user completes or cancels the action.
 * @param {string} [props.startingMessage] - Optional message to display at the start of the panel.
 * @returns {React.ReactElement} The rendered confirmation panel React element.
 */
function ExitConfirmationPanel(props) {
  // Retrieve the normalized main loop model configuration
  const normalizedMainLoopModel = useNormalizedMainLoopModel();

  // Set up a subscription to handle the exit key logic
  // Calls props.onDone(false, normalizedMainLoopModel) when the subscription completes
  const subscription = useExitKeySubscription(() => props.onDone(false, normalizedMainLoopModel));

  return bI.createElement(
    g,
    { flexDirection: "column" },
    // Render the main message and done handler
    bI.createElement(OAuthLoginFlowAccessor, {
      onDone: () => props.onDone(true, normalizedMainLoopModel),
      startingMessage: props.startingMessage
    }),
    // Render the exit prompt if the exit key is pending
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

module.exports = ExitConfirmationPanel;