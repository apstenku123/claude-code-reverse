/**
 * Determines the appropriate Content-Type header for a given request body.
 *
 * @param {*} requestBody - The body of the HTTP request. Can be null, string, URLSearchParams-like, Blob-like, Buffer, ArrayBuffer, ArrayBufferView, multipart form, or custom class.
 * @returns {string|null} The Content-Type string suitable for the request body, or null if not applicable.
 */
function getContentTypeForRequestBody(requestBody) {
  // Return null if the request body is null
  if (requestBody === null) {
    return null;
  }

  // If the request body is a string, use plain text
  if (typeof requestBody === "string") {
    return "text/plain;charset=UTF-8";
  }

  // If the request body is URLSearchParams-like, use form-urlencoded
  if (isURLSearchParamsLike(requestBody)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }

  // If the request body is Blob-like (has a type property), use its type if available
  if (isBlobLike(requestBody)) {
    return requestBody.type || null;
  }

  // If the request body is a Node.js Buffer, do not set Content-Type
  if (Buffer.isBuffer(requestBody)) {
    return null;
  }

  // If the request body is an ArrayBuffer, do not set Content-Type
  if (Object.prototype.toString.call(requestBody) === "[object ArrayBuffer]") {
    return null;
  }

  // If the request body is a view on an ArrayBuffer (e.g., Uint8Array), do not set Content-Type
  if (ArrayBuffer.isView(requestBody)) {
    return null;
  }

  // If the request body has a getBoundary method, treat as multipart/form-data
  if (typeof requestBody.getBoundary === "function") {
    return `multipart/form-data;boundary=${requestBody.getBoundary()}`;
  }

  // If the request body is an instance of JK (custom class), do not set Content-Type
  if (requestBody instanceof JK) {
    return null;
  }

  // Default to plain text
  return "text/plain;charset=UTF-8";
}

module.exports = getContentTypeForRequestBody;