/**
 * Handles the OAuth login flow for Claude Code, allowing users to authenticate via Claude or Anthropic Console accounts.
 * Manages UI state, error handling, and API key creation, providing feedback and retry mechanisms as needed.
 *
 * @param {Object} params - Parameters for the OAuth login flow.
 * @param {Function} params.onDone - Callback invoked when the login flow is successfully completed.
 * @param {string} [params.startingMessage] - Optional message to display at the start of the flow.
 * @returns {React.ReactElement} The rendered login flow UI component.
 */
function OAuthLoginFlow({
  onDone,
  startingMessage
}) {
  // State management
  const [oauthState, setOauthState] = R9.useState({ state: "idle" });
  const theme = getThemeStylesheet();
  const [manualCodeInput, setManualCodeInput] = R9.useState("");
  const [cursorOffset, setCursorOffset] = R9.useState(0);
  const [oauthClient] = R9.useState(() => new AAA());
  const [loginWithClaudeAi, setLoginWithClaudeAi] = R9.useState(false);
  const [showManualEntry, setShowManualEntry] = R9.useState(false);
  const [staticRenderer] = R9.useState(() => new ZAA());
  const terminalColumns = Z4().columns - $T2.length - 1;

  // Handle retry state transitions
  R9.useEffect(() => {
    if (oauthState.state === "about_to_retry") {
      clearConsoleScreen(); // Reset browser state
      staticRenderer.reset();
      setTimeout(() => {
        setOauthState(oauthState.nextState);
      }, 1000);
    }
  }, [oauthState, staticRenderer]);

  // Listen for global 'Enter' key events to trigger retry or finish
  D0(async (input, meta) => {
    if (meta.return) {
      if (oauthState.state === "success") {
        logTelemetryEventIfEnabled("tengu_oauth_success", { loginWithClaudeAi });
        await clearConsoleScreen();
        onDone();
      } else if (oauthState.state === "error" && oauthState.toRetry) {
        setManualCodeInput("");
        setOauthState({
          state: "about_to_retry",
          nextState: oauthState.toRetry
        });
      }
    }
  });

  /**
   * Handles manual input of the OAuth code and state.
   * @param {string} input - The user input string.
   * @param {string} url - The OAuth URL for retry.
   */
  async function handleManualCodeEntry(input, url) {
    try {
      const [authorizationCode, state] = input.split("#");
      if (!authorizationCode || !state) {
        setOauthState({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url
          }
        });
        return;
      }
      logTelemetryEventIfEnabled("tengu_oauth_manual_entry", {});
      oauthClient.handleManualAuthCodeInput({
        authorizationCode,
        state
      });
    } catch (error) {
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      setOauthState({
        state: "error",
        message: error.message,
        toRetry: {
          state: "waiting_for_login",
          url
        }
      });
    }
  }

  /**
   * Initiates the OAuth login flow and handles all steps, including API key creation.
   */
  const startOAuthFlow = R9.useCallback(async () => {
    try {
      // Start OAuth flow, open browser, and wait for user login
      const oauthResult = await oauthClient.startOAuthFlow(async (loginUrl) => {
        setOauthState({
          state: "waiting_for_login",
          url: loginUrl
        });
        // Show manual entry after a delay if browser didn'processRuleBeginHandlers open
        setTimeout(() => setShowManualEntry(true), 3000);
      }, {
        loginWithClaudeAi
      }).catch(error => {
        const isTokenExchangeError = error.message.includes("Token exchange failed");
        setOauthState({
          state: "error",
          message: isTokenExchangeError ?
            "Failed to exchange authorization code for access token. Please try again." :
            error.message,
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_token_exchange_error", { error: error.message });
        throw error;
      });

      // Check for storage warnings
      const storageCheck = saveClaudeAiOauthTokens(oauthResult);
      if (storageCheck.warning) {
        logTelemetryEventIfEnabled("tengu_oauth_storage_warning", { warning: storageCheck.warning });
      }

      setOauthState({ state: "creating_api_key" });

      // Fetch user roles to verify access
      await fetchAndStoreUserRoles(oauthResult.accessToken).catch(error => {
        setOauthState({
          state: "error",
          message: "Failed to fetch user roles: " + error.message,
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_user_roles_error", { error: error.message });
        throw error;
      });

      // If allowed, create API key
      if (OY(oauthResult.scopes) ? true : await YfA(oauthResult.accessToken).catch(error => {
        setOauthState({
          state: "error",
          message: "Failed to create API key: " + error.message,
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_api_key_error", { error: error.message });
        throw error;
      })) {
        await checkAndSyncDataSharingStatus();
        e1A();
        setOauthState({ state: "success" });
        notifyUserBasedOnConfig({ message: "Claude Code login successful" });
      } else {
        setOauthState({
          state: "error",
          message: "Unable to create API key. The server accepted the request but didn'processRuleBeginHandlers return a key.",
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_api_key_error", { error: "server_returned_no_key" });
      }
    } catch (error) {
      logTelemetryEventIfEnabled("tengu_oauth_error", { error: error.message });
    }
  }, [oauthClient, setShowManualEntry, loginWithClaudeAi]);

  // Start OAuth flow when ready
  R9.useEffect(() => {
    if (oauthState.state === "ready_to_start") {
      startOAuthFlow();
    }
  }, [oauthState.state, startOAuthFlow]);

  /**
   * Renders the UI for the current OAuth state.
   * @returns {React.ReactElement|null}
   */
  function renderContent() {
    switch (oauthState.state) {
      case "idle":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(_, { bold: true }, startingMessage ? startingMessage : `${m0} can now be used with your Claude subscription or billed based on API usage through your Console account.`),
          R9.default.createElement(g, { marginTop: 1 },
            R9.default.createElement(_, { bold: true }, "Select login method:")
          ),
          R9.default.createElement(g, null,
            R9.default.createElement(SelectableOptionsList, {
              options: [
                {
                  label: `Claude account with subscription\n   ${FA.dim("Starting at $20/mo for Pro, $100/mo for Max - Best value, predictable pricing")}\n`,
                  value: "claudeai"
                },
                {
                  label: `Anthropic Console account\n   ${FA.dim("API usage billing")}\n`,
                  value: "console"
                }
              ],
              onCancel: () => {},
              onChange: (selected) => {
                setOauthState({ state: "ready_to_start" });
                if (selected === "claudeai") {
                  logTelemetryEventIfEnabled("tengu_oauth_claudeai_selected", {});
                  setLoginWithClaudeAi(true);
                } else {
                  logTelemetryEventIfEnabled("tengu_oauth_console_selected", {});
                  setLoginWithClaudeAi(false);
                }
              }
            })
          )
        );
      case "waiting_for_login":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          !showManualEntry && R9.default.createElement(g, null,
            R9.default.createElement(AnimatedStatusText, null),
            R9.default.createElement(_, null, "Opening browser to sign in…")
          ),
          showManualEntry && R9.default.createElement(g, null,
            R9.default.createElement(_, null, $T2),
            R9.default.createElement(TextInputWithController, {
              value: manualCodeInput,
              onChange: setManualCodeInput,
              onSubmit: (input) => handleManualCodeEntry(input, oauthState.url),
              cursorOffset,
              onChangeCursorOffset: setCursorOffset,
              columns: terminalColumns
            })
          )
        );
      case "creating_api_key":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(g, null,
            R9.default.createElement(AnimatedStatusText, null),
            R9.default.createElement(_, null, "Creating API key for Claude Code…")
          )
        );
      case "about_to_retry":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(_, { color: theme.permission }, "Retrying…")
        );
      case "success":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 2
        },
          getCachedOrFreshConfig().oauthAccount?.emailAddress ?
            R9.default.createElement(_, { dimColor: true }, "Logged in as", " ", R9.default.createElement(_, null, getCachedOrFreshConfig().oauthAccount?.emailAddress)) : null,
          R9.default.createElement(_, { color: theme.success }, "Login successful. Press ", R9.default.createElement(_, { bold: true }, "Enter"), " to continue…")
        );
      case "error":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(_, { color: theme.error }, "OAuth error: ", oauthState.message),
          oauthState.toRetry && R9.default.createElement(g, { marginTop: 1 },
            R9.default.createElement(_, { color: theme.permission }, "Press ", R9.default.createElement(_, { bold: true }, "Enter"), " to retry.")
          )
        );
      default:
        return null;
    }
  }

  // Render static UI elements (header, url to copy) using the static renderer
  R9.useEffect(() => {
    const staticElements = {};
    staticElements.header = R9.default.createElement(g, {
      key: "header",
      flexDirection: "column",
      gap: 1
    },
      R9.default.createElement(renderWelcomeBanner, null),
      R9.default.createElement(g, { paddingBottom: 1, paddingLeft: 1 },
        R9.default.createElement(renderAsciiArtBanner, null)
      )
    );
    if (oauthState.state === "waiting_for_login" && showManualEntry) {
      staticElements.urlToCopy = R9.default.createElement(g, {
        flexDirection: "column",
        key: "urlToCopy",
        gap: 1,
        paddingBottom: 1
      },
        R9.default.createElement(g, { paddingX: 1 },
          R9.default.createElement(_, { dimColor: true }, "Browser didn'processRuleBeginHandlers open? Use the url below to sign in:")
        ),
        R9.default.createElement(g, { width: 1000 },
          R9.default.createElement(_, { dimColor: true }, oauthState.url)
        )
      );
    }
    staticRenderer.renderStatic(staticElements);
  }, [staticRenderer, oauthState, showManualEntry]);

  // Main render
  return R9.default.createElement(g, {
    flexDirection: "column",
    gap: 1
  },
    R9.default.createElement(g, {
      paddingLeft: 1,
      flexDirection: "column",
      gap: 1
    },
      renderContent()
    )
  );
}

module.exports = OAuthLoginFlow;