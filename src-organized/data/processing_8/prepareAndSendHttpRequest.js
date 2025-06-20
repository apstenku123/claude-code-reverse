/**
 * Prepares and sends an HTTP request based on the provided request context and options.
 * Handles request cloning, header manipulation, cache control, credentials, and error conditions.
 *
 * @param {object} requestContext - The context object containing the request and related metadata.
 * @param {boolean} [forceNoWindow=false] - If true, forces no-window mode for the request.
 * @param {boolean} [isRetry=false] - If true, indicates this is a retry attempt (used for recursion).
 * @returns {Promise<object>} The HTTP response object, possibly with additional metadata.
 */
async function prepareAndSendHttpRequest(requestContext, forceNoWindow = false, isRetry = false) {
  const originalRequest = requestContext.request;
  let requestClone = null;
  let processedRequest = null;
  let httpResponse = null;
  let unusedVariable = null; // Placeholder for potential future use
  let isNotModified = false;

  // Handle special case: no-window + redirect error
  if (originalRequest.window === "no-window" && originalRequest.redirect === "error") {
    requestClone = requestContext;
    processedRequest = originalRequest;
  } else {
    // Clone and process the request
    processedRequest = kz6(originalRequest);
    requestClone = { ...requestContext };
    requestClone.request = processedRequest;
  }

  // Determine if credentials should be included
  const credentialsIncluded =
    originalRequest.credentials === "include" ||
    (originalRequest.credentials === "same-origin" && originalRequest.responseTainting === "basic");

  // Determine body length for content-length header
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

  // If referrer is a URL, set the referer header
  if (processedRequest.referrer instanceof URL) {
    processedRequest.headersList.append("referer", pY1(processedRequest.referrer.href), true);
  }

  // Apply additional header and request processing
  gz6(processedRequest);
  uz6(processedRequest);

  // Set user-agent if not present
  if (!processedRequest.headersList.contains("user-agent", true)) {
    processedRequest.headersList.append("user-agent", $w6);
  }

  // Adjust cache mode based on conditional headers
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

  // Add pragma/cache-control headers for no-store or reload
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

  // Set accept-encoding if not present
  if (!processedRequest.headersList.contains("accept-encoding", true)) {
    if (tz6(ww(processedRequest))) {
      processedRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
    } else {
      processedRequest.headersList.append("accept-encoding", "gzip, deflate", true);
    }
  }

  // Remove host header
  processedRequest.headersList.delete("host", true);

  // If unusedVariable is null, force cache to no-store
  if (unusedVariable == null) {
    processedRequest.cache = "no-store";
  }

  // If httpResponse is not yet set, send the request
  if (httpResponse == null) {
    // Special case: only-if-cached
    if (processedRequest.cache === "only-if-cached") {
      return o5("only if cached");
    }
    // Send the HTTP request
    const response = await createHttpRequestController(requestClone, credentialsIncluded, isRetry);
    // If method is not in Zw6 and response is 2xx or 3xx, do nothing (placeholder)
    if (!Zw6.has(processedRequest.method) && response.status >= 200 && response.status <= 399) {
      // No-op
    }
    // If isNotModified and response is 304, do nothing (placeholder)
    if (isNotModified && response.status === 304) {
      // No-op
    }
    // Set httpResponse if not already set
    if (httpResponse == null) {
      httpResponse = response;
    }
  }

  // Copy urlList to response
  httpResponse.urlList = [...processedRequest.urlList];
  // Mark if range was requested
  if (processedRequest.headersList.contains("range", true)) {
    httpResponse.rangeRequested = true;
  }
  // Indicate if credentials were included
  httpResponse.requestIncludesCredentials = credentialsIncluded;

  // Handle proxy authentication required
  if (httpResponse.status === 407) {
    if (originalRequest.window === "no-window") {
      return o5();
    }
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    return o5("proxy authentication required");
  }

  // Handle 421 (Misdirected Request) and retry if needed
  if (
    httpResponse.status === 421 &&
    !isRetry &&
    (originalRequest.body == null || originalRequest.body.source != null)
  ) {
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    requestContext.controller.connection.destroy();
    httpResponse = await prepareAndSendHttpRequest(requestContext, forceNoWindow, true);
  }

  return httpResponse;
}

module.exports = prepareAndSendHttpRequest;