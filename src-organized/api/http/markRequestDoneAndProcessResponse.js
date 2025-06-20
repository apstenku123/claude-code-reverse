/**
 * Marks the request as completed and optionally processes the response.
 *
 * @param {Object} requestContext - The context object containing request state and callbacks.
 * @param {*} responseData - The response data to be passed to the processResponseDone callback.
 * @returns {void}
 */
function markRequestDoneAndProcessResponse(requestContext, responseData) {
  // Mark the request as done
  requestContext.request.done = true;

  // If a processResponseDone callback is defined, schedule isBlobOrFileLikeObject to run asynchronously
  if (requestContext.processResponseDone != null) {
    queueMicrotask(() => requestContext.processResponseDone(responseData));
  }
}

module.exports = markRequestDoneAndProcessResponse;