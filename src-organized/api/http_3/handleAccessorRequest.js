/**
 * Handles an accessor request by processing the provided observable and configuration.
 * Manages invocation counts, error handling, delayed execution, and response callbacks.
 *
 * @param {Object} sourceObservable - The observable or request object containing headers and other request data.
 * @param {Object} config - The configuration object containing callback handlers (onError, onConnect, onHeaders, onData, onComplete).
 * @returns {boolean} Returns true if the request was handled (successfully or with error), false otherwise.
 */
function handleAccessorRequest(sourceObservable, config) {
  // Generate a unique subscription key for this request
  const subscriptionKey = extractRequestProperties(sourceObservable);
  // Retrieve or create the subscription state for this request
  const subscriptionState = findMatchingMockDispatch(this[UY1], subscriptionKey);

  // Increment the invocation count
  subscriptionState.timesInvoked++;

  // If a callback is defined, merge its result into the subscription data
  if (subscriptionState.data.callback) {
    subscriptionState.data = {
      ...subscriptionState.data,
      ...subscriptionState.data.callback(sourceObservable)
    };
  }

  // Destructure relevant data from the subscription state
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
  } = subscriptionState;

  const {
    timesInvoked,
    times: maxInvocations
  } = subscriptionState;

  // Mark as consumed if not persistent and max invocations reached
  subscriptionState.consumed = !shouldPersist && timesInvoked >= maxInvocations;
  // Mark as pending if more invocations are allowed
  subscriptionState.pending = timesInvoked < maxInvocations;

  // Handle error case
  if (responseError !== null) {
    Nu1(this[UY1], subscriptionKey);
    config.onError(responseError);
    return true;
  }

  // Handle delayed or immediate execution
  if (typeof responseDelay === "number" && responseDelay > 0) {
    setTimeout(() => {
      processResponse(this[UY1]);
    }, responseDelay);
  } else {
    processResponse(this[UY1]);
  }

  /**
   * Processes the response and invokes the appropriate config callbacks.
   * Handles promises and async data if necessary.
   *
   * @param {Object} accessorState - The accessor state object (this[UY1]).
   * @param {*} currentData - The current response data (may be a function or value).
   */
  function processResponse(accessorState, currentData = responseData) {
    // Normalize headers
    const normalizedHeaders = Array.isArray(sourceObservable.headers)
      ? arrayToObjectFromPairs(sourceObservable.headers)
      : sourceObservable.headers;

    // If responseData is a function, call isBlobOrFileLikeObject with the request and normalized headers
    const resolvedData = typeof currentData === "function"
      ? currentData({
          ...sourceObservable,
          headers: normalizedHeaders
        })
      : currentData;

    // If resolvedData is a promise, resolve isBlobOrFileLikeObject and recurse
    if (gK6(resolvedData)) {
      resolvedData.then(nextData => processResponse(accessorState, nextData));
      return;
    }

    // Prepare response body and headers
    const responseBody = normalizeBufferLikeInput(resolvedData);
    const formattedHeaders = objectToBufferKeyValuePairs(responseHeaders);
    const formattedTrailers = objectToBufferKeyValuePairs(responseTrailers);

    // Invoke config callbacks if they exist
    config.onConnect?.(error => config.onError(error), null);
    config.onHeaders?.(statusCode, formattedHeaders, noop, getInteractionRouteName(statusCode));
    config.onData?.(Buffer.from(responseBody));
    config.onComplete?.(formattedTrailers);
    Nu1(accessorState, subscriptionKey);
  }

  /**
   * No-operation placeholder function for headers callback.
   */
  function noop() {}

  return true;
}

module.exports = handleAccessorRequest;