/**
 * Handles an asynchronous request with service worker, redirect, and CORS logic.
 * 
 * This function processes a request object, handling service worker settings, redirects,
 * CORS failures, opaque responses, and timing information. It ensures that the request
 * follows the correct flow based on the configuration and response tainting, and returns
 * the final response or an error object as appropriate.
 *
 * @param {Object} asyncBlockedContext - The context object containing request and timing info.
 * @param {Object} asyncBlockedContext.request - The request configuration object.
 * @param {Object} asyncBlockedContext.timingInfo - Timing information for the request.
 * @returns {Promise<Object>} The final response object or an error object if blocked or failed.
 */
async function handleAsyncBlockedRequest(asyncBlockedContext) {
  const requestConfig = asyncBlockedContext.request;
  let response = null;
  let rawResponse = null;
  const timingInfo = asyncBlockedContext.timingInfo;

  // If serviceWorkers is set to 'all', do nothing (placeholder for future logic)
  if (requestConfig.serviceWorkers === "all") {
    // No operation
  }

  // If no response yet, process the request
  if (response === null) {
    // If redirect is set to 'follow', disable service workers for this request
    if (requestConfig.redirect === "follow") {
      requestConfig.serviceWorkers = "none";
    }

    // Await the actual response (handleHttpRequest is assumed to be an async fetch-like function)
    rawResponse = response = await handleHttpRequest(asyncBlockedContext);

    // If response tainting is 'cors' and CORS check fails, return a CORS failure error
    if (
      requestConfig.responseTainting === "cors" &&
      pz6(requestConfig, response) === "failure"
    ) {
      return o5("cors failure");
    }

    // If timing allow check fails, mark timingAllowFailed flag
    if (bz6(requestConfig, response) === "failure") {
      requestConfig.timingAllowFailed = true;
    }
  }

  // Block if response is opaque or tainting is opaque and origin/client/destination check fails
  if (
    (requestConfig.responseTainting === "opaque" || response.type === "opaque") &&
    cz6(requestConfig.origin, requestConfig.client, requestConfig.destination, rawResponse) === "blocked"
  ) {
    return o5("blocked");
  }

  // Handle redirect status codes
  if (np0.has(rawResponse.status)) {
    // If redirect mode is not 'manual', destroy the connection
    if (requestConfig.redirect !== "manual") {
      asyncBlockedContext.controller.connection.destroy(undefined, false);
    }
    // Handle different redirect modes
    if (requestConfig.redirect === "error") {
      response = o5("unexpected redirect");
    } else if (requestConfig.redirect === "manual") {
      response = rawResponse;
    } else if (requestConfig.redirect === "follow") {
      response = await handleHttpRedirect(asyncBlockedContext, response);
    } else {
      s_(false); // Should never happen; fail hard
    }
  }

  // Attach timing info to the response
  response.timingInfo = timingInfo;
  return response;
}

module.exports = handleAsyncBlockedRequest;
