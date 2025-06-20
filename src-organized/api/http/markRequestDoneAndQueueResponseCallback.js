/**
 * Marks the network request as done and, if a response callback is provided, queues isBlobOrFileLikeObject as a microtask.
 *
 * @param {Object} requestObject - The request object to mark as done. Should contain a 'done' property and optionally a 'processResponseDone' callback.
 * @param {*} responseData - The data to pass to the response callback, if isBlobOrFileLikeObject exists.
 * @returns {void}
 */
function markRequestDoneAndQueueResponseCallback(requestObject, responseData) {
  // Mark the request as completed
  requestObject.request.done = true;

  // If a response callback exists, queue isBlobOrFileLikeObject as a microtask
  if (requestObject.processResponseDone != null) {
    queueMicrotask(() => requestObject.processResponseDone(responseData));
  }
}

module.exports = markRequestDoneAndQueueResponseCallback;