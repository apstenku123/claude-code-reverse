/**
 * Renders the API key input step of the CLI onboarding flow.
 * Handles selection between using an existing API key or entering a new one, and manages keyboard navigation.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.existingApiKey - Whether the user already has an API key
 * @param {boolean} props.useExistingKey - Whether the user has chosen to use their existing API key
 * @param {string} props.apiKey - The current value of the API key input
 * @param {function} props.onApiKeyChange - Handler for when the API key input changes
 * @param {function} props.onSubmit - Handler for when the user submits the form
 * @param {function} props.onToggleUseExistingKey - Handler for toggling between using an existing or new API key
 * @returns {React.ReactElement} The rendered API key input step
 */
function ApiKeyInputStep({
  existingApiKey,
  useExistingKey,
  apiKey,
  onApiKeyChange,
  onSubmit,
  onToggleUseExistingKey
}) {
  // State for cursor offset in the input field
  const [cursorOffset, setCursorOffset] = iZ.useState(0);
  // Get current theme styles
  const theme = getThemeStylesheet();
  // Get current terminal window size
  const terminalSize = Z4();

  // Keyboard navigation handler
  D0((_, key) => {
    if (existingApiKey) {
      if (key.upArrow) {
        // Select 'use existing key' option
        onToggleUseExistingKey(true);
      } else if (key.downArrow) {
        // Select 'enter new key' option
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
      // Header
      iZ.default.createElement(
        g,
        { flexDirection: "column", marginBottom: 1 },
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
      // Option: Enter new API key
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
          columns: terminalSize.columns,
          cursorOffset: cursorOffset,
          onChangeCursorOffset: setCursorOffset,
          showCursor: true
        })
    ),
    // Footer instructions
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

module.exports = ApiKeyInputStep;