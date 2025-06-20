/**
 * Handles the response processing and timing reporting for a given request and its configuration.
 * This function manages timing info, processes the response body, and reports timing steps
 * according to the request'createInteractionAccessor destination, protocol, and other properties. It ensures that
 * timing and response handling are performed asynchronously and in the correct order.
 *
 * @param {Object} requestContext - The context object containing request, controller, and processing callbacks.
 * @param {Object} responseConfig - The response configuration object containing status, headers, body, and timing info.
 */
function handleResponseAndTiming(requestContext, responseConfig) {
  const timingInfo = requestContext.timingInfo;

  /**
   * Reports timing steps and processes timing-related info.
   * This is called after the response body is fully read or if there is no body.
   */
  const reportTiming = () => {
    const now = Date.now();

    // If the request is for a document, store the full timing info
    if (requestContext.request.destination === "document") {
      requestContext.controller.fullTimingInfo = timingInfo;
    }

    /**
     * Reports timing steps, including cache state, content type, and initiator type.
     * Only runs for HTTPS requests.
     */
    requestContext.controller.reportTimingSteps = () => {
      if (requestContext.request.url.protocol !== "https:") return;
      timingInfo.endTime = now;
      let { cacheState, bodyInfo } = responseConfig;

      // If timing allow did not pass, sanitize timing info and clear cache state
      if (!responseConfig.timingAllowPassed) {
        timingInfo = au1(timingInfo);
        cacheState = "";
      }

      let statusCode = 0;
      // Only set status and content type if not a cross-origin navigator redirect
      if (
        requestContext.request.mode !== "navigator" ||
        !responseConfig.hasCrossOriginRedirects
      ) {
        statusCode = responseConfig.status;
        const contentTypeHeader = Iw6(responseConfig.headersList);
        if (contentTypeHeader !== "failure") {
          bodyInfo.contentType = zw6(contentTypeHeader);
        }
      }

      // If initiatorType is present, report timing
      if (requestContext.request.initiatorType != null) {
        rp0(
          timingInfo,
          requestContext.request.url.href,
          requestContext.request.initiatorType,
          globalThis,
          cacheState,
          bodyInfo,
          statusCode
        );
      }
    };

    /**
     * Handles the end-of-body processing and triggers timing reporting if needed.
     */
    const handleEndOfBody = () => {
      // Mark the request as done
      requestContext.request.done = true;
      // If there is a processResponseEndOfBody callback, queue isBlobOrFileLikeObject
      if (requestContext.processResponseEndOfBody != null) {
        queueMicrotask(() => requestContext.processResponseEndOfBody(responseConfig));
      }
      // If initiatorType is present, report timing steps
      if (requestContext.request.initiatorType != null) {
        requestContext.controller.reportTimingSteps();
      }
    };

    // Always queue the end-of-body handler as a microtask
    queueMicrotask(() => handleEndOfBody());
  };

  // If there is a processResponse callback, queue isBlobOrFileLikeObject and null isBlobOrFileLikeObject out
  if (requestContext.processResponse != null) {
    queueMicrotask(() => {
      requestContext.processResponse(responseConfig);
      requestContext.processResponse = null;
    });
  }

  // Determine the response object to use (error, internal, or original)
  const responseToProcess =
    responseConfig.type === "error"
      ? responseConfig
      : responseConfig.internalResponse ?? responseConfig;

  // If there is no body, report timing immediately; otherwise, wait for body stream to finish
  if (responseToProcess.body == null) {
    reportTiming();
  } else {
    Xw6(responseToProcess.body.stream, () => {
      reportTiming();
    });
  }
}

module.exports = handleResponseAndTiming;