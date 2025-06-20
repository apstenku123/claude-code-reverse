/**
 * Renders authentication status and conflict warnings for API key and token usage, 
 * as well as release notes if available. Handles detection of conflicting auth sources 
 * and provides user guidance for resolution.
 *
 * @returns {React.ReactElement} The rendered authentication status and release notes UI.
 */
function RequestApiKeyHelperStatus() {
  // Theme colors and styles
  const theme = getThemeStylesheet();

  // User configuration, including last seen release notes
  const userConfig = getCachedOrFreshConfig();

  // Memoized release notes state
  const {
    hasReleaseNotes: hasNewReleaseNotes,
    releaseNotes: releaseNotesList
  } = f2.useMemo(
    () => getReleaseNotesInfo(userConfig.lastReleaseNotesSeen),
    [userConfig.lastReleaseNotesSeen]
  );

  // Show release notes if available
  f2.useEffect(() => {
    if (hasNewReleaseNotes) {
      updateLastReleaseNotesVersion();
    }
  }, [hasNewReleaseNotes]);

  // Current API key source
  const {
    source: apiKeySource
  } = getAnthropicApiKeySource(false);

  // Is there a potential API key conflict?
  const isApiKeyConflict = !!yi() && (apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper");

  // Current token source
  const tokenSourceInfo = $81();

  // User scopes
  const userScopes = X3();

  // Is there a token conflict (e.g., both token and API key present)?
  const isTokenConflict = OY(userScopes?.scopes) && (tokenSourceInfo.source === "ANTHROPIC_AUTH_TOKEN" || tokenSourceInfo.source === "apiKeyHelper");

  // Are both a token and an API key set (general conflict)?
  const isGeneralAuthConflict =
    apiKeySource !== "none" &&
    tokenSourceInfo.source !== "none" &&
    !(apiKeySource === "apiKeyHelper" && tokenSourceInfo.source === "apiKeyHelper");

  // Render UI
  return f2.createElement(
    g,
    {
      flexDirection: "column",
      paddingLeft: 1
    },
    // Always render the divider
    f2.createElement(dw5, null),

    // Token conflict warning
    isTokenConflict &&
      f2.createElement(
        g,
        { flexDirection: "row", marginTop: 1 },
        f2.createElement(_, { color: theme.warning }, y0.warning),
        f2.createElement(
          _,
          { color: theme.warning },
          "Auth conflict: Using ",
          tokenSourceInfo.source,
          " instead of Claude account subscription token. Either unset ",
          tokenSourceInfo.source,
          ", or run `claude /logout`."
        )
      ),

    // API key conflict warning
    isApiKeyConflict &&
      f2.createElement(
        g,
        { flexDirection: "row", marginTop: 1 },
        f2.createElement(_, { color: theme.warning }, y0.warning),
        f2.createElement(
          _,
          { color: theme.warning },
          "Auth conflict: Using ",
          apiKeySource,
          " instead of Anthropic Console key. Either unset ",
          apiKeySource,
          ", or run `claude /logout`."
        )
      ),

    // General auth conflict warning (both token and API key set)
    isGeneralAuthConflict &&
      f2.createElement(
        g,
        { flexDirection: "column", marginTop: 1 },
        f2.createElement(
          g,
          { flexDirection: "row" },
          f2.createElement(_, { color: theme.warning }, y0.warning),
          f2.createElement(
            _,
            { color: theme.warning },
            "Auth conflict: Both a token (",
            tokenSourceInfo.source,
            ") and an API key (",
            apiKeySource,
            ") are set. This may lead to unexpected behavior."
          )
        ),
        f2.createElement(
          g,
          { flexDirection: "column", marginLeft: 3 },
          f2.createElement(
            _,
            { color: theme.warning },
            "• Trying to use ",
            tokenSourceInfo.source === "claude.ai" ? "claude.ai" : tokenSourceInfo.source,
            "? ",
            apiKeySource === "ANTHROPIC_API_KEY"
              ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.'
              : apiKeySource === "apiKeyHelper"
                ? "Unset the apiKeyHelper setting."
                : "claude /logout"
          ),
          f2.createElement(
            _,
            { color: theme.warning },
            "• Trying to use ",
            apiKeySource,
            "? ",
            tokenSourceInfo.source === "claude.ai"
              ? "claude /logout to sign out of claude.ai."
              : `Unset the ${tokenSourceInfo.source} environment variable.`
          )
        )
      ),

    // Release notes section
    hasNewReleaseNotes &&
      f2.createElement(
        g,
        { flexDirection: "column", marginTop: 1 },
        f2.createElement(_, { color: theme.secondaryText }, "What'createInteractionAccessor new:"),
        f2.createElement(
          g,
          { flexDirection: "column", marginLeft: 1 },
          releaseNotesList.map((releaseNote, index) =>
            f2.createElement(
              _,
              { key: index, color: theme.secondaryText },
              "• ",
              releaseNote
            )
          )
        )
      )
  );
}

module.exports = RequestApiKeyHelperStatus;