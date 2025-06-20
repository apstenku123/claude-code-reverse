/**
 * Renders the API key helper panel, displaying authentication conflicts and release notes.
 *
 * This component checks for various authentication sources (Anthropic API key, Claude subscription token, etc.)
 * and displays warnings if there are conflicts. It also shows release notes if available.
 *
 * @returns {React.ReactElement} The rendered API key helper panel.
 */
function RequestApiKeyHelperPanel() {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get configuration (e.g., last release notes seen)
  const config = getCachedOrFreshConfig();

  // Memoize release notes info based on last seen version
  const {
    hasReleaseNotes,
    releaseNotes
  } = f2.useMemo(
    () => getReleaseNotesInfo(config.lastReleaseNotesSeen),
    [config.lastReleaseNotesSeen]
  );

  // If there are new release notes, update the last seen version
  f2.useEffect(() => {
    if (hasReleaseNotes) {
      updateLastReleaseNotesVersion();
    }
  }, [hasReleaseNotes]);

  // Get the current Anthropic API key source
  const {
    source: apiKeySource
  } = getAnthropicApiKeySource(false);

  // Check if the user is using an Anthropic API key from environment or helper
  const isAnthropicApiKeyConflict = !!yi() && (apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper");

  // Get the current Claude subscription token source
  const subscriptionToken = $81();

  // Get the current user scopes
  const userScopes = X3();

  // Check if there is a conflict between Claude subscription token and API key
  const isClaudeTokenConflict =
    OY(userScopes?.scopes) &&
    (subscriptionToken.source === "ANTHROPIC_AUTH_TOKEN" || subscriptionToken.source === "apiKeyHelper");

  // Check if both a token and an API key are set (potential conflict)
  const isTokenAndApiKeyConflict =
    apiKeySource !== "none" &&
    subscriptionToken.source !== "none" &&
    !(apiKeySource === "apiKeyHelper" && subscriptionToken.source === "apiKeyHelper");

  // Render the panel
  return f2.createElement(
    g,
    {
      flexDirection: "column",
      paddingLeft: 1
    },
    // Always render the divider
    f2.createElement(dw5, null),

    // Show warning if Claude subscription token conflict
    isClaudeTokenConflict &&
      f2.createElement(
        g,
        { flexDirection: "row", marginTop: 1 },
        f2.createElement(_, { color: theme.warning }, y0.warning),
        f2.createElement(
          _,
          { color: theme.warning },
          "Auth conflict: Using ",
          subscriptionToken.source,
          " instead of Claude account subscription token. Either unset ",
          subscriptionToken.source,
          ", or run `claude /logout`."
        )
      ),

    // Show warning if Anthropic API key conflict
    isAnthropicApiKeyConflict &&
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

    // Show warning if both token and API key are set
    isTokenAndApiKeyConflict &&
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
            subscriptionToken.source,
            ") and an API key (",
            apiKeySource,
            ") are set. This may lead to unexpected behavior."
          )
        ),
        f2.createElement(
          g,
          { flexDirection: "column", marginLeft: 3 },
          // Suggest resolution for token source
          f2.createElement(
            _,
            { color: theme.warning },
            "• Trying to use ",
            subscriptionToken.source === "claude.ai" ? "claude.ai" : subscriptionToken.source,
            "? ",
            apiKeySource === "ANTHROPIC_API_KEY"
              ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.'
              : apiKeySource === "apiKeyHelper"
                ? "Unset the apiKeyHelper setting."
                : "claude /logout"
          ),
          // Suggest resolution for API key source
          f2.createElement(
            _,
            { color: theme.warning },
            "• Trying to use ",
            apiKeySource,
            "? ",
            subscriptionToken.source === "claude.ai"
              ? "claude /logout to sign out of claude.ai."
              : `Unset the ${subscriptionToken.source} environment variable.`
          )
        )
      ),

    // Show release notes if available
    hasReleaseNotes &&
      f2.createElement(
        g,
        { flexDirection: "column", marginTop: 1 },
        f2.createElement(_, { color: theme.secondaryText }, "What'createInteractionAccessor new:"),
        f2.createElement(
          g,
          { flexDirection: "column", marginLeft: 1 },
          releaseNotes.map((note, idx) =>
            f2.createElement(
              _,
              { key: idx, color: theme.secondaryText },
              "• ",
              note
            )
          )
        )
      )
  );
}

// Export the component
module.exports = RequestApiKeyHelperPanel;