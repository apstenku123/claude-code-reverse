/**
 * Handles a mocked HTTP request, managing invocation counts, delays, errors, and response callbacks.
 * This function is designed to simulate HTTP request/response cycles for testing or mocking purposes.
 *
 * @param {object} createRequestOptions - The request options, including headers and other metadata.
 * @param {object} responseHandlers - An object containing callback functions for handling connection, headers, data, completion, and errors.
 * @returns {boolean} Returns true if the request was handled (successfully or with error), false otherwise.
 */
function handleRequestWithMocking(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key or object for this request
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve the current subscription/mock entry for this request
  const subscription = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Increment the number of times this mock has been invoked
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

  // Mark as consumed if not persistent and invocation limit reached
  subscription.consumed = !shouldPersist && timesInvoked >= maxInvocations;
  // Mark as pending if invocation limit not yet reached
  subscription.pending = timesInvoked < maxInvocations;

  // If there is an error, clean up and call the error handler
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    responseHandlers.onError(responseError);
    return true;
  }

  // Handle delayed or immediate response
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      processResponse(this[UY1]);
    }, responseDelay);
  } else {
    processResponse(this[UY1]);
  }

  /**
   * Processes and sends the response to the appropriate handlers.
   * Handles promises, header formatting, and completion callbacks.
   * @param {object} context - The context object (usually the mock registry)
   * @param {*} currentData - The data to send (can be a function or value)
   */
  function processResponse(context, currentData = responseData) {
    // Normalize headers (convert array to object if needed)
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If responseData is a function, call isBlobOrFileLikeObject with the request options
    const resolvedData = typeof currentData === "function"
      ? currentData({
          ...createRequestOptions,
          headers: normalizedHeaders
        })
      : currentData;

    // If resolvedData is a promise, resolve isBlobOrFileLikeObject and process again
    if (gK6(resolvedData)) {
      resolvedData.then(nextData => processResponse(context, nextData));
      return;
    }

    // Prepare response body and headers
    const responseBody = normalizeBufferLikeInput(resolvedData);
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Call the response handlers if they exist
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, formattedHeaders, onHeadersCallback, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBody));
    responseHandlers.onComplete?.(formattedTrailers);

    // Clean up the subscription
    Nu1(context, subscriptionKey);
  }

  // Placeholder for onHeaders callback (not used in this context)
  function onHeadersCallback() {}

  return true;
}

module.exports = handleRequestWithMocking;