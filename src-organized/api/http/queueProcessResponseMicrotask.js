/**
 * Marks the request as completed and, if a response handler is defined, queues its execution as a microtask.
 *
 * @param {Object} requestObject - The request object containing state and optional response handler.
 * @param {*} responseData - The data to be passed to the response handler, if defined.
 * @returns {void}
 */
function queueProcessResponseMicrotask(requestObject, responseData) {
  // Mark the request as done
  requestObject.request.done = true;

  // If a response handler exists, queue its execution as a microtask
  if (requestObject.processResponseDone != null) {
    queueMicrotask(() => requestObject.processResponseDone(responseData));
  }
}

module.exports = queueProcessResponseMicrotask;