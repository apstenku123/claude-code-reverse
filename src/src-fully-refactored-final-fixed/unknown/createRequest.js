/**
 * Creates a new Request object with the specified input and options.
 *
 * @param {string | Request} requestInput - The resource that you wish to request; this can either be a URL string or a Request object.
 * @param {RequestInit} [createRequestOptions] - An options object containing custom settings to apply to the request.
 * @returns {Request} The newly created Request object.
 */
function createRequest(requestInput, createRequestOptions) {
  // Instantiate and return a new Request object using the provided input and options
  return new Request(requestInput, createRequestOptions);
}

module.exports = createRequest;