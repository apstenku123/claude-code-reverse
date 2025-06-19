/**
 * Prepares and sends a network request based on the provided request context and options.
 * Handles request header manipulation, cache control, credentials, and special cases such as proxy authentication and connection errors.
 * 
 * @param {Object} requestContext - The context for the request, including the request object and related metadata.
 * @param {boolean} [forceNoCache=false] - If true, forces no-cache behavior for the request.
 * @param {boolean} [isRetry=false] - Internal flag to indicate if this is a retry after a connection error.
 * @returns {Promise<Object>} The response object from the network request, or an error response if applicable.
 */
async function prepareAndSendNetworkRequest(requestContext, forceNoCache = false, isRetry = false) {
  const originalRequest = requestContext.request;
  let requestToSend = null;
  let processedRequest = null;
  let response = null;
  let connectionError = null;
  let notModified = false;

  // Handle special case: no-window + redirect error
  if (originalRequest.window === "no-window" && originalRequest.redirect === "error") {
    requestToSend = requestContext;
    processedRequest = originalRequest;
  } else {
    // Clone and process the request
    processedRequest = kz6(originalRequest);
    requestToSend = { ...requestContext };
    requestToSend.request = processedRequest;
  }

  // Determine if credentials should be included
  const includesCredentials =
    originalRequest.credentials === "include" ||
    (originalRequest.credentials === "same-origin" && originalRequest.responseTainting === "basic");

  // Calculate content-length header if applicable
  const bodyLength = processedRequest.body ? processedRequest.body.length : null;
  let contentLengthHeader = null;
  if (processedRequest.body == null && ["POST", "PUT"].includes(processedRequest.method)) {
    contentLengthHeader = "0";
  }
  if (bodyLength != null) {
    contentLengthHeader = pY1(`${bodyLength}`);
  }
  if (contentLengthHeader != null) {
    processedRequest.headersList.append("content-length", contentLengthHeader, true);
  }

  // If referrer is a URL, add referer header
  if (processedRequest.referrer instanceof URL) {
    processedRequest.headersList.append("referer", pY1(processedRequest.referrer.href), true);
  }

  // Apply additional request header processing
  gz6(processedRequest);
  uz6(processedRequest);

  // Ensure user-agent header is present
  if (!processedRequest.headersList.contains("user-agent", true)) {
    processedRequest.headersList.append("user-agent", $w6);
  }

  // Adjust cache mode if conditional headers are present
  if (
    processedRequest.cache === "default" &&
    (processedRequest.headersList.contains("if-modified-since", true) ||
      processedRequest.headersList.contains("if-none-match", true) ||
      processedRequest.headersList.contains("if-unmodified-since", true) ||
      processedRequest.headersList.contains("if-match", true) ||
      processedRequest.headersList.contains("if-range", true))
  ) {
    processedRequest.cache = "no-store";
  }

  // Add cache-control header for no-cache mode
  if (
    processedRequest.cache === "no-cache" &&
    !processedRequest.preventNoCacheCacheControlHeaderModification &&
    !processedRequest.headersList.contains("cache-control", true)
  ) {
    processedRequest.headersList.append("cache-control", "max-age=0", true);
  }

  // Add pragma and cache-control headers for no-store or reload
  if (processedRequest.cache === "no-store" || processedRequest.cache === "reload") {
    if (!processedRequest.headersList.contains("pragma", true)) {
      processedRequest.headersList.append("pragma", "no-cache", true);
    }
    if (!processedRequest.headersList.contains("cache-control", true)) {
      processedRequest.headersList.append("cache-control", "no-cache", true);
    }
  }

  // If range header is present, force accept-encoding to identity
  if (processedRequest.headersList.contains("range", true)) {
    processedRequest.headersList.append("accept-encoding", "identity", true);
  }

  // Add accept-encoding header if not present
  if (!processedRequest.headersList.contains("accept-encoding", true)) {
    if (tz6(ww(processedRequest))) {
      processedRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
    } else {
      processedRequest.headersList.append("accept-encoding", "gzip, deflate", true);
    }
  }

  // Remove host header (if present)
  processedRequest.headersList.delete("host", true);

  // If connectionError is null, force cache to no-store
  if (connectionError == null) {
    processedRequest.cache = "no-store";
  }

  // If notModified is false and response is null, proceed with request
  if (response == null) {
    // Special case: only-if-cached cache mode
    if (processedRequest.cache === "only-if-cached") {
      return o5("only if cached");
    }

    // Send the network request
    const networkResponse = await createHttpRequestController(requestToSend, includesCredentials, isRetry);

    // If method is not in Zw6 and response is 2xx or 3xx, do nothing (placeholder)
    if (!Zw6.has(processedRequest.method) && networkResponse.status >= 200 && networkResponse.status <= 399) {
      // No-op (original code had an empty block)
    }

    // If notModified is true and response is 304, do nothing (placeholder)
    if (notModified && networkResponse.status === 304) {
      // No-op (original code had an empty block)
    }

    // Set response if not already set
    if (response == null) {
      response = networkResponse;
    }
  }

  // Copy urlList to response
  response.urlList = [...processedRequest.urlList];

  // Indicate if range was requested
  if (processedRequest.headersList.contains("range", true)) {
    response.rangeRequested = true;
  }

  // Indicate if credentials were included
  response.requestIncludesCredentials = includesCredentials;

  // Handle proxy authentication required
  if (response.status === 407) {
    if (originalRequest.window === "no-window") {
      return o5();
    }
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    return o5("proxy authentication required");
  }

  // Handle 421 (Misdirected Request) with retry logic
  if (
    response.status === 421 &&
    !isRetry &&
    (originalRequest.body == null || originalRequest.body.source != null)
  ) {
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    requestContext.controller.connection.destroy();
    response = await prepareAndSendNetworkRequest(requestContext, forceNoCache, true);
  }

  return response;
}

module.exports = prepareAndSendNetworkRequest;
