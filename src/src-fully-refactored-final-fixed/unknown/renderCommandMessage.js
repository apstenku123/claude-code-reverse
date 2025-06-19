/**
 * Renders a command message component with optional margin and themed text color.
 *
 * @param {Object} options - The options for rendering the command message.
 * @param {boolean} options.addMargin - Whether to add a top margin to the component.
 * @param {Object} options.param - The parameter object containing the command text.
 * @param {string} options.param.text - The command text to be parsed and displayed.
 * @returns {React.ReactElement|null} The rendered command message component, or null if no command is found.
 */
function renderCommandMessage({
  addMargin,
  param: {
    text: commandText
  }
}) {
  // Extract the command message from the text
  const commandMessage = fG(commandText, "command-message");
  // Extract the command arguments from the text
  const commandArguments = fG(commandText, "command-args");

  // If there is no command message, do not render anything
  if (!commandMessage) return null;

  // Get the current theme'createInteractionAccessor stylesheet
  const themeStyles = getThemeStylesheet();

  // Render the command message with optional margin and themed text color
  return S11.createElement(
    g,
    {
      flexDirection: "column",
      marginTop: addMargin ? 1 : 0,
      width: "100%"
    },
    S11.createElement(
      _,
      { color: themeStyles.secondaryText },
      "> /",
      commandMessage,
      " ",
      commandArguments
    )
  );
}

module.exports = renderCommandMessage;