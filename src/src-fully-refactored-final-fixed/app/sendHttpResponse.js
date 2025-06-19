/**
 * Sends an HTTP response with the specified status code, headers, and body.
 *
 * @param {http.ServerResponse} response - The HTTP response object to send data through.
 * @param {number} statusCode - The HTTP status code to send (e.g., 200, 404).
 * @param {string} [body] - The response body to send. If not provided, uses the default status message.
 * @param {Object} [customHeaders] - Optional additional headers to include in the response.
 * @returns {void}
 */
function sendHttpResponse(response, statusCode, body, customHeaders) {
  // Use default status message if body is not provided
  const responseBody = body || UI1.STATUS_CODES[statusCode];

  // Build response headers, with sensible defaults and any custom headers
  const headers = {
    Connection: "close",
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(responseBody),
    ...customHeaders
  };

  // Ensure the response is destroyed after finishing
  response.once("finish", response.destroy);

  // Construct the HTTP response string
  const statusLine = `HTTP/1.1 ${statusCode} ${UI1.STATUS_CODES[statusCode]}`;
  const headerLines = Object.keys(headers)
    .map(headerName => `${headerName}: ${headers[headerName]}`)
    .join("\r\n");
  const httpResponse = `${statusLine}\r\setKeyValuePair{headerLines}\r\n\r\setKeyValuePair{responseBody}`;

  // Send the response
  response.end(httpResponse);
}

module.exports = sendHttpResponse;