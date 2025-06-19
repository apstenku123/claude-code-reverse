/**
 * Handles the processing of a WebSocket network request, including validation, tainting, redirect logic,
 * response handling, integrity checks, and timing propagation. This function orchestrates the full lifecycle
 * of a WebSocket request, ensuring all protocol and security requirements are met before delivering the response.
 *
 * @async
 * @param {Object} requestContext - The context object for the WebSocket request, containing the request and associated metadata.
 * @param {boolean} [returnEarly=false] - If true, returns the response/error immediately after processing, skipping further handling.
 * @returns {Promise<void|Object>} Returns a Promise that resolves to void or the response/error object, depending on returnEarly.
 */
async function handleWebsocketRequest(requestContext, returnEarly = false) {
  const request = requestContext.request;
  let responseOrError = null;

  // Check if only local URLs are allowed and validate
  if (request.localURLsOnly && !oz6(ww(request))) {
    responseOrError = o5("local URLs only");
  }

  // Perform additional request validation
  dz6(request);

  // Check for blocked ports
  if (vz6(request) === "blocked") {
    responseOrError = o5("bad port");
  }

  // Set referrer policy from policy container if not explicitly set
  if (request.referrerPolicy === "") {
    request.referrerPolicy = request.policyContainer.referrerPolicy;
  }

  // Compute referrer if not set to 'no-referrer'
  if (request.referrer !== "no-referrer") {
    request.referrer = lz6(request);
  }

  // If no error so far, process the request based on mode, tainting, and protocol
  if (responseOrError === null) {
    responseOrError = await (async () => {
      const currentUrl = ww(request);
      // If URL matches origin, or is data: protocol, or mode is navigate/websocket, treat as basic
      if (
        (nu1(currentUrl, request.url) && request.responseTainting === "basic") ||
        currentUrl.protocol === "data:" ||
        request.mode === "navigate" ||
        request.mode === "websocket"
      ) {
        request.responseTainting = "basic";
        return await fetchResourceByScheme(requestContext);
      }
      // 'same-origin' mode is not allowed
      if (request.mode === "same-origin") {
        return o5('request mode cannot be "same-origin"');
      }
      // 'no-cors' mode restrictions
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

  // If early return is requested, return the response/error immediately
  if (returnEarly) {
    return responseOrError;
  }

  // If response is not a network error and not an internal response, apply tainting wrappers
  if (responseOrError.status !== 0 && !responseOrError.internalResponse) {
    if (request.responseTainting === "cors") {
      // No-op, CORS tainting handled below
    }
    if (request.responseTainting === "basic") {
      responseOrError = pu1(responseOrError, "basic");
    } else if (request.responseTainting === "cors") {
      responseOrError = pu1(responseOrError, "cors");
    } else if (request.responseTainting === "opaque") {
      responseOrError = pu1(responseOrError, "opaque");
    } else {
      s_(!1); // Unexpected tainting type
    }
  }

  // Use the internal response if present, otherwise the main response
  let finalResponse = responseOrError.status === 0 ? responseOrError : responseOrError.internalResponse;

  // Ensure the response'createInteractionAccessor URL list is populated
  if (finalResponse.urlList.length === 0) {
    finalResponse.urlList.push(...request.urlList);
  }

  // Mark timing as allowed if not failed
  if (!request.timingAllowFailed) {
    responseOrError.timingAllowPassed = true;
  }

  // Opaque response with 206 status and range requested but no 'range' header is an error
  if (
    responseOrError.type === "opaque" &&
    finalResponse.status === 206 &&
    finalResponse.rangeRequested &&
    !request.headers.contains("range", true)
  ) {
    responseOrError = finalResponse = o5();
  }

  // For HEAD, CONNECT, or status in ap0, clear body and mark controller as dumped
  if (
    responseOrError.status !== 0 &&
    (request.method === "HEAD" || request.method === "CONNECT" || ap0.includes(finalResponse.status))
  ) {
    finalResponse.body = null;
    requestContext.controller.dump = true;
  }

  // If integrity is specified, perform integrity checks
  if (request.integrity) {
    // Error handler for integrity failure
    const handleIntegrityError = errorMsg => {
      handleResponseWithTiming(requestContext, o5(errorMsg));
    };
    // If response is opaque or body is missing, treat as error
    if (request.responseTainting === "opaque" || responseOrError.body == null) {
      handleIntegrityError(responseOrError.error);
      return;
    }
    // Success handler for integrity check
    const handleIntegritySuccess = bodyContent => {
      if (!yz6(bodyContent, request.integrity)) {
        handleIntegrityError("integrity mismatch");
        return;
      }
      responseOrError.body = ru1(bodyContent)[0];
      handleResponseWithTiming(requestContext, responseOrError);
    };
    // Perform the integrity check asynchronously
    await sz6(responseOrError.body, handleIntegritySuccess, handleIntegrityError);
  } else {
    // No integrity specified, proceed with response handling
    handleResponseWithTiming(requestContext, responseOrError);
  }
}

module.exports = handleWebsocketRequest;