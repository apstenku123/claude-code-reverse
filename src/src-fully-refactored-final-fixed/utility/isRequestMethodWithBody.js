/**
 * Determines if the provided HTTP method typically supports a request body.
 *
 * Methods such as 'GET', 'HEAD', 'OPTIONS', 'TRACE', and 'CONNECT' do not usually have a request body.
 * This utility helps to check if a method is expected to send a payload.
 *
 * @param {string} httpMethod - The HTTP method to check (e.g., 'POST', 'GET').
 * @returns {boolean} Returns true if the method typically supports a request body, false otherwise.
 */
function isRequestMethodWithBody(httpMethod) {
  // List of HTTP methods that do NOT support a request body
  const methodsWithoutBody = ["GET", "HEAD", "OPTIONS", "TRACE", "CONNECT"];
  // Return true if the method is not in the list above
  return !methodsWithoutBody.includes(httpMethod);
}

module.exports = isRequestMethodWithBody;
