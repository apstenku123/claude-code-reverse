/**
 * Handles the completion of a network request by extracting all response headers and constructing a response object.
 * It then invokes success or error handlers and performs necessary cleanup.
 *
 * @returns {void} This function does not return a value.
 */
function handleNetworkResponseHeaders() {
  // If there is no active request, exit early
  if (!activeRequest) return;

  // Extract all response headers if available, using D3.from for parsing
  const responseHeaders = D3.from(
    "getAllResponseHeaders" in activeRequest && activeRequest.getAllResponseHeaders()
  );

  // Build the response data object
  const response = {
    data:
      !responseType || responseType === "text" || responseType === "json"
        ? activeRequest.responseText
        : activeRequest.response,
    status: activeRequest.status,
    statusText: activeRequest.statusText,
    headers: responseHeaders,
    config: requestConfig,
    request: activeRequest
  };

  // Call the subscription handler with success and error callbacks
  subscriptionHandler(
    // Success callback
    function onSuccess(result) {
      handleSuccess(result);
      cleanup();
    },
    // Error callback
    function onError(error) {
      handleError(error);
      cleanup();
    },
    response
  );

  // Nullify the active request to prevent memory leaks
  activeRequest = null;
}

module.exports = handleNetworkResponseHeaders;