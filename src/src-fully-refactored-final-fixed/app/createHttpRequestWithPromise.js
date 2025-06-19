/**
 * Initiates an HTTP or HTTPS request based on the provided URL or request object.
 * Returns the request object with its .then method bound to a promise that resolves
 * on 'response' and rejects on 'error'.
 *
 * @param {string|object} requestSource - The URL string or request object to send the request to.
 * @param {object} [createRequestOptions={}] - Optional configuration options for the request.
 * @returns {object} The request object, with a .then method bound to the response promise.
 */
function createHttpRequestWithPromise(requestSource, createRequestOptions = {}) {
  // Determine if the request should use HTTPS or HTTP based on the URL or href property
  const urlString = typeof requestSource === "string" ? requestSource : requestSource.href;
  const httpModule = urlString.startsWith("https:") ? gD6 : bD6;

  // Initiate the request using the appropriate module
  const request = httpModule.request(requestSource, createRequestOptions);

  // Create a promise that resolves on 'response' and rejects on 'error'
  const responsePromise = new Promise((resolve, reject) => {
    request.once("response", resolve)
           .once("error", reject)
           .end();
  });

  // Bind the .then method of the request to the promise'createInteractionAccessor .then
  request.then = responsePromise.then.bind(responsePromise);

  return request;
}

module.exports = createHttpRequestWithPromise;