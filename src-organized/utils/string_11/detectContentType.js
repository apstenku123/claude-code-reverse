/**
 * Determines the appropriate Content-Type header value for a given payload.
 *
 * @param {*} payload - The data whose content type is to be detected. Can be null, string, URLSearchParams-like, Blob-like, Buffer, ArrayBuffer, ArrayBufferView, multipart form, or custom JK instance.
 * @returns {string|null} The detected Content-Type string, or null if not applicable.
 */
function detectContentType(payload) {
  // Return null for null payloads
  if (payload === null) {
    return null;
  }

  // Return plain text for string payloads
  if (typeof payload === "string") {
    return "text/plain;charset=UTF-8";
  }

  // Return URL-encoded for URLSearchParams-like objects
  if (isURLSearchParamsLike(payload)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }

  // Return the type property for Blob-like objects (e.g., File, Blob)
  if (isBlobLike(payload)) {
    return payload.type || null;
  }

  // Return null for Node.js Buffer instances
  if (Buffer.isBuffer(payload)) {
    return null;
  }

  // Return null for ArrayBuffer instances
  if (Object.prototype.toString.call(payload) === "[object ArrayBuffer]") {
    return null;
  }

  // Return null for ArrayBuffer views (e.g., Uint8Array, DataView)
  if (ArrayBuffer.isView(payload)) {
    return null;
  }

  // Return multipart/form-data with boundary for FormData-like objects
  if (typeof payload.getBoundary === "function") {
    return `multipart/form-data;boundary=${payload.getBoundary()}`;
  }

  // Return null for JK class instances (custom exclusion)
  if (payload instanceof JK) {
    return null;
  }

  // Default to plain text
  return "text/plain;charset=UTF-8";
}

module.exports = detectContentType;
