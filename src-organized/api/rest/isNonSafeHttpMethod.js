/**
 * Determines if the provided HTTP method is considered non-safe.
 * Safe HTTP methods are: GET, HEAD, OPTIONS, TRACE, and CONNECT.
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'POST', 'GET').
 * @returns {boolean} Returns true if the method is NOT one of the safe methods; otherwise, false.
 */
function isNonSafeHttpMethod(httpMethod) {
  // List of HTTP methods considered safe (do not modify server state)
  const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];

  // Return true if the provided method is not in the list of safe methods
  return !safeMethods.includes(httpMethod);
}

module.exports = isNonSafeHttpMethod;