/**
 * Determines the appropriate Content-Type header value for a given request body.
 *
 * @param {*} requestBody - The body of the HTTP request. Can be null, string, URLSearchParams-like, Blob-like, Buffer, ArrayBuffer, ArrayBufferView, FormData-like, or custom types.
 * @returns {string|null} The Content-Type header value, or null if not applicable.
 */
function getContentTypeForBody(requestBody) {
  // Return null for null bodies
  if (requestBody === null) {
    return null;
  }

  // Return text/plain for string bodies
  if (typeof requestBody === "string") {
    return "text/plain;charset=UTF-8";
  }

  // Return application/x-www-form-urlencoded for URLSearchParams-like objects
  if (isURLSearchParamsLike(requestBody)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }

  // Return the type property if present (e.g., for Blob-like objects)
  if (isBlobLike(requestBody)) {
    return requestBody.type || null;
  }

  // Return null for Node.js Buffer instances
  if (Buffer.isBuffer(requestBody)) {
    return null;
  }

  // Return null for ArrayBuffer instances
  if (Object.prototype.toString.call(requestBody) === "[object ArrayBuffer]") {
    return null;
  }

  // Return null for ArrayBufferView (e.g., Uint8Array, DataView, etc.)
  if (ArrayBuffer.isView(requestBody)) {
    return null;
  }

  // Return multipart/form-data with boundary for FormData-like objects
  if (typeof requestBody.getBoundary === "function") {
    return `multipart/form-data;boundary=${requestBody.getBoundary()}`;
  }

  // Return null for JK instances (custom class, e.g., File or Stream)
  if (requestBody instanceof JK) {
    return null;
  }

  // Default to text/plain for any other types
  return "text/plain;charset=UTF-8";
}

module.exports = getContentTypeForBody;
