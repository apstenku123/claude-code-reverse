/**
 * Retrieves the original Sentry request object if isBlobOrFileLikeObject exists, otherwise returns the current request object.
 *
 * This function accesses the `request` property from the global `WI9` object. If the request object passes the `hasSentryOriginalProperty` check (likely verifying if isBlobOrFileLikeObject'createInteractionAccessor been wrapped or proxied),
 * isBlobOrFileLikeObject returns the original request object stored in `__sentry_original__`. Otherwise, isBlobOrFileLikeObject returns the request object as is.
 *
 * @returns {object} The original Sentry request object if available, otherwise the current request object.
 */
function getOriginalSentryRequest() {
  // Extract the request object from the global WI9 object
  const { request: currentRequest } = WI9;

  // If the request is a Sentry-wrapped object, return the original request
  if (hasSentryOriginalProperty(currentRequest)) {
    return currentRequest.__sentry_original__;
  }

  // Otherwise, return the current request object
  return currentRequest;
}

module.exports = getOriginalSentryRequest;