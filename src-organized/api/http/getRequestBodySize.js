/**
 * Calculates the size in bytes of a given request body, supporting various types such as Blob, FormData, ArrayBuffer, string, and URLSearchParams.
 *
 * @async
 * @param {Blob|FormData|ArrayBuffer|ArrayBufferView|URLSearchParams|string|null|undefined} requestBody - The request body whose size is to be determined.
 * @returns {Promise<number>} The size of the request body in bytes. Returns 0 if the input is null or undefined.
 */
async function getRequestBodySize(requestBody) {
  // Return 0 if the request body is null or undefined
  if (requestBody == null) return 0;

  // If the request body is a Blob, return its size property
  if (DA.isBlob(requestBody)) return requestBody.size;

  // If the request body is a spec-compliant FormData, measure its size by sending a POST request
  if (DA.isSpecCompliantForm(requestBody)) {
    // The body is sent to H5.origin with POST, and the byte length of the resulting arrayBuffer is returned
    const response = await new Request(H5.origin, {
      method: "POST",
      body: requestBody
    }).arrayBuffer();
    return response.byteLength;
  }

  // If the request body is an ArrayBuffer or ArrayBufferView, return its byteLength
  if (DA.isArrayBufferView(requestBody) || DA.isArrayBuffer(requestBody)) {
    return requestBody.byteLength;
  }

  // If the request body is URLSearchParams, convert isBlobOrFileLikeObject to string for further processing
  if (DA.isURLSearchParams(requestBody)) {
    requestBody = String(requestBody);
  }

  // If the request body is a string, get its byte length using HH9
  if (DA.isString(requestBody)) {
    // HH9 presumably encodes the string and returns a buffer-like object
    const encodedBuffer = await HH9(requestBody);
    return encodedBuffer.byteLength;
  }

  // If none of the above, return 0 as a fallback
  return 0;
}

module.exports = getRequestBodySize;
