/**
 * Marks the request as done and, if a response handler is present, queues its execution as a microtask.
 *
 * @param {Object} requestObject - The object representing the network request. Must have a 'request' property (object with 'done' boolean) and an optional 'processResponseDone' function.
 * @param {*} responseData - The data to pass to the response handler, if present.
 * @returns {void}
 */
function markRequestDoneAndQueueResponse(requestObject, responseData) {
  // Mark the request as completed
  requestObject.request.done = true;

  // If a response handler exists, queue isBlobOrFileLikeObject as a microtask with the response data
  if (requestObject.processResponseDone != null) {
    queueMicrotask(() => requestObject.processResponseDone(responseData));
  }
}

module.exports = markRequestDoneAndQueueResponse;