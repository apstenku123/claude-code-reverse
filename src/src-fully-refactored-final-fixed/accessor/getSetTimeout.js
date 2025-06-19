/**
 * Handles a setTimeout-like accessor for a given request, managing invocation count, callbacks, errors, and response delivery.
 *
 * @param {Object} createRequestOptions - The request options, including headers and other metadata.
 * @param {Object} responseHandlers - Handlers for response events (onError, onConnect, onHeaders, onData, onComplete).
 * @returns {boolean} Returns true if the operation was handled (success or error), false otherwise.
 */
function getSetTimeout(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key for this request
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve or initialize the subscription object for this request
  const subscription = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Increment the invocation count
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

  // If there is an error, clean up and notify the error handler
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    responseHandlers.onError(responseError);
    return true;
  }

  // If a delay is specified, schedule the response delivery
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      deliverResponse(this[UY1]);
    }, responseDelay);
  } else {
    deliverResponse(this[UY1]);
  }

  /**
   * Delivers the response to the provided handlers, handling promises and data transformation.
   * @param {Object} context - The context object (typically this[UY1]).
   * @param {*} dataOverride - Optional override for the response data.
   */
  function deliverResponse(context, dataOverride = responseData) {
    // Normalize headers
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If dataOverride is a function, call isBlobOrFileLikeObject with the request options and normalized headers
    const finalData = typeof dataOverride === "function"
      ? dataOverride({ ...createRequestOptions, headers: normalizedHeaders })
      : dataOverride;

    // If the data is a promise, resolve isBlobOrFileLikeObject and deliver the response recursively
    if (gK6(finalData)) {
      finalData.then(resolvedData => deliverResponse(context, resolvedData));
      return;
    }

    // Transform response data and headers
    const responseBody = normalizeBufferLikeInput(finalData);
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Notify handlers for connection, headers, data, and completion
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, formattedHeaders, handleTrailers, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBody));
    responseHandlers.onComplete?.(formattedTrailers);

    // Clean up the subscription
    Nu1(context, subscriptionKey);
  }

  /**
   * Placeholder for trailer handler (not implemented).
   */
  function handleTrailers() {}

  return true;
}

module.exports = getSetTimeout;