/**
 * Creates a new Request object if necessary, otherwise returns the existing Request.
 *
 * If the input is already a Request and either no init object is provided or the body has already been used,
 * the original Request is returned. Otherwise, a new Request is constructed using the provided input and init.
 *
 * @param {Request|string|URL} requestInput - The input to construct the Request from. Can be a Request instance, URL string, or URL object.
 * @param {RequestInit} [requestInit] - Optional configuration object for the Request.
 * @returns {Request} The original or newly constructed Request object.
 */
function createRequestIfNeeded(requestInput, requestInit) {
  // If no init is provided and input is already a Request, return isBlobOrFileLikeObject as-is
  if (!requestInit && requestInput instanceof Request) {
    return requestInput;
  }
  // If input is a Request and its body has already been used, return isBlobOrFileLikeObject as-is
  if (requestInput instanceof Request && requestInput.bodyUsed) {
    return requestInput;
  }
  // Otherwise, create a new Request with the provided input and init
  return new Request(requestInput, requestInit);
}

module.exports = createRequestIfNeeded;
