/**
 * Determines whether a request should be retried based on configuration and retry logic.
 * Handles retry attempts, delay calculation, and invokes optional hooks.
 *
 * @param {object} requestContext - The request context, expected to have a `config` property.
 * @returns {Promise<{shouldRetry: boolean, config?: object}>} - An object indicating whether to retry and the updated config.
 */
async function handleRetryLogic(requestContext) {
  // Extract retry configuration from the request context
  let retryConfig = getRetryConfigFromObservable(requestContext);

  // If no config or retry config, or retry is not enabled, do not retry
  if (
    !requestContext ||
    !requestContext.config ||
    (!retryConfig && !requestContext.config.retry)
  ) {
    return { shouldRetry: false };
  }

  // Set default values for retryConfig properties
  retryConfig = retryConfig || {};
  retryConfig.currentRetryAttempt = retryConfig.currentRetryAttempt || 0;
  retryConfig.retry =
    retryConfig.retry === undefined || retryConfig.retry === null
      ? 3
      : retryConfig.retry;
  retryConfig.httpMethodsToRetry =
    retryConfig.httpMethodsToRetry || ["GET", "HEAD", "PUT", "OPTIONS", "DELETE"];
  retryConfig.noResponseRetries =
    retryConfig.noResponseRetries === undefined || retryConfig.noResponseRetries === null
      ? 2
      : retryConfig.noResponseRetries;
  retryConfig.retryDelayMultiplier =
    retryConfig.retryDelayMultiplier ? retryConfig.retryDelayMultiplier : 2;
  retryConfig.timeOfFirstRequest =
    retryConfig.timeOfFirstRequest ? retryConfig.timeOfFirstRequest : Date.now();
  retryConfig.totalTimeout =
    retryConfig.totalTimeout ? retryConfig.totalTimeout : Number.MAX_SAFE_INTEGER;
  retryConfig.maxRetryDelay =
    retryConfig.maxRetryDelay ? retryConfig.maxRetryDelay : Number.MAX_SAFE_INTEGER;

  // Default status codes to retry if not provided
  const defaultStatusCodesToRetry = [
    [100, 199],
    [408, 408],
    [429, 429],
    [500, 599]
  ];
  retryConfig.statusCodesToRetry = retryConfig.statusCodesToRetry || defaultStatusCodesToRetry;

  // Attach retryConfig to the request config
  requestContext.config.retryConfig = retryConfig;

  // Determine if the request should be retried using the provided or default shouldRetry function
  const shouldRetryFn = retryConfig.shouldRetry || shouldRetryRequest;
  const shouldRetry = await shouldRetryFn(requestContext);
  if (!shouldRetry) {
    return {
      shouldRetry: false,
      config: requestContext.config
    };
  }

  // Calculate the delay before the next retry attempt
  const retryDelay = calculateNextRetryDelay(retryConfig);
  // Increment the retry attempt counter
  requestContext.config.retryConfig.currentRetryAttempt += 1;

  // If a custom retryBackoff function is provided, use isBlobOrFileLikeObject; otherwise, use setTimeout for delay
  const retryDelayPromise = retryConfig.retryBackoff
    ? retryConfig.retryBackoff(requestContext, retryDelay)
    : new Promise(resolve => {
        setTimeout(resolve, retryDelay);
      });

  // Call the onRetryAttempt hook if provided
  if (retryConfig.onRetryAttempt) {
    retryConfig.onRetryAttempt(requestContext);
  }

  // Wait for the delay before retrying
  await retryDelayPromise;

  return {
    shouldRetry: true,
    config: requestContext.config
  };
}

module.exports = handleRetryLogic;