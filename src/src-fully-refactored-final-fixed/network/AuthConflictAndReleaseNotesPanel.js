/**
 * Renders authentication conflict warnings and release notes panel for the network settings UI.
 *
 * This component displays warnings if there are conflicting authentication sources (API keys, tokens, etc.)
 * and also shows release notes if available. It uses several hooks to determine the current authentication
 * state and configuration, and conditionally renders warning messages and release notes accordingly.
 *
 * @returns {React.ReactElement} The rendered panel with any relevant warnings and release notes.
 */
function AuthConflictAndReleaseNotesPanel() {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get current configuration (e.g., last seen release notes)
  const config = getCachedOrFreshConfig();

  // Memoize release notes state based on last seen release notes
  const {
    hasReleaseNotes,
    releaseNotes
  } = f2.useMemo(() => getReleaseNotesInfo(config.lastReleaseNotesSeen), [config.lastReleaseNotesSeen]);

  // Show release notes if available
  f2.useEffect(() => {
    if (hasReleaseNotes) {
      updateLastReleaseNotesVersion();
    }
  }, [hasReleaseNotes]);

  // Get current API key source (e.g., environment variable, helper, none)
  const {
    source: apiKeySource
  } = getAnthropicApiKeySource(false);

  // Determine if there'createInteractionAccessor a conflict between API key and Anthropic Console key
  const isAnthropicApiKeyConflict = !!yi() && (apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper");

  // Get current token source (e.g., claude.ai, environment variable, none)
  const tokenInfo = $81();

  // Get user scopes (permissions)
  const userInfo = X3();

  // Determine if there'createInteractionAccessor a conflict between token and Claude account subscription
  const isClaudeTokenConflict = OY(userInfo?.scopes) && (tokenInfo.source === "ANTHROPIC_AUTH_TOKEN" || tokenInfo.source === "apiKeyHelper");

  // Determine if both a token and an API key are set (general conflict)
  const isGeneralAuthConflict = apiKeySource !== "none" && tokenInfo.source !== "none" && !(apiKeySource === "apiKeyHelper" && tokenInfo.source === "apiKeyHelper");

  // Render the panel
  return f2.createElement(g, {
    flexDirection: "column",
    paddingLeft: 1
  },
    // Divider or header
    f2.createElement(dw5, null),

    // Claude token conflict warning
    isClaudeTokenConflict && f2.createElement(g, {
      flexDirection: "row",
      marginTop: 1
    },
      f2.createElement(_, {
        color: theme.warning
      }, y0.warning),
      f2.createElement(_, {
        color: theme.warning
      },
        "Auth conflict: Using ", tokenInfo.source, " instead of Claude account subscription token. Either unset ", tokenInfo.source, ", or run `claude /logout`."
      )
    ),

    // Anthropic API key conflict warning
    isAnthropicApiKeyConflict && f2.createElement(g, {
      flexDirection: "row",
      marginTop: 1
    },
      f2.createElement(_, {
        color: theme.warning
      }, y0.warning),
      f2.createElement(_, {
        color: theme.warning
      },
        "Auth conflict: Using ", apiKeySource, " instead of Anthropic Console key. Either unset ", apiKeySource, ", or run `claude /logout`."
      )
    ),

    // General token/API key conflict warning with guidance
    isGeneralAuthConflict && f2.createElement(g, {
      flexDirection: "column",
      marginTop: 1
    },
      f2.createElement(g, {
        flexDirection: "row"
      },
        f2.createElement(_, {
          color: theme.warning
        }, y0.warning),
        f2.createElement(_, {
          color: theme.warning
        },
          "Auth conflict: Both a token (", tokenInfo.source, ") and an API key (", apiKeySource, ") are set. This may lead to unexpected behavior."
        )
      ),
      f2.createElement(g, {
        flexDirection: "column",
        marginLeft: 3
      },
        // Guidance for token source
        f2.createElement(_, {
          color: theme.warning
        },
          "• Trying to use ", tokenInfo.source === "claude.ai" ? "claude.ai" : tokenInfo.source, "? ",
          apiKeySource === "ANTHROPIC_API_KEY"
            ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.'
            : apiKeySource === "apiKeyHelper"
              ? "Unset the apiKeyHelper setting."
              : "claude /logout"
        ),
        // Guidance for API key source
        f2.createElement(_, {
          color: theme.warning
        },
          "• Trying to use ", apiKeySource, "? ",
          tokenInfo.source === "claude.ai"
            ? "claude /logout to sign out of claude.ai."
            : `Unset the ${tokenInfo.source} environment variable.`
        )
      )
    ),

    // Release notes panel
    hasReleaseNotes && f2.createElement(g, {
      flexDirection: "column",
      marginTop: 1
    },
      f2.createElement(_, {
        color: theme.secondaryText
      }, "What'createInteractionAccessor new:"),
      f2.createElement(g, {
        flexDirection: "column",
        marginLeft: 1
      },
        releaseNotes.map((note, idx) => f2.createElement(_, {
          key: idx,
          color: theme.secondaryText
        }, "• ", note))
      )
    )
  );
}

// Export the component
module.exports = AuthConflictAndReleaseNotesPanel;