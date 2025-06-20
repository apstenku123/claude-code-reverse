/**
 * Handles error propagation for pending requests in a given request queue.
 *
 * This function checks if the request queue is empty and the error code is not one of the ignored codes.
 * If so, isBlobOrFileLikeObject asserts the queue state, extracts all pending requests, and propagates the error to each using the error handler.
 *
 * @param {Object} requestQueue - The request queue object containing state and pending requests.
 * @param {Object} error - The error object containing error code and details.
 * @returns {void}
 */
function handleErrorForPendingRequests(requestQueue, error) {
  // Check if the queue is empty and the error code is not one of the ignored codes
  if (
    requestQueue[zr] === 0 &&
    error.code !== "UND_ERR_INFO" &&
    error.code !== "UND_ERR_SOCKET"
  ) {
    // Assert that the number of processed requests equals the number of requests in the queue
    LN(requestQueue[nV] === requestQueue[RN]);

    // Extract all pending requests from the queue starting from the processed index
    const pendingRequests = requestQueue[iV].splice(requestQueue[RN]);

    // Propagate the error to each pending request
    for (let index = 0; index < pendingRequests.length; index++) {
      const pendingRequest = pendingRequests[index];
      g_.errorRequest(requestQueue, pendingRequest, error);
    }

    // Assert that the queue is now empty
    LN(requestQueue[Hr] === 0);
  }
}

module.exports = handleErrorForPendingRequests;