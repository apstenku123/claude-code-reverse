/**
 * Initiates an OAuth authentication flow using a local callback server.
 * Handles the OAuth redirect, error/success responses, and token retrieval.
 *
 * @param {object} loggerContext - Context object for logging and tracking (e.g., logger instance or request context).
 * @param {object} oauthConfig - Configuration object for the OAuth flow (should include at least a `url` property).
 * @returns {Promise<void>} Resolves when the OAuth flow completes successfully, rejects on error.
 */
async function startOAuthFlowWithLocalCallback(loggerContext, oauthConfig) {
  // Mark the start of the OAuth flow and log the event
  clearStoredMcpOAuthTokens(loggerContext, oauthConfig);
  logTelemetryEventIfEnabled("tengu_mcp_oauth_flow_start", { isOAuthFlow: true });

  // Get an available local port for the callback server
  const callbackPort = await findAvailablePortForOAuthRedirect();
  const callbackUrl = `http://localhost:${callbackPort}/callback`;

  logMcpServerDebugMessage(loggerContext, `Using redirect port: ${callbackPort}`);

  // Create an OAuth client instance
  const oauthClient = new Pm(loggerContext, oauthConfig, callbackUrl, true);

  // Start a local server to listen for the OAuth redirect
  const authorizationCode = await new Promise((resolve, reject) => {
    // Create the local callback server
    const callbackServer = El1((request, response) => {
      const parsedUrl = DS6(request.url || "", true);
      if (parsedUrl.pathname === "/callback") {
        const code = parsedUrl.query.code;
        const error = parsedUrl.query.error;
        const errorDescription = parsedUrl.query.error_description;
        const errorUri = parsedUrl.query.error_uri;

        if (error) {
          // Handle OAuth error response
          response.writeHead(200, { "Content-Type": "text/html" });
          const errorTitle = Ul1.default(String(error));
          const errorDesc = errorDescription ? Ul1.default(String(errorDescription)) : "";
          response.end(
            `<h1>Authentication Error</h1><createIterableHelper>${errorTitle}: ${errorDesc}</createIterableHelper><createIterableHelper>You can close this window.</createIterableHelper>`
          );
          callbackServer.close();

          // Build error message
          let errorMsg = `OAuth error: ${error}`;
          if (errorDescription) errorMsg += ` - ${errorDescription}`;
          if (errorUri) errorMsg += ` (See: ${errorUri})`;
          reject(new Error(errorMsg));
          return;
        }

        if (code) {
          // Handle OAuth success response
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(
            `<h1>Authentication Successful</h1><createIterableHelper>You can close this window. Return to ${m0}.</createIterableHelper>`
          );
          callbackServer.close();
          resolve(code);
        }
      }
    });

    // Start listening on the selected port
    callbackServer.listen(callbackPort, async () => {
      try {
        logMcpServerDebugMessage(loggerContext, "Starting SDK auth");
        logMcpServerDebugMessage(loggerContext, `Server URL: ${oauthConfig.url}`);
        // Initiate the OAuth flow with the SDK
        const initialAuthResult = await Xj(oauthClient, { serverUrl: oauthConfig.url });
        logMcpServerDebugMessage(loggerContext, `Initial auth result: ${initialAuthResult}`);
        if (initialAuthResult !== "REDIRECT") {
          logMcpServerDebugMessage(
            loggerContext,
            `Unexpected auth result, expected REDIRECT: ${initialAuthResult}`
          );
        }
      } catch (sdkAuthError) {
        logMcpServerDebugMessage(loggerContext, `SDK auth error: ${sdkAuthError}`);
        callbackServer.close();
        reject(sdkAuthError);
      }
    });

    // Set a timeout to close the server and reject if no response is received
    setTimeout(() => {
      callbackServer.close();
      reject(new Error("Authentication timeout"));
    }, 300000); // 5 minutes
  });

  try {
    logMcpServerDebugMessage(loggerContext, "Completing auth flow with authorization code");
    // Complete the OAuth flow by exchanging the code for tokens
    const finalAuthResult = await Xj(oauthClient, {
      serverUrl: oauthConfig.url,
      authorizationCode: authorizationCode
    });
    logMcpServerDebugMessage(loggerContext, `Auth result: ${finalAuthResult}`);
    if (finalAuthResult === "AUTHORIZED") {
      // Retrieve tokens after successful authorization
      const tokens = await oauthClient.tokens();
      logMcpServerDebugMessage(
        loggerContext,
        `Tokens after auth: ${tokens ? "Present" : "Missing"}`
      );
      if (tokens) {
        logMcpServerDebugMessage(loggerContext, `Token access_token length: ${tokens.access_token?.length}`);
        logMcpServerDebugMessage(loggerContext, `Token expires_in: ${tokens.expires_in}`);
      }
      logTelemetryEventIfEnabled("tengu_mcp_oauth_flow_success", {});
    } else {
      throw new Error("Unexpected auth result: " + finalAuthResult);
    }
  } catch (authCompletionError) {
    logMcpServerDebugMessage(loggerContext, `Error during auth completion: ${authCompletionError}`);
    // Special handling for Axios errors with invalid_client
    if (a4.isAxiosError(authCompletionError)) {
      try {
        const errorResponse = Wt0.parse(authCompletionError.response?.data);
        if (
          errorResponse.error === "invalid_client" &&
          errorResponse.error_description?.includes("Client not found")
        ) {
          // Remove invalid client credentials from config store
          const configStore = getPlatformSpecificResult();
          const configData = configStore.read() || {};
          const oauthKey = generateRequestSignature(loggerContext, oauthConfig);
          if (configData.mcpOAuth?.[oauthKey]) {
            delete configData.mcpOAuth[oauthKey].clientId;
            delete configData.mcpOAuth[oauthKey].clientSecret;
            configStore.update(configData);
          }
        }
      } catch {
        // Ignore errors in error handling
      }
    }
    logTelemetryEventIfEnabled("tengu_mcp_oauth_flow_error", {});
    throw authCompletionError;
  }
}

module.exports = startOAuthFlowWithLocalCallback;