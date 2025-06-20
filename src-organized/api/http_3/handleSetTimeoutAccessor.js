/**
 * Handles the logic for accessing and invoking a setTimeout accessor, including callback execution,
 * error handling, delayed execution, and response propagation to the provided config callbacks.
 *
 * @param {Object} createRequestOptions - The options or observable describing the request (headers, etc).
 * @param {Object} responseHandlers - An object containing callback functions for handling response events (onError, onConnect, onHeaders, onData, onComplete).
 * @returns {boolean} Returns true if the operation was handled (success or error), false otherwise.
 */
function handleSetTimeoutAccessor(createRequestOptions, responseHandlers) {
  // Generate a unique subscription key based on the request options
  const subscriptionKey = extractRequestProperties(createRequestOptions);
  // Retrieve or create a subscription object for this key
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
  // Mark as pending if more invocations are allowed
  subscription.pending = timesInvoked < maxInvocations;

  // If there is an error, clean up and notify via onError
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    responseHandlers.onError(responseError);
    return true;
  }

  // If a delay is specified, schedule the response; otherwise, respond immediately
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      processResponse(this[UY1]);
    }, responseDelay);
  } else {
    processResponse(this[UY1]);
  }

  /**
   * Processes and propagates the response to the provided handlers.
   * Handles promises, header formatting, and completion callbacks.
   * @param {Object} context - The context object (typically this[UY1]).
   * @param {*} payload - The response data or a function to generate isBlobOrFileLikeObject.
   */
  function processResponse(context, payload = responseData) {
    // Normalize request headers
    const normalizedHeaders = Array.isArray(createRequestOptions.headers)
      ? arrayToObjectFromPairs(createRequestOptions.headers)
      : createRequestOptions.headers;

    // If payload is a function, invoke isBlobOrFileLikeObject with the request options and normalized headers
    const resolvedPayload = typeof payload === "function"
      ? payload({ ...createRequestOptions, headers: normalizedHeaders })
      : payload;

    // If the resolved payload is a promise, wait for isBlobOrFileLikeObject and process again
    if (gK6(resolvedPayload)) {
      resolvedPayload.then(nextPayload => processResponse(context, nextPayload));
      return;
    }

    // Convert the response data to a buffer
    const responseBuffer = normalizeBufferLikeInput(resolvedPayload);
    // Format headers and trailers
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Call the response handlers if they exist
    responseHandlers.onConnect?.(err => responseHandlers.onError(err), null);
    responseHandlers.onHeaders?.(statusCode, formattedHeaders, handleHeaders, getInteractionRouteName(statusCode));
    responseHandlers.onData?.(Buffer.from(responseBuffer));
    responseHandlers.onComplete?.(formattedTrailers);

    // Clean up the subscription
    Nu1(context, subscriptionKey);
  }

  /**
   * Placeholder for header handling logic (currently a no-op).
   */
  function handleHeaders() {}

  return true;
}

module.exports = handleSetTimeoutAccessor;