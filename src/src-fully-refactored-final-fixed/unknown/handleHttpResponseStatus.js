/**
 * Handles an HTTP response by validating its status and invoking appropriate callbacks.
 *
 * @param {Function} onSuccess - Callback to execute if the response status is valid.
 * @param {Function} onError - Callback to execute if the response status is invalid.
 * @param {Object} response - The HTTP response object containing status, config, request, etc.
 * @returns {void}
 *
 * If the response status is valid according to the provided validateStatus function,
 * the onSuccess callback is called with the response. Otherwise, onError is called
 * with an error object describing the failure.
 */
function handleHttpResponseStatus(onSuccess, onError, response) {
  // Extract the validateStatus function from the response config
  const validateStatus = response.config.validateStatus;

  // If status is missing, or validateStatus is not defined, or status passes validation
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    // Call the success callback with the response
    onSuccess(response);
  } else {
    // Determine the error code based on the status code range
    // 400-499: ERR_BAD_REQUEST, 500-599: ERR_BAD_RESPONSE
    const errorCode = [
      Y2.ERR_BAD_REQUEST, // for 4xx
      Y2.ERR_BAD_RESPONSE // for 5xx
    ][Math.floor(response.status / 100) - 4];

    // Construct an error message
    const errorMessage = `Request failed with status code ${response.status}`;

    // Call the error callback with a new error object
    onError(
      new Y2(
        errorMessage,
        errorCode,
        response.config,
        response.request,
        response
      )
    );
  }
}

module.exports = handleHttpResponseStatus;