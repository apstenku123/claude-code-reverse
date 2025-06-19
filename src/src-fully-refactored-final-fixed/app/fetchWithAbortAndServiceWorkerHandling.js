/**
 * Handles a fetch-like request with support for abort signals and special handling for ServiceWorker environments.
 * Ensures argument validation, manages abort logic, and processes the response with error handling.
 *
 * @param {RequestInfo} requestInfo - The resource that you wish to fetch. Can be a URL string or a Request object.
 * @param {RequestInit} [requestInit] - An options object containing custom settings to apply to the request.
 * @returns {Promise<any>} a promise that resolves with the response or rejects with an error or abort reason.
 */
function fetchWithAbortAndServiceWorkerHandling(requestInfo, requestInit = undefined) {
  // Validate the number of arguments
  Ew6.argumentLengthCheck(arguments, 1, "globalThis.fetch");

  // Create a deferred/promise-like object to manage the async result
  const deferred = iz6();
  let fetchRequestInstance;

  try {
    // Create the internal fetch request instance
    fetchRequestInstance = new jz6(requestInfo, requestInit);
  } catch (error) {
    // If instantiation fails, reject the promise and return
    deferred.reject(error);
    return deferred.promise;
  }

  // Extract the internal request object
  const internalRequest = fetchRequestInstance[ip0];

  // If the request was already aborted, handle abort logic and return
  if (fetchRequestInstance.signal.aborted) {
    handleStreamCancellationAndRejection(deferred, internalRequest, null, fetchRequestInstance.signal.reason);
    return deferred.promise;
  }

  // If running in a ServiceWorkerGlobalScope, set serviceWorkers property to 'none'
  if (internalRequest.client.globalObject?.constructor?.name === "ServiceWorkerGlobalScope") {
    internalRequest.serviceWorkers = "none";
  }

  let responseWeakRef = null;
  let isAborted = false;
  let abortController = null;

  // Register abort signal listener
  Cw6(fetchRequestInstance.signal, () => {
    isAborted = true;
    s_(abortController != null);
    abortController.abort(fetchRequestInstance.signal.reason);
    const dereferencedResponse = responseWeakRef?.deref();
    handleStreamCancellationAndRejection(deferred, internalRequest, dereferencedResponse, fetchRequestInstance.signal.reason);
  });

  // Start the request processing pipeline
  abortController = handleHttpRequestLifecycle({
    request: internalRequest,
    processResponseEndOfBody: qw6,
    processResponse: response => {
      if (isAborted) return;
      if (response.aborted) {
        handleStreamCancellationAndRejection(deferred, internalRequest, responseWeakRef, abortController.serializedAbortReason);
        return;
      }
      if (response.type === "error") {
        deferred.reject(new TypeError("fetch failed", { cause: response.error }));
        return;
      }
      // Store the response in a WeakRef and resolve the promise
      responseWeakRef = new WeakRef(_z6(response, "immutable"));
      deferred.resolve(responseWeakRef.deref());
      // Null out deferred to prevent further resolution
      // (matches original code'createInteractionAccessor intent)
      // eslint-disable-next-line no-param-reassign
      deferred = null;
    },
    dispatcher: fetchRequestInstance[Gw6]
  });

  return deferred.promise;
}

module.exports = fetchWithAbortAndServiceWorkerHandling;