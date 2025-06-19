/**
 * Attempts to execute an API call with automatic retries, error handling, and dynamic context adjustment.
 *
 * @param {Function} getAuthToken - Async function to retrieve or refresh the authentication token.
 * @param {Function} apiCall - Async function to perform the API call. Receives (authToken, attemptNumber, options).
 * @param {Object} options - Configuration options for the API call and retry logic.
 * @param {number} [options.maxRetries] - Maximum number of retry attempts (default: SZ5).
 * @param {string} [options.model] - Model identifier for the API call.
 * @param {boolean} [options.showErrors] - Whether to log errors to the console.
 * @returns {Promise<any>} The result of the successful API call, or throws an error after exhausting retries.
 */
async function executeWithApiRetry(getAuthToken, apiCall, options) {
  const maxRetries = options.maxRetries ?? SZ5;
  let lastError;
  const apiCallOptions = {
    model: options.model
  };
  let overloadErrorCount = 0;
  let authToken = null;

  // Attempt the API call up to maxRetries + 1 times
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      // Refresh auth token if not present or if last error was 401 Unauthorized
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

      // Handle API overload errors
      if (isOverloadedError(error) && !R6() && isOpus40Observable(options.model)) {
        overloadErrorCount++;
        if (overloadErrorCount >= _Z5) {
          logTelemetryEventIfEnabled("tengu_api_custom_529_overloaded_error", {});
          throw new TO(new Error(Zc1), apiCallOptions);
        }
      }

      // If out of retries, or error is not retryable, throw wrapped error
      if (
        attempt > maxRetries ||
        !(error instanceof g6) ||
        !shouldRetryRequest(error)
      ) {
        throw new TO(error, apiCallOptions);
      }

      // Handle context overflow errors (e.g., token limits)
      if (error instanceof g6) {
        const contextInfo = parseContextLimitError(error);
        if (contextInfo) {
          const { inputTokens, contextLimit } = contextInfo;
          const FLOOR_OUTPUT_TOKENS = Zt1;
          const SAFETY_MARGIN = 1000;
          const availableContext = Math.max(0, contextLimit - inputTokens - SAFETY_MARGIN);

          if (availableContext < FLOOR_OUTPUT_TOKENS) {
            reportErrorIfAllowed(new Error(`availableContext ${availableContext} is less than FLOOR_OUTPUT_TOKENS ${FLOOR_OUTPUT_TOKENS}`));
            throw error;
          }

          // Adjust max tokens for the next attempt
          const adjustedMaxTokens = Math.max(FLOOR_OUTPUT_TOKENS, availableContext);
          apiCallOptions.maxTokensOverride = adjustedMaxTokens;
          logTelemetryEventIfEnabled("tengu_max_tokens_context_overflow_adjustment", {
            inputTokens,
            contextLimit,
            adjustedMaxTokens,
            attempt
          });
          continue; // Retry immediately with new context
        }
      }

      // Handle retry-after header for rate limiting
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

      // Emit retry telemetry/event
      logTelemetryEventIfEnabled("tengu_api_retry", {
        attempt,
        delayMs: retryDelayMs,
        error: error.message,
        status: error.status,
        provider: xU()
      });

      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, retryDelayMs));
    }
  }

  // If all retries exhausted, throw the last error wrapped
  throw new TO(lastError, apiCallOptions);
}

module.exports = executeWithApiRetry;