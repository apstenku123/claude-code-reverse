/**
 * Determines if a failed request should be handled based on status codes, targets, and Sentry filtering.
 *
 * @param {Object} requestCriteria - Criteria for failed requests, including status codes and targets.
 * @param {number} statusCode - The HTTP status code of the failed request.
 * @param {string} requestUrl - The URL of the failed request.
 * @returns {boolean} True if the failed request should be handled; false otherwise.
 */
function shouldHandleFailedRequest(requestCriteria, statusCode, requestUrl) {
  // Check if the status code is in the list of failed request status codes
  const isFailedStatusCode = kD9(requestCriteria.failedRequestStatusCodes, statusCode);

  // Check if the request URL matches any failed request targets
  const isFailedTarget = jD9(requestCriteria.failedRequestTargets, requestUrl);

  // Exclude Sentry requests from being handled
  const isSentryRequest = VU.isSentryRequestUrl(requestUrl, VU.getClient());

  // Only handle if all conditions are met and isBlobOrFileLikeObject'createInteractionAccessor not a Sentry request
  return isFailedStatusCode && isFailedTarget && !isSentryRequest;
}

module.exports = shouldHandleFailedRequest;