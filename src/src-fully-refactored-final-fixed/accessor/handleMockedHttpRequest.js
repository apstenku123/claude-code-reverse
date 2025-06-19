/**
 * Handles a mocked HTTP request, managing invocation counts, delays, callbacks, and error handling.
 * Used in a mock server context to simulate HTTP responses, including delayed responses and error scenarios.
 *
 * @param {Object} createRequestOptions - The options for the HTTP request (method, url, headers, etc).
 * @param {Object} responseHandlers - Handlers for various response events (onError, onConnect, onHeaders, onData, onComplete).
 * @returns {boolean} Returns true if the request was handled (always true).
 */
function handleMockedHttpRequest(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key for this request
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve the subscription object for this request
  const subscription = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Increment the invocation count for this subscription
  subscription.timesInvoked++;

  // If a callback is defined, merge its result into the subscription data
  if (subscription.data.callback) {
    subscription.data = {
      ...subscription.data,
      ...subscription.data.callback(createRequestOptions)
    };
  }

  // Destructure relevant data from the subscription
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
  } = subscription;

  const {
    timesInvoked,
    times: maxInvocations
  } = subscription;

  // Mark as consumed if not persistent and invocation limit reached
  subscription.consumed = !shouldPersist && timesInvoked >= maxInvocations;
  // Mark as pending if invocation limit not reached
  subscription.pending = timesInvoked < maxInvocations;

  // Handle error scenario
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey); // Remove subscription
    responseHandlers.onError(responseError);
    return true;
  }

  // Handle delayed or immediate response
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      sendResponse(this[UY1]);
    }, responseDelay);
  } else {
    sendResponse(this[UY1]);
  }

  /**
   * Sends the mocked HTTP response to the provided handlers.
   * Handles promises, header/data/trailer events, and completion.
   * @param {Object} context - The mock server context (typically this[UY1]).
   * @param {*} payload - The response data to send (can be a function or value).
   */
  function sendResponse(context, payload = responseData) {
    // Normalize request headers
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If the response data is a function, invoke isBlobOrFileLikeObject with the request options
    const resolvedPayload = typeof payload === "function"
      ? payload({ ...createRequestOptions, headers: normalizedHeaders })
      : payload;

    // If the resolved payload is a promise, resolve isBlobOrFileLikeObject recursively
    if (gK6(resolvedPayload)) {
      resolvedPayload.then(nextPayload => sendResponse(context, nextPayload));
      return;
    }

    // Prepare response body, headers, and trailers
    const responseBody = normalizeBufferLikeInput(resolvedPayload);
    const normalizedResponseHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const normalizedResponseTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Trigger response event handlers if defined
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, normalizedResponseHeaders, handleHeaders, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBody));
    responseHandlers.onComplete?.(normalizedResponseTrailers);
    Nu1(context, subscriptionKey); // Remove subscription after completion
  }

  // Placeholder for header handler (not used but required by interface)
  function handleHeaders() {}

  return true;
}

module.exports = handleMockedHttpRequest;