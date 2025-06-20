/**
 * Handles the full lifecycle of an HTTP request, including request/response processing,
 * timing, header management, and cross-origin isolation checks. Returns a controller
 * for managing the request lifecycle and termination.
 *
 * @param {Object} options - The configuration object for the request lifecycle.
 * @param {Object} options.request - The HTTP request object.
 * @param {Function} options.processRequestBodyChunkLength - Callback to process request body chunk length.
 * @param {Function} options.processRequestEndOfBody - Callback to process the end of the request body.
 * @param {Function} options.processResponse - Callback to process the response.
 * @param {Function} options.processResponseEndOfBody - Callback to process the end of the response body.
 * @param {Function} options.processResponseConsumeBody - Callback to consume the response body.
 * @param {boolean} [options.useParallelQueue=false] - Whether to use a parallel queue for processing.
 * @param {Object} [options.dispatcher=ww6()] - Dispatcher instance for request handling.
 * @returns {Object} The controller for the request lifecycle.
 */
function handleHttpRequestLifecycle({
  request,
  processRequestBodyChunkLength,
  processRequestEndOfBody,
  processResponse,
  processResponseEndOfBody,
  processResponseConsumeBody,
  useParallelQueue = false,
  dispatcher = ww6()
}) {
  // Ensure dispatcher is properly initialized
  s_(dispatcher);

  let taskDestination = null;
  let crossOriginIsolatedCapability = false;

  // Extract global object and cross-origin isolation capability from client if available
  if (request.client != null) {
    taskDestination = request.client.globalObject;
    crossOriginIsolatedCapability = request.client.crossOriginIsolatedCapability;
  }

  // Get the current time for timing info
  const startTime = fr(crossOriginIsolatedCapability);
  const timingInfo = au1({ startTime });

  // Create the controller for managing the request lifecycle
  const controller = new ou1(dispatcher);

  // Bundle all relevant context and callbacks into a single context object
  const requestContext = {
    controller,
    request,
    timingInfo,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseConsumeBody,
    processResponseEndOfBody,
    taskDestination,
    crossOriginIsolatedCapability
  };

  // Validate that request body is either absent or a stream
  s_(!request.body || request.body.stream);

  // Normalize window property if set to 'client'
  if (request.window === "client") {
    request.window = request.client?.globalObject?.constructor?.name === "Window"
      ? request.client
      : "no-window";
  }

  // Normalize origin property if set to 'client'
  if (request.origin === "client") {
    request.origin = request.client.origin;
  }

  // Normalize policyContainer property if set to 'client'
  if (request.policyContainer === "client") {
    if (request.client != null) {
      request.policyContainer = fz6(request.client.policyContainer);
    } else {
      request.policyContainer = xz6();
    }
  }

  // Ensure 'accept' header is present
  if (!request.headersList.contains("accept", true)) {
    request.headersList.append("accept", "*/*", true);
  }

  // Ensure 'accept-language' header is present
  if (!request.headersList.contains("accept-language", true)) {
    request.headersList.append("accept-language", "*", true);
  }

  // The following checks are placeholders for future logic or side effects
  if (request.priority === null) {
    // No-op: Placeholder for priority handling
  }
  if (Yw6.has(request.destination)) {
    // No-op: Placeholder for destination handling
  }

  // Start the request lifecycle and handle errors by terminating the controller
  processNetworkRequest(requestContext).catch(error => {
    controller.terminate(error);
  });

  return controller;
}

module.exports = handleHttpRequestLifecycle;