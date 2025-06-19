/**
 * Renders the welcome panel UI for the application, displaying environment overrides and helpful information.
 *
 * @param {Object} options - The options object.
 * @param {string} options.model - The current model name (unused in this function, but destructured for future extensibility).
 * @returns {React.ReactElement} The React element representing the welcome panel UI.
 */
function renderWelcomePanel({ model }) {
  // Determine the panel width based on demo mode or current working directory length
  const isDemoMode = isTruthyString(process.env.IS_DEMO);
  const cwdLength = getCurrentWorkingDirectory().length;
  const minPanelWidth = 29;
  const defaultPanelWidth = Math.max(minPanelWidth, cwdLength + 12);
  const panelWidth = isDemoMode ? minPanelWidth : defaultPanelWidth;

  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get the current API key (if any)
  const apiKey = getApiKey(false);

  // Get terminal column count
  const { columns: terminalColumns } = getTerminalSize();
  const isNarrowTerminal = terminalColumns < panelWidth;

  // Check if a valid Anthropic API key is present
  const hasValidApiKey = Boolean(
    process.env.ANTHROPIC_API_KEY &&
    validateAnthropicApiKey(process.env.ANTHROPIC_API_KEY)
  );

  // Check if prompt caching is disabled
  const isPromptCachingDisabled = isTruthyString(process.env.DISABLE_PROMPT_CACHING);

  // Determine if any environment overrides are present
  const hasOverrides = Boolean(
    hasValidApiKey ||
    isPromptCachingDisabled ||
    process.env.API_TIMEOUT_MS ||
    process.env.MAX_THINKING_TOKENS ||
    process.env.ANTHROPIC_BASE_URL
  );

  // Render the welcome panel
  return D4.createElement(
    g,
    { flexDirection: "column" },
    D4.createElement(
      g,
      {
        ...(isNarrowTerminal
          ? {}
          : {
              borderColor: theme.claude,
              borderStyle: "round"
            }),
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1,
        width: panelWidth
      },
      // Welcome header
      D4.createElement(
        _,
        null,
        D4.createElement(_, { color: theme.claude }, "✻"),
        " Welcome to ",
        D4.createElement(_, { bold: true }, m0),
        "!"
      ),
      // Help and status info (not shown in demo mode)
      isDemoMode
        ? null
        : D4.createElement(
            D4.Fragment,
            null,
            D4.createElement(
              g,
              {
                paddingLeft: 2,
                flexDirection: "column",
                gap: 1
              },
              D4.createElement(
                _,
                { color: theme.secondaryText, italic: true },
                "/help for help, /status for your current setup"
              ),
              D4.createElement(
                _,
                { color: theme.secondaryText },
                "cwd: ",
                getCurrentWorkingDirectory()
              ),
              false // Placeholder for potential future content
            ),
            // Environment overrides panel
            hasOverrides &&
              D4.createElement(
                g,
                {
                  borderColor: theme.secondaryBorder,
                  borderStyle: "single",
                  borderBottom: false,
                  borderLeft: false,
                  borderRight: false,
                  borderTop: true,
                  flexDirection: "column",
                  marginLeft: 2,
                  marginRight: 1,
                  paddingTop: 1
                },
                D4.createElement(
                  g,
                  { marginBottom: 1 },
                  D4.createElement(
                    _,
                    { color: theme.secondaryText },
                    "Overrides (via env):"
                  )
                ),
                // API Key override
                hasValidApiKey && apiKey
                  ? D4.createElement(
                      _,
                      { color: theme.secondaryText },
                      "• API Key: ",
                      D4.createElement(
                        _,
                        { bold: true },
                        apiKey.length < 25
                          ? `${apiKey.slice(0, 3)}…`
                          : `sk-ant-…${apiKey.slice(-panelWidth + 25)}`
                      )
                    )
                  : null,
                // Prompt caching override
                isPromptCachingDisabled
                  ? D4.createElement(
                      _,
                      { color: theme.secondaryText },
                      "• Prompt caching: ",
                      D4.createElement(
                        _,
                        { color: theme.error, bold: true },
                        "off"
                      )
                    )
                  : null,
                // API timeout override
                process.env.API_TIMEOUT_MS
                  ? D4.createElement(
                      _,
                      { color: theme.secondaryText },
                      "• API timeout: ",
                      D4.createElement(
                        _,
                        { bold: true },
                        process.env.API_TIMEOUT_MS,
                        "ms"
                      )
                    )
                  : null,
                // Max thinking tokens override
                process.env.MAX_THINKING_TOKENS
                  ? D4.createElement(
                      _,
                      { color: theme.secondaryText },
                      "• Max thinking tokens: ",
                      D4.createElement(
                        _,
                        { bold: true },
                        process.env.MAX_THINKING_TOKENS
                      )
                    )
                  : null,
                // Anthropic base URL override
                process.env.ANTHROPIC_BASE_URL
                  ? D4.createElement(
                      _,
                      { color: theme.secondaryText },
                      "• API Base URL: ",
                      D4.createElement(
                        _,
                        { bold: true },
                        process.env.ANTHROPIC_BASE_URL
                      )
                    )
                  : null
              )
          )
    )
  );
}

module.exports = renderWelcomePanel;