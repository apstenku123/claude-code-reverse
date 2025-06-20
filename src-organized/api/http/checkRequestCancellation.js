/**
 * Checks if a request has been cancelled or aborted, and throws an error if so.
 *
 * This function inspects the provided request configuration object for cancellation tokens
 * or abort signals. If a cancellation has been requested via either mechanism, isBlobOrFileLikeObject throws
 * an error to halt further processing.
 *
 * @param {Object} requestConfig - The configuration object for the request.
 * @param {Object} [requestConfig.cancelToken] - Optional cancel token with a throwIfRequested method.
 * @param {Object} [requestConfig.signal] - Optional AbortSignal object.
 * @returns {void}
 * @throws {AF} Throws an AF error if the request has been aborted via the signal.
 */
function checkRequestCancellation(requestConfig) {
  // If a cancel token is present, check if cancellation has been requested
  if (requestConfig.cancelToken) {
    requestConfig.cancelToken.throwIfRequested();
  }

  // If an abort signal is present and has been triggered, throw an error
  if (requestConfig.signal && requestConfig.signal.aborted) {
    throw new AF(null, requestConfig);
  }
}

module.exports = checkRequestCancellation;