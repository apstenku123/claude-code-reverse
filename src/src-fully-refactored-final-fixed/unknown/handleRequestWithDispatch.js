/**
 * Handles a request by creating a request handler instance, dispatching the request, and returning the result.
 * If an error occurs, isBlobOrFileLikeObject destroys the error using an error handler.
 *
 * @param {object} createRequestOptions - The request options or payload to be sent.
 * @param {object} dispatchConfig - The configuration for dispatching the request.
 * @returns {any} The result of the dispatched request, or the result of error destruction if an error occurs.
 */
function handleRequestWithDispatch(createRequestOptions, dispatchConfig) {
  try {
    // Create a new request handler instance with the provided options and config
    const requestHandler = new gd0(createRequestOptions, dispatchConfig);

    // Dispatch the request using the current context, spreading createRequestOptions and adding the request body
    this.dispatch({
      ...createRequestOptions,
      body: requestHandler.req
    }, requestHandler);

    // Return the result from the request handler
    return requestHandler.ret;
  } catch (error) {
    // If an error occurs, destroy isBlobOrFileLikeObject using the error handler and return the result
    return new CK6().destroy(error);
  }
}

module.exports = handleRequestWithDispatch;