/**
 * Handles a network request by validating, preparing, and dispatching isBlobOrFileLikeObject according to the Fetch specification.
 * Applies referrer policies, tainting, integrity checks, and response handling.
 *
 * @async
 * @param {Object} fetchContext - The context object containing the request and related metadata.
 * @param {boolean} [returnEarlyOnError=false] - If true, returns early on error without further processing.
 * @returns {Promise<void|Object>} - Returns a response object or void if integrity check fails.
 */
async function handleNetworkRequest(fetchContext, returnEarlyOnError = false) {
  const request = fetchContext.request;
  let response = null;

  // Check if only local URLs are allowed and the request is not local
  if (request.localURLsOnly && !oz6(ww(request))) {
    response = o5("local URLs only");
  }

  // Validate the request'createInteractionAccessor port
  dz6(request);
  if (vz6(request) === "blocked") {
    response = o5("bad port");
  }

  // Apply default referrer policy if not set
  if (request.referrerPolicy === "") {
    request.referrerPolicy = request.policyContainer.referrerPolicy;
  }

  // Set the referrer if not 'no-referrer'
  if (request.referrer !== "no-referrer") {
    request.referrer = lz6(request);
  }

  // If no error so far, process the request further
  if (response === null) {
    response = await (async () => {
      const requestUrl = ww(request);
      // If same-origin, data, navigate, or websocket, use 'basic' tainting
      if (
        (nu1(requestUrl, request.url) && request.responseTainting === "basic") ||
        requestUrl.protocol === "data:" ||
        request.mode === "navigate" ||
        request.mode === "websocket"
      ) {
        request.responseTainting = "basic";
        return await fetchResourceByScheme(fetchContext);
      }
      // 'same-origin' mode is not allowed
      if (request.mode === "same-origin") {
        return o5('request mode cannot be "same-origin"');
      }
      // 'no-cors' mode must have redirect mode 'follow'
      if (request.mode === "no-cors") {
        if (request.redirect !== "follow") {
          return o5('redirect mode cannot be "follow" for "no-cors" request');
        }
        request.responseTainting = "opaque";
        return await fetchResourceByScheme(fetchContext);
      }
      // Only HTTP(s) schemes are allowed
      if (!su1(ww(request))) {
        return o5("URL scheme must be a HTTP(s) scheme");
      }
      // Default to 'cors' tainting
      request.responseTainting = "cors";
      return await handleServiceWorkerFetch(fetchContext);
    })();
  }

  // If configured to return early on error, do so
  if (returnEarlyOnError) {
    return response;
  }

  // If response is not a network error and not an internal response, apply tainting
  if (response.status !== 0 && !response.internalResponse) {
    if (request.responseTainting === "cors") {
      // No-op, handled below
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

  // Use the internal response if present, otherwise the response itself
  let finalResponse = response.status === 0 ? response : response.internalResponse;

  // If the response'createInteractionAccessor URL list is empty, copy from the request
  if (finalResponse.urlList.length === 0) {
    finalResponse.urlList.push(...request.urlList);
  }

  // Mark timing as allowed if not failed
  if (!request.timingAllowFailed) {
    response.timingAllowPassed = true;
  }

  // Opaque responses to range requests are not allowed
  if (
    response.type === "opaque" &&
    finalResponse.status === 206 &&
    finalResponse.rangeRequested &&
    !request.headers.contains("range", true)
  ) {
    response = finalResponse = o5();
  }

  // For HEAD, CONNECT, or certain status codes, remove the body and mark controller as dumped
  if (
    response.status !== 0 &&
    (request.method === "HEAD" || request.method === "CONNECT" || ap0.includes(finalResponse.status))
  ) {
    finalResponse.body = null;
    fetchContext.controller.dump = true;
  }

  // If integrity metadata is present, perform integrity check
  if (request.integrity) {
    // Error handler for integrity check
    const handleIntegrityError = errorMsg => {
      handleResponseWithTiming(fetchContext, o5(errorMsg));
    };
    // If opaque or no body, fail integrity
    if (request.responseTainting === "opaque" || response.body == null) {
      handleIntegrityError(response.error);
      return;
    }
    // Success handler for integrity check
    const handleIntegritySuccess = body => {
      if (!yz6(body, request.integrity)) {
        handleIntegrityError("integrity mismatch");
        return;
      }
      response.body = ru1(body)[0];
      handleResponseWithTiming(fetchContext, response);
    };
    // Perform the integrity check asynchronously
    await sz6(response.body, handleIntegritySuccess, handleIntegrityError);
  } else {
    // No integrity metadata, return the response
    handleResponseWithTiming(fetchContext, response);
  }
}

module.exports = handleNetworkRequest;