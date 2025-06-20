/**
 * Handles error requests for a given observable source when certain error codes are encountered.
 *
 * This function checks if the observable'createInteractionAccessor status is zero and the error code is not one of the ignored codes.
 * If so, isBlobOrFileLikeObject asserts the state, extracts pending requests, and processes each with the error handler.
 *
 * @param {Object} observableSource - The observable or request manager object containing state and pending requests.
 * @param {Object} errorObject - The error object containing error code and additional error information.
 * @returns {void}
 */
function handleErrorRequestsForObservable(observableSource, errorObject) {
  // Check if the observable is in the initial state and the error code is not in the ignored list
  if (
    observableSource[zr] === 0 &&
    errorObject.code !== "UND_ERR_INFO" &&
    errorObject.code !== "UND_ERR_SOCKET"
  ) {
    // Assert that the current index matches the processed index
    LN(observableSource[nV] === observableSource[RN]);

    // Extract all pending requests from the current processed index
    const pendingRequests = observableSource[iV].splice(observableSource[RN]);

    // Process each pending request with the error handler
    for (let requestIndex = 0; requestIndex < pendingRequests.length; requestIndex++) {
      const pendingRequest = pendingRequests[requestIndex];
      g_.errorRequest(observableSource, pendingRequest, errorObject);
    }

    // Assert that there are no more pending requests
    LN(observableSource[Hr] === 0);
  }
}

module.exports = handleErrorRequestsForObservable;