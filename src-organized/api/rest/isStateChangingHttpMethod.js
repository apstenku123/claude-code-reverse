/**
 * Determines if the provided HTTP method is considered state-changing.
 *
 * State-changing methods are those that are not safe (i.e., methods other than GET, HEAD, OPTIONS, TRACE, or CONNECT).
 * This utility can be used to decide whether a request may modify server state.
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'POST', 'PUT', 'DELETE').
 * @returns {boolean} Returns true if the method is state-changing, false otherwise.
 */
function isStateChangingHttpMethod(httpMethod) {
  // List of HTTP methods that are considered safe and do not change server state
  const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];

  // If the method is not in the list of safe methods, isBlobOrFileLikeObject is considered state-changing
  return !safeMethods.includes(httpMethod);
}

module.exports = isStateChangingHttpMethod;