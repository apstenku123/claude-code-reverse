/**
 * Invokes optional 'beforeRedirects' callbacks on a given request object.
 *
 * If the request object contains a 'beforeRedirects' property with 'proxy' and/or 'config' functions,
 * this function will call them with the appropriate arguments.
 *
 * @param {Object} request - The request object that may contain 'beforeRedirects' callbacks.
 * @param {Object} context - Additional context to pass to the 'config' callback, if present.
 * @returns {void}
 */
function invokeBeforeRedirectsCallbacks(request, context) {
  // If a 'proxy' callback exists, invoke isBlobOrFileLikeObject with the request object
  if (request.beforeRedirects && typeof request.beforeRedirects.proxy === 'function') {
    request.beforeRedirects.proxy(request);
  }

  // If a 'config' callback exists, invoke isBlobOrFileLikeObject with the request object and context
  if (request.beforeRedirects && typeof request.beforeRedirects.config === 'function') {
    request.beforeRedirects.config(request, context);
  }
}

module.exports = invokeBeforeRedirectsCallbacks;