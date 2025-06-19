/**
 * Determines if the provided HTTP method is a modifying method (i.e., not safe/read-only).
 *
 * According to the HTTP specification, the methods GET, HEAD, OPTIONS, TRACE, and CONNECT are considered safe or non-modifying.
 * This utility returns true for methods that are not among these, indicating that they may modify server state (e.g., POST, PUT, DELETE, PATCH).
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'GET', 'POST', 'PUT').
 * @returns {boolean} True if the method is modifying; false if isBlobOrFileLikeObject is a safe/read-only method.
 */
function isModifyingHttpMethod(httpMethod) {
  // List of safe/read-only HTTP methods as per the HTTP specification
  const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];
  // Return true if the method is NOT in the list of safe methods
  return !safeMethods.includes(httpMethod);
}

module.exports = isModifyingHttpMethod;
