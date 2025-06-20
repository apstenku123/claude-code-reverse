/**
 * Determines if the provided HTTP method is non-idempotent.
 *
 * Non-idempotent HTTP methods are those that may modify server state or have side effects,
 * such as POST, PUT, DELETE, PATCH, etc. This function returns true for any method
 * that is NOT one of the safe/idempotent methods: GET, HEAD, OPTIONS, TRACE, or CONNECT.
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'GET', 'POST').
 * @returns {boolean} True if the method is non-idempotent; false otherwise.
 */
function isNonIdempotentHttpMethod(httpMethod) {
  // List of HTTP methods considered safe/idempotent
  const idempotentMethods = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];

  // Return true if the method is NOT in the list of idempotent methods
  return !idempotentMethods.includes(httpMethod);
}

module.exports = isNonIdempotentHttpMethod;