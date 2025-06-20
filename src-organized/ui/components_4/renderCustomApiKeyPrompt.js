/**
 * Renders a prompt UI asking the user whether to use a detected custom API key.
 * Updates the configuration based on the user'createInteractionAccessor response and calls the completion callback.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.customApiKeyTruncated - The truncated custom API key to display (e.g., last few characters).
 * @param {Function} params.onDone - Callback to invoke after the user makes a choice.
 * @returns {React.ReactElement} The rendered prompt UI as a React element.
 */
function renderCustomApiKeyPrompt({
  customApiKeyTruncated,
  onDone
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor response to the prompt.
   * Updates the configuration and calls the completion callback.
   *
   * @param {"yes"|"no"} userResponse - The user'createInteractionAccessor response.
   */
  function handleUserResponse(userResponse) {
    // Retrieve the current configuration (cached or fresh)
    const config = getCachedOrFreshConfig();
    switch (userResponse) {
      case "yes": {
        // Add the API key to the list of approved keys
        updateProjectsAccessor({
          ...config,
          customApiKeyResponses: {
            ...config.customApiKeyResponses,
            approved: [
              ...(config.customApiKeyResponses?.approved ?? []),
              customApiKeyTruncated
            ]
          }
        });
        onDone();
        break;
      }
      case "no": {
        // Add the API key to the list of rejected keys
        updateProjectsAccessor({
          ...config,
          customApiKeyResponses: {
            ...config.customApiKeyResponses,
            rejected: [
              ...(config.customApiKeyResponses?.rejected ?? []),
              customApiKeyTruncated
            ]
          }
        });
        onDone();
        break;
      }
      default:
        // No action for other responses
        break;
    }
  }

  // Get keyboard/interaction state for UI hints
  const interactionState = getInteractionState();

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
      React.createElement(
        Text,
        null,
        React.createElement(Text, { bold: true }, "ANTHROPIC_API_KEY"),
        React.createElement(Text, null, ": sk-ant-...", customApiKeyTruncated)
      ),
      React.createElement(Text, null, "normalizeToError you want to use this API key?"),
      React.createElement(SelectInput, {
        defaultValue: "no",
        focusValue: "no",
        options: [
          { label: "Yes", value: "yes" },
          { label: `No (${formatAnsi.bold("recommended")})`, value: "no" }
        ],
        onChange: (value) => handleUserResponse(value),
        onCancel: () => handleUserResponse("no")
      })
    ),
    React.createElement(
      Box,
      { marginLeft: 3 },
      React.createElement(
        Text,
        { dimColor: true },
        interactionState.pending
          ? React.createElement(React.Fragment, null, "Press ", interactionState.keyName, " again to exit")
          : React.createElement(React.Fragment, null, "Enter to confirm ", dotSymbol, " Esc to cancel")
      )
    )
  );
}

// Dependency imports (assumed to be at the top of the file)
// const React = require('react');
// const Box = require('ink').Box;
// const Text = require('ink').Text;
// const SelectInput = require('./SelectInput');
// const getThemeStylesheet = require('config/settings/getThemeStylesheet');
// const getCachedOrFreshConfig = require('./getCachedOrFreshConfig');
// const updateProjectsAccessor = require('patterns/accessors_3/updateProjectsAccessor');
// const getInteractionState = require('./getInteractionState');
// const formatAnsi = require('./formatAnsi');
// const dotSymbol = require('./dotSymbol');

module.exports = renderCustomApiKeyPrompt;