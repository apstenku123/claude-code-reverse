/**
 * Handles the fetch process for a service worker request, including redirect logic, tainting checks, and timing info propagation.
 *
 * @param {Object} fetchContext - The context object containing request, timing info, and controller.
 * @param {Object} fetchContext.request - The request configuration object.
 * @param {Object} fetchContext.timingInfo - Timing information to be attached to the response.
 * @param {Object} fetchContext.controller - The controller managing the connection.
 * @returns {Promise<Object>} The response object, or an error object if a failure occurs.
 */
async function handleServiceWorkerFetch(fetchContext) {
  const requestConfig = fetchContext.request;
  let response = null;
  let rawResponse = null;
  const timingInfo = fetchContext.timingInfo;

  // If serviceWorkers is set to 'all', no-op (placeholder for potential logic)
  if (requestConfig.serviceWorkers === "all") {
    // No operation currently defined
  }

  // If no response has been set yet, process the request
  if (response === null) {
    // If redirect mode is 'follow', disable service workers for this request
    if (requestConfig.redirect === "follow") {
      requestConfig.serviceWorkers = "none";
    }

    // Await the actual fetch operation (handleHttpRequest)
    rawResponse = response = await handleHttpRequest(fetchContext);

    // If response tainting is 'cors' and CORS check fails, return a CORS failure error
    if (
      requestConfig.responseTainting === "cors" &&
      pz6(requestConfig, response) === "failure"
    ) {
      return o5("cors failure");
    }

    // If timing allow check fails, mark timingAllowFailed as true
    if (bz6(requestConfig, response) === "failure") {
      requestConfig.timingAllowFailed = true;
    }
  }

  // If response is opaque or tainting is opaque, and block check fails, return a blocked error
  if (
    (requestConfig.responseTainting === "opaque" || response.type === "opaque") &&
    cz6(requestConfig.origin, requestConfig.client, requestConfig.destination, rawResponse) === "blocked"
  ) {
    return o5("blocked");
  }

  // Handle HTTP status codes that require special redirect logic
  if (np0.has(rawResponse.status)) {
    // If redirect mode is not 'manual', destroy the connection
    if (requestConfig.redirect !== "manual") {
      fetchContext.controller.connection.destroy(undefined, false);
    }

    // Handle different redirect modes
    if (requestConfig.redirect === "error") {
      response = o5("unexpected redirect");
    } else if (requestConfig.redirect === "manual") {
      response = rawResponse;
    } else if (requestConfig.redirect === "follow") {
      response = await handleHttpRedirect(fetchContext, response);
    } else {
      s_(false); // Should not reach here; assertion failure
    }
  }

  // Attach timing info to the response before returning
  response.timingInfo = timingInfo;
  return response;
}

module.exports = handleServiceWorkerFetch;