/**
 * Renders a prompt UI asking the user whether to use a detected custom API key.
 * Updates the configuration based on the user'createInteractionAccessor response and triggers a callback when done.
 *
 * @param {Object} params - The parameters for the prompt.
 * @param {string} params.customApiKeyTruncated - The truncated API key to display (e.g., last few characters).
 * @param {Function} params.onDone - Callback function to invoke after the user makes a choice.
 * @returns {React.ReactElement} The rendered prompt component.
 */
function CustomApiKeyApprovalPrompt({
  customApiKeyTruncated,
  onDone
}) {
  // Retrieve theme colors/styles
  const theme = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor approval or rejection of the custom API key.
   * Updates the config and calls the onDone callback.
   *
   * @param {"yes"|"no"} userChoice - The user'createInteractionAccessor selection.
   */
  function handleApiKeyResponse(userChoice) {
    // Get the current configuration (cached or fresh)
    const currentConfig = getCachedOrFreshConfig();

    // Prepare updated responses object
    let updatedCustomApiKeyResponses = { ...currentConfig.customApiKeyResponses };

    if (userChoice === "yes") {
      // Add the key to the approved list
      updatedCustomApiKeyResponses.approved = [
        ...(currentConfig.customApiKeyResponses?.approved ?? []),
        customApiKeyTruncated
      ];
    } else if (userChoice === "no") {
      // Add the key to the rejected list
      updatedCustomApiKeyResponses.rejected = [
        ...(currentConfig.customApiKeyResponses?.rejected ?? []),
        customApiKeyTruncated
      ];
    }

    // Update the configuration with the new responses
    updateProjectsAccessor({
      ...currentConfig,
      customApiKeyResponses: updatedCustomApiKeyResponses
    });

    // Notify parent that the process is done
    onDone();
  }

  // Get keyboard state for UI hints
  const keyboardState = getKeyboardState();

  // Render the prompt UI
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Box,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.warning
      },
      React.createElement(Text, { bold: true, color: theme.warning },
        "Detected a custom API key in your environment"
      ),
      React.createElement(Text, null,
        React.createElement(Text, { bold: true }, "ANTHROPIC_API_KEY"),
        React.createElement(Text, null, ": sk-ant-...", customApiKeyTruncated)
      ),
      React.createElement(Text, null, "normalizeToError you want to use this API key?"),
      React.createElement(SelectInput,
        {
          defaultValue: "no",
          focusValue: "no",
          options: [
            { label: "Yes", value: "yes" },
            { label: `No (${formatAnswer.bold("recommended")})`, value: "no" }
          ],
          onChange: (value) => handleApiKeyResponse(value),
          onCancel: () => handleApiKeyResponse("no")
        }
      )
    ),
    React.createElement(
      Box,
      { marginLeft: 3 },
      React.createElement(
        Text,
        { dimColor: true },
        keyboardState.pending
          ? React.createElement(React.Fragment, null, "Press ", keyboardState.keyName, " again to exit")
          : React.createElement(React.Fragment, null, "Enter to confirm ", dotSymbol, " Esc to cancel")
      )
    )
  );
}

// Dependency mapping for clarity
const getThemeStylesheet = getThemeStylesheet;
const getCachedOrFreshConfig = getCachedOrFreshConfig;
const updateProjectsAccessor = updateProjectsAccessor;
const formatAnswer = FA;
const getKeyboardState = useCtrlKeyActionHandler;
const React = lZ.default;
const Box = g;
const Text = _;
const SelectInput = SelectableOptionsList;
const dotSymbol = y0.dot;

module.exports = CustomApiKeyApprovalPrompt;