/**
 * Processes and prepares a network request, handling headers, cache, credentials, and special cases.
 * Delegates the actual network operation to createNetworkRequestController and manages response handling.
 *
 * @param {object} requestContext - The context object containing the request and related metadata.
 * @param {boolean} [forceNoCache=false] - If true, forces no-cache behavior in the request.
 * @param {boolean} [isRetry=false] - Internal flag to indicate if this is a retry (used for 421 status handling).
 * @returns {Promise<object>} The processed network response object, or an error object in special cases.
 */
async function processNetworkRequest(requestContext, forceNoCache = false, isRetry = false) {
  const originalRequest = requestContext.request;
  let processedRequestContext = null;
  let processedRequest = null;
  let networkResponse = null;
  let unusedVariable = null; // Placeholder for processCssDeclarations in original code
  let isNotModified = false; // Placeholder for W in original code

  // Handle special window and redirect cases
  if (originalRequest.window === "no-window" && originalRequest.redirect === "error") {
    processedRequestContext = requestContext;
    processedRequest = originalRequest;
  } else {
    processedRequest = kz6(originalRequest); // Clone and process the request
    processedRequestContext = { ...requestContext };
    processedRequestContext.request = processedRequest;
  }

  // Determine if credentials are included
  const credentialsIncluded =
    originalRequest.credentials === "include" ||
    (originalRequest.credentials === "same-origin" && originalRequest.responseTainting === "basic");

  // Determine body length for content-length header
  const bodyLength = processedRequest.body ? processedRequest.body.length : null;
  let contentLengthHeader = null;

  // If body is null and method is POST or PUT, set content-length to "0"
  if (processedRequest.body == null && ["POST", "PUT"].includes(processedRequest.method)) {
    contentLengthHeader = "0";
  }

  // If body length is known, encode isBlobOrFileLikeObject for the header
  if (bodyLength != null) {
    contentLengthHeader = pY1(`${bodyLength}`);
  }

  // Set content-length header if determined
  if (contentLengthHeader != null) {
    processedRequest.headersList.append("content-length", contentLengthHeader, true);
  }

  // If referrer is a URL, set referer header
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

  // Add cache-control header for no-cache mode if not prevented
  if (
    processedRequest.cache === "no-cache" &&
    !processedRequest.preventNoCacheCacheControlHeaderModification &&
    !processedRequest.headersList.contains("cache-control", true)
  ) {
    processedRequest.headersList.append("cache-control", "max-age=0", true);
  }

  // Add pragma and cache-control headers for no-store or reload cache modes
  if (processedRequest.cache === "no-store" || processedRequest.cache === "reload") {
    if (!processedRequest.headersList.contains("pragma", true)) {
      processedRequest.headersList.append("pragma", "no-cache", true);
    }
    if (!processedRequest.headersList.contains("cache-control", true)) {
      processedRequest.headersList.append("cache-control", "no-cache", true);
    }
  }

  // If range header is present, set accept-encoding to identity
  if (processedRequest.headersList.contains("range", true)) {
    processedRequest.headersList.append("accept-encoding", "identity", true);
  }

  // Otherwise, ensure accept-encoding is set appropriately
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

  // Main network request logic
  if (networkResponse == null) {
    // If cache is only-if-cached, return error
    if (processedRequest.cache === "only-if-cached") {
      return o5("only if cached");
    }

    // Perform the network request
    const response = await createHttpRequestController(processedRequestContext, credentialsIncluded, isRetry);

    // If method is not in Zw6 and status is 2xx-3xx, do nothing (placeholder)
    if (!Zw6.has(processedRequest.method) && response.status >= 200 && response.status <= 399) {
      // No-op in original code
    }

    // If isNotModified and status is 304, do nothing (placeholder)
    if (isNotModified && response.status === 304) {
      // No-op in original code
    }

    // Set networkResponse if still null
    if (networkResponse == null) {
      networkResponse = response;
    }
  }

  // Copy urlList to response
  networkResponse.urlList = [...processedRequest.urlList];

  // Mark if range was requested
  if (processedRequest.headersList.contains("range", true)) {
    networkResponse.rangeRequested = true;
  }

  // Mark if credentials were included
  networkResponse.requestIncludesCredentials = credentialsIncluded;

  // Handle proxy authentication required
  if (networkResponse.status === 407) {
    if (originalRequest.window === "no-window") {
      return o5();
    }
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    return o5("proxy authentication required");
  }

  // Handle 421 status with retry logic
  if (
    networkResponse.status === 421 &&
    !isRetry &&
    (originalRequest.body == null || originalRequest.body.source != null)
  ) {
    if (a_(requestContext)) {
      return dY1(requestContext);
    }
    requestContext.controller.connection.destroy();
    networkResponse = await processNetworkRequest(requestContext, forceNoCache, true);
  }

  return networkResponse;
}

module.exports = processNetworkRequest;
