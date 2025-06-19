/**
 * Processes an HTTP request object, prepares headers and options, handles caching and credentials,
 * and delegates the actual network request to a controller. Handles special cases such as redirects,
 * authentication, and proxy requirements. Returns the final response object.
 *
 * @param {Object} requestContext - The context object containing the request and related metadata.
 * @param {boolean} [forceReload=false] - If true, forces a reload bypassing cache.
 * @param {boolean} [isRetry=false] - Internal flag to indicate if this is a retry attempt.
 * @returns {Promise<Object>} The HTTP response object with metadata and status.
 */
async function processHttpRequest(requestContext, forceReload = false, isRetry = false) {
  const originalRequest = requestContext.request;
  let processedRequestContext = null;
  let processedRequest = null;
  let response = null;
  let unusedVariable = null; // Placeholder for processCssDeclarations in original code, not used
  let isNotModified = false;

  // Handle special case: no window and redirect error
  if (originalRequest.window === "no-window" && originalRequest.redirect === "error") {
    processedRequestContext = requestContext;
    processedRequest = originalRequest;
  } else {
    // Clone and process the request
    processedRequest = kz6(originalRequest);
    processedRequestContext = { ...requestContext };
    processedRequestContext.request = processedRequest;
  }

  // Determine if credentials should be included
  const includesCredentials =
    originalRequest.credentials === "include" ||
    (originalRequest.credentials === "same-origin" && originalRequest.responseTainting === "basic");

  // Determine body length for content-length header
  const bodyLength = processedRequest.body ? processedRequest.body.length : null;
  let contentLengthHeader = null;

  // Set content-length header for POST/PUT with no body
  if (processedRequest.body == null && ["POST", "PUT"].includes(processedRequest.method)) {
    contentLengthHeader = "0";
  }
  // Set content-length header if body length is known
  if (bodyLength != null) {
    contentLengthHeader = pY1(`${bodyLength}`);
  }
  // Append content-length header if determined
  if (contentLengthHeader != null) {
    processedRequest.headersList.append("content-length", contentLengthHeader, true);
  }

  // If body length is known and keepalive is set, do nothing (placeholder for future logic)
  if (bodyLength != null && processedRequest.keepalive) {
    // No operation in original code
  }

  // Set referer header if referrer is a URL
  if (processedRequest.referrer instanceof URL) {
    processedRequest.headersList.append("referer", pY1(processedRequest.referrer.href), true);
  }

  // Apply additional header and request processing
  gz6(processedRequest);
  uz6(processedRequest);

  // Ensure user-agent header is present
  if (!processedRequest.headersList.contains("user-agent", true)) {
    processedRequest.headersList.append("user-agent", $w6);
  }

  // Adjust cache mode if conditional headers are present
  if (
    processedRequest.cache === "default" &&
    (
      processedRequest.headersList.contains("if-modified-since", true) ||
      processedRequest.headersList.contains("if-none-match", true) ||
      processedRequest.headersList.contains("if-unmodified-since", true) ||
      processedRequest.headersList.contains("if-match", true) ||
      processedRequest.headersList.contains("if-range", true)
    )
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

  // Set accept-encoding header if not present
  if (!processedRequest.headersList.contains("accept-encoding", true)) {
    if (tz6(ww(processedRequest))) {
      processedRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
    } else {
      processedRequest.headersList.append("accept-encoding", "gzip, deflate", true);
    }
  }

  // Remove host header (for security and compliance)
  processedRequest.headersList.delete("host", true);

  // If unusedVariable is null, force cache to no-store (original logic placeholder)
  if (unusedVariable == null) {
    processedRequest.cache = "no-store";
  }

  // If cache is not no-store or reload, do nothing (placeholder)
  if (processedRequest.cache !== "no-store" && processedRequest.cache !== "reload") {
    // No operation in original code
  }

  // If response is not yet set, perform the network request
  if (response == null) {
    // If only-if-cached is set, return error
    if (processedRequest.cache === "only-if-cached") {
      return o5("only if cached");
    }
    // Perform the actual HTTP request
    const httpResponse = await createHttpRequestController(processedRequestContext, includesCredentials, isRetry);
    // If method is not in Zw6 and status is 2xx-3xx, do nothing (placeholder)
    if (!Zw6.has(processedRequest.method) && httpResponse.status >= 200 && httpResponse.status <= 399) {
      // No operation in original code
    }
    // If isNotModified and status is 304, do nothing (placeholder)
    if (isNotModified && httpResponse.status === 304) {
      // No operation in original code
    }
    // Set response if not already set
    if (response == null) {
      response = httpResponse;
    }
  }

  // Copy urlList to response
  response.urlList = [...processedRequest.urlList];

  // Mark if range was requested
  if (processedRequest.headersList.contains("range", true)) {
    response.rangeRequested = true;
  }

  // Mark if credentials were included
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

  // Handle 421 status and retry if needed
  if (
    response.status === 421 &&
    !isRetry &&
    (originalRequest.body == null || (originalRequest.body && originalRequest.body.source != null))
  ) {
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    requestContext.controller.connection.destroy();
    response = await processHttpRequest(requestContext, forceReload, true);
  }

  return response;
}

module.exports = processHttpRequest;