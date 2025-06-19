/**
 * Handles the processing of a fetch request with service worker and redirect logic.
 * Evaluates CORS, opaque responses, redirects, and timing information.
 *
 * @param {Object} fetchContext - The context for the fetch operation.
 * @param {Object} fetchContext.request - The request configuration object.
 * @param {Object} fetchContext.timingInfo - Timing information for the request.
 * @param {Object} fetchContext.controller - Controller object for managing connections.
 * @returns {Promise<Object>} The processed response object or an error result.
 */
async function handleServiceWorkerFetchResponse(fetchContext) {
  const requestConfig = fetchContext.request;
  let fetchResponse = null;
  let rawResponse = null;
  const timingInfo = fetchContext.timingInfo;

  // If serviceWorkers is set to 'all', no action is taken here (possible placeholder)
  if (requestConfig.serviceWorkers === "all") {
    // No operation
  }

  // If no response has been fetched yet
  if (fetchResponse === null) {
    // If redirect policy is 'follow', disable service workers
    if (requestConfig.redirect === "follow") {
      requestConfig.serviceWorkers = "none";
    }

    // Fetch the response (handleHttpRequest is assumed to be an async fetch helper)
    rawResponse = fetchResponse = await handleHttpRequest(fetchContext);

    // If CORS is required and CORS check fails, return a CORS failure error
    if (
      requestConfig.responseTainting === "cors" &&
      pz6(requestConfig, fetchResponse) === "failure"
    ) {
      return o5("cors failure");
    }

    // If timing allow check fails, mark timingAllowFailed
    if (bz6(requestConfig, fetchResponse) === "failure") {
      requestConfig.timingAllowFailed = true;
    }
  }

  // Block if response is opaque and origin/client/destination check fails
  if (
    (requestConfig.responseTainting === "opaque" || fetchResponse.type === "opaque") &&
    cz6(requestConfig.origin, requestConfig.client, requestConfig.destination, rawResponse) === "blocked"
  ) {
    return o5("blocked");
  }

  // Handle HTTP redirect status codes
  if (np0.has(rawResponse.status)) {
    // If redirect is not manual, destroy the connection
    if (requestConfig.redirect !== "manual") {
      fetchContext.controller.connection.destroy(undefined, false);
    }

    // Handle different redirect policies
    if (requestConfig.redirect === "error") {
      fetchResponse = o5("unexpected redirect");
    } else if (requestConfig.redirect === "manual") {
      fetchResponse = rawResponse;
    } else if (requestConfig.redirect === "follow") {
      fetchResponse = await handleHttpRedirect(fetchContext, fetchResponse);
    } else {
      s_(false); // Unexpected redirect policy
    }
  }

  // Attach timing info to the response and return
  fetchResponse.timingInfo = timingInfo;
  return fetchResponse;
}

module.exports = handleServiceWorkerFetchResponse;
