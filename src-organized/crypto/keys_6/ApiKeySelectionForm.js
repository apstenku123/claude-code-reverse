/**
 * Renders a form for selecting or entering an API key, with support for toggling between using an existing key or entering a new one.
 * Handles keyboard navigation (up/down/enter) for selection and submission.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.existingApiKey - Whether an existing API key is available
 * @param {boolean} props.useExistingKey - Whether the user is currently choosing to use the existing API key
 * @param {string} props.apiKey - The current value of the API key input field
 * @param {function} props.onApiKeyChange - Callback for when the API key input changes
 * @param {function} props.onSubmit - Callback for when the form is submitted
 * @param {function} props.onToggleUseExistingKey - Callback for toggling between using an existing key or entering a new one
 * @returns {React.ReactElement} The rendered API key selection form
 */
function ApiKeySelectionForm({
  existingApiKey,
  useExistingKey,
  apiKey,
  onApiKeyChange,
  onSubmit,
  onToggleUseExistingKey
}) {
  // State for cursor offset in the input field
  const [cursorOffset, setCursorOffset] = iZ.useState(0);
  // Get theme styles
  const theme = getThemeStylesheet();
  // Get terminal dimensions
  const terminalDimensions = Z4();

  // Handle keyboard navigation and submission
  D0((_, key) => {
    if (existingApiKey) {
      if (key.upArrow) {
        // Select 'use existing key'
        onToggleUseExistingKey(true);
      } else if (key.downArrow) {
        // Select 'enter new key'
        onToggleUseExistingKey(false);
      }
    }
    if (key.return) {
      // Submit the form
      onSubmit();
    }
  });

  return iZ.default.createElement(
    iZ.default.Fragment,
    null,
    iZ.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      // Header section
      iZ.default.createElement(
        g,
        {
          flexDirection: "column",
          marginBottom: 1
        },
        iZ.default.createElement(_, { bold: true }, "Install GitHub App"),
        iZ.default.createElement(_, { dimColor: true }, "Choose API key")
      ),
      // Option: Use existing API key
      existingApiKey &&
        iZ.default.createElement(
          g,
          { marginBottom: 1 },
          iZ.default.createElement(
            _,
            null,
            useExistingKey ? FA.hex(theme.success)("> ") : "  ",
            "Use your existing Claude Code API key"
          )
        ),
      // Option: Enter a new API key
      iZ.default.createElement(
        g,
        { marginBottom: 1 },
        iZ.default.createElement(
          _,
          null,
          (!useExistingKey || !existingApiKey) ? FA.hex(theme.success)("> ") : "  ",
          "Enter a new API key"
        )
      ),
      // Input field for new API key (only if not using existing key)
      (!useExistingKey || !existingApiKey) &&
        iZ.default.createElement(TextInputWithController, {
          value: apiKey,
          onChange: onApiKeyChange,
          onSubmit: onSubmit,
          onPaste: onApiKeyChange,
          focus: true,
          placeholder: "sk-ant… (Create a new key at https://console.anthropic.com/settings/keys)",
          mask: "*",
          columns: terminalDimensions.columns,
          cursorOffset: cursorOffset,
          onChangeCursorOffset: setCursorOffset,
          showCursor: true
        })
    ),
    // Footer with keyboard hints
    iZ.default.createElement(
      g,
      { marginLeft: 3 },
      iZ.default.createElement(
        _,
        { dimColor: true },
        existingApiKey ? "↑/↓ to select · " : "",
        "Enter to continue"
      )
    )
  );
}

module.exports = ApiKeySelectionForm;