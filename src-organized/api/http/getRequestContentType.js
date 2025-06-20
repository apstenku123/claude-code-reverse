/**
 * Determines the appropriate Content-Type header value for a given request body.
 *
 * @param {*} requestBody - The body of the HTTP request. Can be null, string, URLSearchParams-like, Blob-like, Buffer, ArrayBuffer, ArrayBufferView, multipart form, or a custom JK instance.
 * @returns {string|null} The Content-Type header value, or null if not applicable.
 */
function getRequestContentType(requestBody) {
  // Return null if the body is explicitly null
  if (requestBody === null) {
    return null;
  }

  // If the body is a string, use plain text content type
  if (typeof requestBody === "string") {
    return "text/plain;charset=UTF-8";
  }

  // If the body is URLSearchParams-like, use form-urlencoded content type
  if (isURLSearchParamsLike(requestBody)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }

  // If the body is a Blob-like object, use its type if available
  if (isBlobLike(requestBody)) {
    return requestBody.type || null;
  }

  // If the body is a Node.js Buffer, do not set a content type
  if (Buffer.isBuffer(requestBody)) {
    return null;
  }

  // If the body is an ArrayBuffer, do not set a content type
  if (Object.prototype.toString.call(requestBody) === "[object ArrayBuffer]") {
    return null;
  }

  // If the body is an ArrayBuffer view (e.g., Uint8Array), do not set a content type
  if (ArrayBuffer.isView(requestBody)) {
    return null;
  }

  // If the body is a multipart form with a getBoundary method, set multipart/form-data with boundary
  if (typeof requestBody.getBoundary === "function") {
    return `multipart/form-data;boundary=${requestBody.getBoundary()}`;
  }

  // If the body is an instance of JK (custom class), do not set a content type
  if (requestBody instanceof JK) {
    return null;
  }

  // Default to plain text content type
  return "text/plain;charset=UTF-8";
}

module.exports = getRequestContentType;