/**
 * Handles HTTP redirect logic for a given request and response.
 * Validates redirect URLs, manages redirect counts, modifies request headers and methods as needed,
 * and updates timing information for the redirect process.
 *
 * @param {Object} fetchContext - The context object containing the request and timing info.
 * @param {Object} responseContext - The response object or an object containing the internal response.
 * @returns {Promise|any} Returns the original response object, or a Promise resolving to an error object if redirect fails validation.
 */
function handleHttpRedirect(fetchContext, responseContext) {
  const request = fetchContext.request;
  // Use internalResponse if present, otherwise use responseContext directly
  const response = responseContext.internalResponse ? responseContext.internalResponse : responseContext;
  let redirectUrl;

  try {
    // Attempt to extract the redirect URL from the response using the hash of the request
    redirectUrl = hz6(response, ww(request).hash);
    if (redirectUrl == null) {
      // No redirect URL found, return the original response
      return responseContext;
    }
  } catch (error) {
    // If an error occurs, wrap isBlobOrFileLikeObject in an error object and resolve as a Promise
    return Promise.resolve(o5(error));
  }

  // Ensure the redirect URL uses HTTP or HTTPS scheme
  if (!su1(redirectUrl)) {
    return Promise.resolve(o5("URL scheme must be a HTTP(s) scheme"));
  }

  // Prevent infinite redirect loops by limiting to 20 redirects
  if (request.redirectCount === 20) {
    return Promise.resolve(o5("redirect count exceeded"));
  }

  // Increment redirect count
  request.redirectCount += 1;

  // For CORS requests, block redirects to URLs with credentials unless allowed
  if (
    request.mode === "cors" &&
    (redirectUrl.username || redirectUrl.password) &&
    !nu1(request, redirectUrl)
  ) {
    return Promise.resolve(o5('cross origin not allowed for request mode "cors"'));
  }

  // For CORS-tainted responses, block URLs with credentials
  if (
    request.responseTainting === "cors" &&
    (redirectUrl.username || redirectUrl.password)
  ) {
    return Promise.resolve(o5('URL cannot contain credentials for request mode "cors"'));
  }

  // For non-303 redirects with a non-null body that has no source, reject
  if (
    response.status !== 303 &&
    request.body != null &&
    request.body.source == null
  ) {
    return Promise.resolve(o5());
  }

  // For 301/302 POST or 303 with non-standard method, convert to GET and remove body and sensitive headers
  if (
    ([301, 302].includes(response.status) && request.method === "POST") ||
    (response.status === 303 && !Nw6.includes(request.method))
  ) {
    request.method = "GET";
    request.body = null;
    // Remove headers that must not be forwarded on redirect
    for (const headerName of Dw6) {
      request.headersList.delete(headerName);
    }
  }

  // Remove sensitive headers if redirect is cross-origin
  if (!nu1(ww(request), redirectUrl)) {
    request.headersList.delete("authorization", true);
    request.headersList.delete("proxy-authorization", true);
    request.headersList.delete("cookie", true);
    request.headersList.delete("host", true);
  }

  // If the request has a body with a source, validate and update the body
  if (request.body != null) {
    s_(request.body.source != null);
    request.body = ru1(request.body.source)[0];
  }

  // Update timing information for the redirect
  const timingInfo = fetchContext.timingInfo;
  timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = fr(fetchContext.crossOriginIsolatedCapability);
  if (timingInfo.redirectStartTime === 0) {
    timingInfo.redirectStartTime = timingInfo.startTime;
  }

  // Add the redirect URL to the request'createInteractionAccessor URL list
  request.urlList.push(redirectUrl);
  // Update the request and response state for the redirect
  mz6(request, response);
  // Continue processing after redirect
  return processNetworkRequest(fetchContext, true);
}

module.exports = handleHttpRedirect;