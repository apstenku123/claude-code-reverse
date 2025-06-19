/**
 * Attempts an API call with automatic retries, token refresh, and context limit adjustment.
 *
 * This function attempts to execute an API call, handling authentication errors by refreshing tokens,
 * retrying on certain errors, and dynamically adjusting context/token limits if necessary. It also
 * manages exponential backoff and logs retry attempts and errors.
 *
 * @param {Function} getAuthToken - Async function to obtain a valid authentication token. Called on first attempt and when token is expired/invalid.
 * @param {Function} apiCall - Async function that performs the API call. Receives (authToken, attemptNumber, options) as arguments.
 * @param {Object} options - Configuration options for the API call and retry logic.
 * @param {number} [options.maxRetries] - Maximum number of retry attempts (default: SZ5).
 * @param {string} [options.model] - Model identifier for the API call.
 * @param {boolean} [options.showErrors] - Whether to log errors to the console.
 * @returns {Promise<any>} Resolves with the API call result or throws an error after exhausting retries or on fatal errors.
 */
async function retryWithTokenRefreshAndContextAdjustment(getAuthToken, apiCall, options) {
  const maxRetries = options.maxRetries ?? SZ5;
  let lastError;
  const apiCallOptions = { model: options.model };
  let overloadErrorCount = 0;
  let authToken = null;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      // Refresh token if not present or if previous error was 401 Unauthorized
      if (
        authToken === null ||
        (lastError instanceof g6 && lastError.status === 401)
      ) {
        authToken = await getAuthToken();
      }
      // Attempt the API call
      return await apiCall(authToken, attempt, apiCallOptions);
    } catch (error) {
      lastError = error;

      // Handle API overload errors (custom logic)
      if (isOverloadedError(error) && !R6() && isOpus40Observable(options.model)) {
        overloadErrorCount++;
        if (overloadErrorCount >= _Z5) {
          logTelemetryEventIfEnabled("tengu_api_custom_529_overloaded_error", {});
          throw new TO(new Error(Zc1), apiCallOptions);
        }
      }

      // If max retries exceeded, or error is not retryable, throw
      if (
        attempt > maxRetries ||
        !(error instanceof g6) ||
        !shouldRetryRequest(error)
      ) {
        throw new TO(error, apiCallOptions);
      }

      // If error is context overflow, adjust maxTokensOverride and retry
      if (error instanceof g6) {
        const contextInfo = parseContextLimitError(error);
        if (contextInfo) {
          const { inputTokens, contextLimit } = contextInfo;
          const FLOOR_OUTPUT_TOKENS = Zt1;
          const availableContext = Math.max(0, contextLimit - inputTokens - 1000);
          if (availableContext < FLOOR_OUTPUT_TOKENS) {
            reportErrorIfAllowed(
              new Error(
                `availableContext ${availableContext} is less than FLOOR_OUTPUT_TOKENS ${FLOOR_OUTPUT_TOKENS}`
              )
            );
            throw error;
          }
          const adjustedMaxTokens = Math.max(FLOOR_OUTPUT_TOKENS, availableContext);
          apiCallOptions.maxTokensOverride = adjustedMaxTokens;
          logTelemetryEventIfEnabled("tengu_max_tokens_context_overflow_adjustment", {
            inputTokens,
            contextLimit,
            adjustedMaxTokens,
            attempt
          });
          continue; // Retry with adjusted context
        }
      }

      // Handle retry-after header for backoff
      const retryAfterHeader =
        error.headers?.["retry-after"] ||
        error.headers?.get?.("retry-after") ||
        null;
      const retryDelayMs = calculateRetryDelay(attempt, retryAfterHeader);

      // Optionally log errors to the console
      if (options.showErrors) {
        console.error(
          `  ⎿  ${FA.red(
            `API ${error.name} (${error.message}) · Retrying in ${Math.round(
              retryDelayMs / 1000
            )} seconds… (attempt ${attempt}/${maxRetries})`
          )}`
        );
        if (error.cause instanceof Error) {
          console.error(
            `    ⎿  ${FA.red(
              `${error.cause.name} (${error.cause.message})${
                "code" in error.cause ? ` (${error.cause.code})` : ""
              }`
            )}`
          );
        }
      }

      // Log retry event
      logTelemetryEventIfEnabled("tengu_api_retry", {
        attempt,
        delayMs: retryDelayMs,
        error: error.message,
        status: error.status,
        provider: xU()
      });

      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }
  // If all retries exhausted, throw last error
  throw new TO(lastError, apiCallOptions);
}

module.exports = retryWithTokenRefreshAndContextAdjustment;