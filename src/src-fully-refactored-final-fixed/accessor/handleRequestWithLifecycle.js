/**
 * Handles a request lifecycle, including invocation tracking, callback execution, error handling, and response delivery.
 *
 * @param {Object} createRequestOptions - The request options, including headers and payload.
 * @param {Object} responseHandlers - An object containing handler callbacks for error, connect, headers, data, and completion events.
 * @returns {boolean} Returns true if the request was handled (success or error), otherwise false.
 */
function handleRequestWithLifecycle(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key or identifier for this request
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve or create a subscription entry for this request
  const subscriptionEntry = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Track the number of times this subscription has been invoked
  subscriptionEntry.timesInvoked++;

  // If a callback is defined, merge its result into the subscription data
  if (subscriptionEntry.data.callback) {
    subscriptionEntry.data = {
      ...subscriptionEntry.data,
      ...subscriptionEntry.data.callback(createRequestOptions)
    };
  }

  // Destructure relevant data from the subscription entry
  const {
    data: {
      statusCode,
      data: responseData,
      headers: responseHeaders,
      trailers: responseTrailers,
      error: responseError
    },
    delay: responseDelay,
    persist: shouldPersist
  } = subscriptionEntry;

  const {
    timesInvoked,
    times: maxInvocations
  } = subscriptionEntry;

  // Mark as consumed if not persistent and invocation limit reached
  subscriptionEntry.consumed = !shouldPersist && timesInvoked >= maxInvocations;
  // Mark as pending if invocation limit not reached
  subscriptionEntry.pending = timesInvoked < maxInvocations;

  // If there is an error, clean up and notify the error handler
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    responseHandlers.onError(responseError);
    return true;
  }

  // If a delay is specified, schedule the response; otherwise, respond immediately
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      sendResponse(this[UY1]);
    }, responseDelay);
  } else {
    sendResponse(this[UY1]);
  }

  /**
   * Sends the response to the provided handlers, handling promises and data transformation as needed.
   * @param {Object} context - The context object (typically this[UY1]).
   * @param {*} dataToSend - The data to send (can be a function or value).
   */
  function sendResponse(context, dataToSend = responseData) {
    // Normalize headers: if headers are an array, convert to object
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If dataToSend is a function, invoke isBlobOrFileLikeObject with the request options and normalized headers
    const resolvedData = typeof dataToSend === "function"
      ? dataToSend({ ...createRequestOptions, headers: normalizedHeaders })
      : dataToSend;

    // If resolvedData is a promise, wait for isBlobOrFileLikeObject and then send the response
    if (gK6(resolvedData)) {
      resolvedData.then(nextData => sendResponse(context, nextData));
      return;
    }

    // Transform response data and headers as needed
    const responseBody = normalizeBufferLikeInput(resolvedData);
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Trigger response handler callbacks if defined
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, formattedHeaders, handleHeaders, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBody));
    responseHandlers.onComplete?.(formattedTrailers);

    // Clean up the subscription entry
    Nu1(context, subscriptionKey);
  }

  // Placeholder for a headers handler, can be expanded as needed
  function handleHeaders() {}

  return true;
}

module.exports = handleRequestWithLifecycle;