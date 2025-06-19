/**
 * AuthStatusPanel
 *
 * Displays authentication status, warnings, and release notes for the network module.
 * Shows conflicts between different authentication sources (API key, token, etc.) and provides guidance to resolve them.
 * Also displays release notes if available.
 *
 * @returns {React.ReactElement} The rendered authentication status panel.
 */
function AuthStatusPanel() {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get current configuration (e.g., last seen release notes)
  const config = getCachedOrFreshConfig();

  // Memoize release notes info based on last seen release notes
  const {
    hasReleaseNotes,
    releaseNotes
  } = f2.useMemo(() => getReleaseNotesInfo(config.lastReleaseNotesSeen), [config.lastReleaseNotesSeen]);

  // Show release notes if available
  f2.useEffect(() => {
    if (hasReleaseNotes) updateLastReleaseNotesVersion();
  }, [hasReleaseNotes]);

  // Get current API key source
  const {
    source: apiKeySource
  } = getAnthropicApiKeySource(false);

  // Determine if there'createInteractionAccessor an API key conflict (Anthropic API key or helper)
  const isApiKeyConflict = !!yi() && (apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper");

  // Get current token source
  const tokenInfo = $81();

  // Get user scopes (permissions)
  const userInfo = X3();

  // Determine if there'createInteractionAccessor a token conflict (using both token and API key helper)
  const hasTokenConflict = OY(userInfo?.scopes) && (tokenInfo.source === "ANTHROPIC_AUTH_TOKEN" || tokenInfo.source === "apiKeyHelper");

  // Determine if both a token and an API key are set (general conflict)
  const hasGeneralAuthConflict = apiKeySource !== "none" && tokenInfo.source !== "none" && !(apiKeySource === "apiKeyHelper" && tokenInfo.source === "apiKeyHelper");

  // Render the status panel
  return f2.createElement(g, {
    flexDirection: "column",
    paddingLeft: 1
  },
    // Always show the divider
    f2.createElement(dw5, null),

    // Show token conflict warning
    hasTokenConflict && f2.createElement(g, {
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

    // Show API key conflict warning
    isApiKeyConflict && f2.createElement(g, {
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

    // Show general authentication conflict warning
    hasGeneralAuthConflict && f2.createElement(g, {
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
      // Provide guidance for resolving the conflict
      f2.createElement(g, {
        flexDirection: "column",
        marginLeft: 3
      },
        f2.createElement(_, {
          color: theme.warning
        },
          "• Trying to use",
          " ",
          tokenInfo.source === "claude.ai" ? "claude.ai" : tokenInfo.source,
          "?",
          " ",
          apiKeySource === "ANTHROPIC_API_KEY"
            ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.'
            : apiKeySource === "apiKeyHelper"
              ? "Unset the apiKeyHelper setting."
              : "claude /logout"
        ),
        f2.createElement(_, {
          color: theme.warning
        },
          "• Trying to use ", apiKeySource, "?",
          " ",
          tokenInfo.source === "claude.ai"
            ? "claude /logout to sign out of claude.ai."
            : `Unset the ${tokenInfo.source} environment variable.`
        )
      )
    ),

    // Show release notes if available
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

module.exports = AuthStatusPanel;