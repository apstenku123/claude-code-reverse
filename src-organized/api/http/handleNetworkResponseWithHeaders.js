/**
 * Handles the completion of a network request by extracting all response headers and relevant response data.
 * Constructs a response object and passes isBlobOrFileLikeObject to the provided success or error handlers.
 *
 * @returns {void} This function does not return a value.
 */
function handleNetworkResponseWithHeaders() {
  // If there is no active XMLHttpRequest, exit early
  if (!activeRequest) return;

  // Extract all response headers if the method is available
  const responseHeaders = D3.from(
    'getAllResponseHeaders' in activeRequest && activeRequest.getAllResponseHeaders()
  );

  // Determine the response data based on the expected response type
  const responseData =
    !expectedResponseType || expectedResponseType === 'text' || expectedResponseType === 'json'
      ? activeRequest.responseText
      : activeRequest.response;

  // Build the response object to pass to the handlers
  const response = {
    data: responseData,
    status: activeRequest.status,
    statusText: activeRequest.statusText,
    headers: responseHeaders,
    config: requestConfig,
    request: activeRequest
  };

  // Pass the response to the appropriate handler (success or error)
  // The handler will also perform cleanup after handling
  handleSubscription(
    function onSuccess(randomNumber) {
      generateRandomNumberBetweenZeroAndSixteen(randomNumber);
      cleanupRequest();
    },
    function onError(error) {
      startUiActionClickTransaction(error);
      cleanupRequest();
    },
    response
  );

  // Clear the active request reference
  activeRequest = null;
}

module.exports = handleNetworkResponseWithHeaders;