/**
 * Handles a mock HTTP request, managing invocation counts, delays, callbacks, and error handling.
 * Used in a mock server or testing context to simulate HTTP request/response cycles.
 *
 * @param {Object} createRequestOptions - The request options, including headers and other metadata.
 * @param {Object} responseHandlers - An object containing response handler callbacks (onError, onConnect, onHeaders, onData, onComplete).
 * @returns {boolean} Returns true if the request was handled (success or error), false otherwise.
 */
function handleMockHttpRequest(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key for this request
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve or create a subscription object for this request
  const subscription = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Increment the number of times this subscription has been invoked
  subscription.timesInvoked++;

  // If a callback is defined, merge its result into the subscription data
  if (subscription.data.callback) {
    subscription.data = {
      ...subscription.data,
      ...subscription.data.callback(createRequestOptions)
    };
  }

  // Destructure relevant fields from the subscription data
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

  // Mark as consumed if not persistent and max invocations reached
  subscription.consumed = !shouldPersist && timesInvoked >= maxInvocations;
  // Mark as pending if there are remaining invocations
  subscription.pending = timesInvoked < maxInvocations;

  // Handle error case: clean up and invoke error handler
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    responseHandlers.onError(responseError);
    return true;
  }

  // If a delay is specified, schedule the response, otherwise respond immediately
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      sendResponse(this[UY1]);
    }, responseDelay);
  } else {
    sendResponse(this[UY1]);
  }

  /**
   * Sends the mock response to the provided response handlers.
   * Handles async data, header/trailer formatting, and completion.
   * @param {Object} context - The context object (usually this[UY1]).
   * @param {*} dataOverride - Optional override for response data.
   */
  function sendResponse(context, dataOverride = responseData) {
    // Normalize headers: if array, convert to object
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If responseData is a function, call isBlobOrFileLikeObject with request info
    const resolvedData = typeof dataOverride === "function"
      ? dataOverride({
          ...createRequestOptions,
          headers: normalizedHeaders
        })
      : dataOverride;

    // If resolvedData is a Promise, resolve isBlobOrFileLikeObject recursively
    if (gK6(resolvedData)) {
      resolvedData.then(nextData => sendResponse(context, nextData));
      return;
    }

    // Format response body, headers, and trailers
    const responseBody = normalizeBufferLikeInput(resolvedData);
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Call response handler callbacks if defined
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, formattedHeaders, handleTrailers, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBody));
    responseHandlers.onComplete?.(formattedTrailers);
    // Clean up the subscription
    Nu1(context, subscriptionKey);
  }

  /**
   * Placeholder for trailer handler, currently a no-op.
   */
  function handleTrailers() {}

  return true;
}

module.exports = handleMockHttpRequest;