/**
 * Processes a network request object, applying security, referrer, and integrity checks,
 * and dispatches the request using the appropriate fetch handler based on mode and tainting.
 * Handles response tainting, timing, integrity validation, and error propagation.
 *
 * @async
 * @param {Object} requestContext - The context for the network request, containing the request and associated metadata.
 * @param {boolean} [returnEarlyOnError=false] - If true, returns immediately on error instead of continuing processing.
 * @returns {Promise<void|Object>} Returns nothing unless returnEarlyOnError is true, in which case returns the error response.
 */
async function processNetworkRequest(requestContext, returnEarlyOnError = false) {
  const request = requestContext.request;
  let response = null;

  // Enforce local URLs only if specified
  if (request.localURLsOnly && !oz6(ww(request))) {
    response = o5("local URLs only");
  }

  // Check for blocked ports
  dz6(request);
  if (vz6(request) === "blocked") {
    response = o5("bad port");
  }

  // Set referrer policy if not already set
  if (request.referrerPolicy === "") {
    request.referrerPolicy = request.policyContainer.referrerPolicy;
  }

  // Set referrer if not 'no-referrer'
  if (request.referrer !== "no-referrer") {
    request.referrer = lz6(request);
  }

  // If no error so far, process the request further
  if (response === null) {
    response = await (async () => {
      const currentUrl = ww(request);

      // If URL is same-origin, protocol is data, or mode is navigate/websocket, use basic tainting
      if (
        (nu1(currentUrl, request.url) && request.responseTainting === "basic") ||
        currentUrl.protocol === "data:" ||
        request.mode === "navigate" ||
        request.mode === "websocket"
      ) {
        request.responseTainting = "basic";
        return await fetchResourceByScheme(requestContext);
      }

      // Same-origin mode is not allowed
      if (request.mode === "same-origin") {
        return o5('request mode cannot be "same-origin"');
      }

      // no-cors mode restrictions
      if (request.mode === "no-cors") {
        if (request.redirect !== "follow") {
          return o5('redirect mode cannot be "follow" for "no-cors" request');
        }
        request.responseTainting = "opaque";
        return await fetchResourceByScheme(requestContext);
      }

      // Only HTTP(s) schemes are allowed
      if (!su1(ww(request))) {
        return o5("URL scheme must be a HTTP(s) scheme");
      }

      // Default to CORS tainting
      request.responseTainting = "cors";
      return await handleServiceWorkerFetch(requestContext);
    })();
  }

  // If early return is requested, return the response (error or otherwise)
  if (returnEarlyOnError) {
    return response;
  }

  // If the response is not a network error and not an internal response, handle tainting
  if (response.status !== 0 && !response.internalResponse) {
    // Only process tainting if responseTainting is set
    if (request.responseTainting === "cors") {
      // No action needed for CORS here
    }
    if (request.responseTainting === "basic") {
      response = pu1(response, "basic");
    } else if (request.responseTainting === "cors") {
      response = pu1(response, "cors");
    } else if (request.responseTainting === "opaque") {
      response = pu1(response, "opaque");
    } else {
      s_(!1); // Should never happen
    }
  }

  // Use internal response if present, otherwise use the main response
  let finalResponse = response.status === 0 ? response : response.internalResponse;

  // Ensure the URL list is populated
  if (finalResponse.urlList.length === 0) {
    finalResponse.urlList.push(...request.urlList);
  }

  // Mark timing as allowed if not failed
  if (!request.timingAllowFailed) {
    response.timingAllowPassed = true;
  }

  // Opaque 206 responses with range requested and no range header are errors
  if (
    response.type === "opaque" &&
    finalResponse.status === 206 &&
    finalResponse.rangeRequested &&
    !request.headers.contains("range", true)
  ) {
    response = finalResponse = o5();
  }

  // For HEAD, CONNECT, or certain status codes, clear the body and mark controller as dumped
  if (
    response.status !== 0 &&
    (request.method === "HEAD" ||
      request.method === "CONNECT" ||
      ap0.includes(finalResponse.status))
  ) {
    finalResponse.body = null;
    requestContext.controller.dump = true;
  }

  // If integrity is specified, perform integrity check
  if (request.integrity) {
    const handleIntegrityError = errorMsg => handleResponseWithTiming(requestContext, o5(errorMsg));

    // If opaque or no body, immediately fail
    if (request.responseTainting === "opaque" || response.body == null) {
      handleIntegrityError(response.error);
      return;
    }

    // Success callback for integrity check
    const handleIntegritySuccess = bodyContent => {
      if (!yz6(bodyContent, request.integrity)) {
        handleIntegrityError("integrity mismatch");
        return;
      }
      response.body = ru1(bodyContent)[0];
      handleResponseWithTiming(requestContext, response);
    };

    // Perform async integrity check
    await sz6(response.body, handleIntegritySuccess, handleIntegrityError);
  } else {
    // No integrity required, proceed with response
    handleResponseWithTiming(requestContext, response);
  }
}

module.exports = processNetworkRequest;