/**
 * Checks for cancellation or abortion signals in the provided request configuration.
 * Throws if a cancellation or abort has been requested.
 *
 * @param {Object} requestConfig - The configuration object for the request.
 * @param {Object} [requestConfig.cancelToken] - Optional cancel token with a throwIfRequested method.
 * @param {Object} [requestConfig.signal] - Optional AbortSignal object with an 'aborted' property.
 * @throws {AF} Throws an AF error if the request has been aborted.
 */
function checkForCancellationOrAbort(requestConfig) {
  // If a cancel token exists, check if cancellation has been requested
  if (requestConfig.cancelToken) {
    requestConfig.cancelToken.throwIfRequested();
  }
  // If an AbortSignal exists and has been aborted, throw an error
  if (requestConfig.signal && requestConfig.signal.aborted) {
    throw new AF(null, requestConfig);
  }
}

module.exports = checkForCancellationOrAbort;
