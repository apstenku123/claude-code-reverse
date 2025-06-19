/**
 * Handles a response object, managing timing information, reporting steps, and invoking appropriate callbacks.
 * Ensures timing info is attached and reported, and processes response and response body as needed.
 *
 * @param {Object} requestContext - The context object containing request, controller, and processing callbacks.
 * @param {Object} responseContext - The response object, including timing, headers, status, and body info.
 */
function handleResponseWithTiming(requestContext, responseContext) {
  const timingInfo = requestContext.timingInfo;

  /**
   * Handles the completion of the response body stream or the absence of a body.
   * Attaches timing info, sets up timing reporting, and processes response end-of-body logic.
   */
  const onResponseComplete = () => {
    const endTime = Date.now();

    // Attach full timing info for document requests
    if (requestContext.request.destination === "document") {
      requestContext.controller.fullTimingInfo = timingInfo;
    }

    /**
     * Reports timing steps if the protocol is HTTPS and initiatorType is present.
     * Updates timing info, cache state, and body info as needed.
     */
    requestContext.controller.reportTimingSteps = () => {
      if (requestContext.request.url.protocol !== "https:") return;
      timingInfo.endTime = endTime;
      let { cacheState, bodyInfo } = responseContext;

      // If timing allow failed, update timing info and clear cache state
      if (!responseContext.timingAllowPassed) {
        timingInfo = au1(timingInfo);
        cacheState = "";
      }

      let status = 0;
      // Only set status and content type if not a navigator mode with cross-origin redirects
      if (
        requestContext.request.mode !== "navigator" ||
        !responseContext.hasCrossOriginRedirects
      ) {
        status = responseContext.status;
        const contentTypeHeader = Iw6(responseContext.headersList);
        if (contentTypeHeader !== "failure") {
          bodyInfo.contentType = zw6(contentTypeHeader);
        }
      }

      // Report timing if initiatorType is present
      if (requestContext.request.initiatorType != null) {
        rp0(
          timingInfo,
          requestContext.request.url.href,
          requestContext.request.initiatorType,
          globalThis,
          cacheState,
          bodyInfo,
          status
        );
      }
    };

    /**
     * Finalizes the response processing, marking as done and invoking end-of-body logic if present.
     */
    const finalizeResponse = () => {
      requestContext.request.done = true;
      if (requestContext.processResponseEndOfBody != null) {
        queueMicrotask(() => requestContext.processResponseEndOfBody(responseContext));
      }
      if (requestContext.request.initiatorType != null) {
        requestContext.controller.reportTimingSteps();
      }
    };

    // Schedule finalization in the microtask queue
    queueMicrotask(() => finalizeResponse());
  };

  // If a processResponse callback exists, invoke isBlobOrFileLikeObject asynchronously and clear isBlobOrFileLikeObject
  if (requestContext.processResponse != null) {
    queueMicrotask(() => {
      requestContext.processResponse(responseContext);
      requestContext.processResponse = null;
    });
  }

  // Determine the effective response object (handles error and internalResponse cases)
  const effectiveResponse =
    responseContext.type === "error"
      ? responseContext
      : responseContext.internalResponse ?? responseContext;

  // If there is no body, handle completion immediately; otherwise, wait for body stream to finish
  if (effectiveResponse.body == null) {
    onResponseComplete();
  } else {
    Xw6(effectiveResponse.body.stream, () => {
      onResponseComplete();
    });
  }
}

module.exports = handleResponseWithTiming;