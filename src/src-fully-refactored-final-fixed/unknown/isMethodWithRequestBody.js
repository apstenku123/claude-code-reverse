/**
 * Determines if an HTTP method typically allows a request body.
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'GET', 'POST', etc.).
 * @returns {boolean} Returns true if the method usually allows a request body, false otherwise.
 */
function isMethodWithRequestBody(httpMethod) {
  // Methods that do NOT allow a request body according to HTTP spec
  const methodsWithoutBody = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];
  // Return true if the method is NOT in the list above
  return !methodsWithoutBody.includes(httpMethod);
}

module.exports = isMethodWithRequestBody;