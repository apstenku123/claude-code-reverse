/**
 * Handles the OAuth login flow for Claude Code, allowing users to authenticate via Claude or Anthropic Console accounts.
 * Manages UI state, error handling, and API key creation, providing a seamless login experience.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDone - Callback invoked when the login flow is successfully completed.
 * @param {string} [props.startingMessage] - Optional message to display at the start of the login flow.
 * @returns {JSX.Element} The rendered login flow UI.
 */
function OAuthLoginFlowAccessor({
  onDone,
  startingMessage
}) {
  // State for tracking the current step/state of the login flow
  const [loginState, setLoginState] = R9.useState({ state: "idle" });
  // Theme colors/styles
  const theme = getThemeStylesheet();
  // State for manual code input
  const [manualCodeInput, setManualCodeInput] = R9.useState("");
  // State for cursor offset in manual code input
  const [cursorOffset, setCursorOffset] = R9.useState(0);
  // OAuth handler instance
  const [oauthHandler] = R9.useState(() => new AAA());
  // State for login method selection (Claude or Console)
  const [loginWithClaudeAi, setLoginWithClaudeAi] = R9.useState(false);
  // State for whether manual code entry is active
  const [manualEntryActive, setManualEntryActive] = R9.useState(false);
  // Static renderer for header and URL copy UI
  const [staticRenderer] = R9.useState(() => new ZAA());
  // Calculate input field width for manual entry
  const inputFieldWidth = Z4().columns - $T2.length - 1;

  // Handle retry logic when in 'about_to_retry' state
  R9.useEffect(() => {
    if (loginState.state === "about_to_retry") {
      clearConsoleScreen(); // Reset UI/side effects
      staticRenderer.reset();
      setTimeout(() => {
        setLoginState(loginState.nextState);
      }, 1000);
    }
  }, [loginState, staticRenderer]);

  // Listen for Enter key to trigger retry or finish
  D0(async (input, meta) => {
    if (meta.return) {
      if (loginState.state === "success") {
        logTelemetryEventIfEnabled("tengu_oauth_success", { loginWithClaudeAi });
        await clearConsoleScreen();
        onDone();
      } else if (loginState.state === "error" && loginState.toRetry) {
        setManualCodeInput("");
        setLoginState({
          state: "about_to_retry",
          nextState: loginState.toRetry
        });
      }
    }
  });

  /**
   * Handles manual entry of OAuth code and state.
   * @param {string} codeInput - The user input (should be in the format 'code#state').
   * @param {string} loginUrl - The login URL for retry.
   */
  async function handleManualAuthCodeInput(codeInput, loginUrl) {
    try {
      const [authorizationCode, state] = codeInput.split("#");
      if (!authorizationCode || !state) {
        setLoginState({
          state: "error",
          message: "Invalid code. Please make sure the full code was copied",
          toRetry: {
            state: "waiting_for_login",
            url: loginUrl
          }
        });
        return;
      }
      logTelemetryEventIfEnabled("tengu_oauth_manual_entry", {});
      oauthHandler.handleManualAuthCodeInput({
        authorizationCode,
        state
      });
    } catch (error) {
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      setLoginState({
        state: "error",
        message: error.message,
        toRetry: {
          state: "waiting_for_login",
          url: loginUrl
        }
      });
    }
  }

  /**
   * Starts the OAuth login flow and handles all steps, including error handling and API key creation.
   */
  const startOAuthFlow = R9.useCallback(async () => {
    try {
      // Start OAuth flow, open browser for login
      const oauthResult = await oauthHandler.startOAuthFlow(
        async loginUrl => {
          setLoginState({
            state: "waiting_for_login",
            url: loginUrl
          });
          setTimeout(() => setManualEntryActive(true), 3000);
        },
        { loginWithClaudeAi }
      ).catch(error => {
        const isTokenExchangeFailure = error.message.includes("Token exchange failed");
        setLoginState({
          state: "error",
          message: isTokenExchangeFailure
            ? "Failed to exchange authorization code for access token. Please try again."
            : error.message,
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_token_exchange_error", { error: error.message });
        throw error;
      });

      // Check for storage warning
      const storageCheck = saveClaudeAiOauthTokens(oauthResult);
      if (storageCheck.warning) {
        logTelemetryEventIfEnabled("tengu_oauth_storage_warning", { warning: storageCheck.warning });
      }

      setLoginState({ state: "creating_api_key" });

      // Fetch user roles
      await fetchAndStoreUserRoles(oauthResult.accessToken).catch(error => {
        setLoginState({
          state: "error",
          message: "Failed to fetch user roles: " + error.message,
          toRetry: { state: "idle" }
        });
        logTelemetryEventIfEnabled("tengu_oauth_user_roles_error", { error: error.message });
        throw error;
      });

      // If user has required scopes, skip API key creation
      if (OY(oauthResult.scopes)) {
        // All good, proceed
      } else {
        // Create API key
        await YfA(oauthResult.accessToken).catch(error => {
          setLoginState({
            state: "error",
            message: "Failed to create API key: " + error.message,
            toRetry: { state: "idle" }
          });
          logTelemetryEventIfEnabled("tengu_oauth_api_key_error", { error: error.message });
          throw error;
        });
      }

      // Finalize login
      await checkAndSyncDataSharingStatus();
      e1A();
      setLoginState({ state: "success" });
      notifyUserBasedOnConfig({ message: "Claude Code login successful" });
    } catch (error) {
      logTelemetryEventIfEnabled("tengu_oauth_error", { error: error.message });
    }
  }, [oauthHandler, setManualEntryActive, loginWithClaudeAi]);

  // Start OAuth flow when ready
  R9.useEffect(() => {
    if (loginState.state === "ready_to_start") {
      startOAuthFlow();
    }
  }, [loginState.state, startOAuthFlow]);

  /**
   * Renders the main UI based on the current login state.
   * @returns {JSX.Element|null}
   */
  function renderLoginFlowUI() {
    switch (loginState.state) {
      case "idle":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(_, { bold: true },
            startingMessage
              ? startingMessage
              : `${m0} can now be used with your Claude subscription or billed based on API usage through your Console account.`
          ),
          R9.default.createElement(g, { marginTop: 1 },
            R9.default.createElement(_, { bold: true }, "Select login method:")
          ),
          R9.default.createElement(g, null,
            R9.default.createElement(SelectableOptionsList, {
              options: [
                {
                  label: `Claude account with subscription\n   ${FA.dim("Starting at $20/mo for Pro, $100/mo for Max - Best value, predictable pricing")}`,
                  value: "claudeai"
                },
                {
                  label: `Anthropic Console account\n   ${FA.dim("API usage billing")}`,
                  value: "console"
                }
              ],
              onCancel: () => {},
              onChange: selected => {
                setLoginState({ state: "ready_to_start" });
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
          !manualEntryActive && R9.default.createElement(g, null,
            R9.default.createElement(AnimatedStatusText, null),
            R9.default.createElement(_, null, "Opening browser to sign in…")
          ),
          manualEntryActive && R9.default.createElement(g, null,
            R9.default.createElement(_, null, $T2),
            R9.default.createElement(TextInputWithController, {
              value: manualCodeInput,
              onChange: setManualCodeInput,
              onSubmit: input => handleManualAuthCodeInput(input, loginState.url),
              cursorOffset,
              onChangeCursorOffset: setCursorOffset,
              columns: inputFieldWidth
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
          getCachedOrFreshConfig().oauthAccount?.emailAddress
            ? R9.default.createElement(_, { dimColor: true }, "Logged in as", " ", R9.default.createElement(_, null, getCachedOrFreshConfig().oauthAccount?.emailAddress))
            : null,
          R9.default.createElement(_, { color: theme.success },
            "Login successful. Press ",
            R9.default.createElement(_, { bold: true }, "Enter"),
            " to continue…"
          )
        );
      case "error":
        return R9.default.createElement(g, {
          flexDirection: "column",
          gap: 1
        },
          R9.default.createElement(_, { color: theme.error }, "OAuth error: ", loginState.message),
          loginState.toRetry && R9.default.createElement(g, { marginTop: 1 },
            R9.default.createElement(_, { color: theme.permission },
              "Press ",
              R9.default.createElement(_, { bold: true }, "Enter"),
              " to retry."
            )
          )
        );
      default:
        return null;
    }
  }

  // Render static header and URL-to-copy UI if needed
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
    if (loginState.state === "waiting_for_login" && manualEntryActive) {
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
          R9.default.createElement(_, { dimColor: true }, loginState.url)
        )
      );
    }
    staticRenderer.renderStatic(staticElements);
  }, [staticRenderer, loginState, manualEntryActive]);

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
      renderLoginFlowUI()
    )
  );
}

module.exports = OAuthLoginFlowAccessor;