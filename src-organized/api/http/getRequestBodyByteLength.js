/**
 * Calculates the byte length of various types of request bodies.
 * Supports Blob, FormData, ArrayBuffer, ArrayBufferView, URLSearchParams, and string inputs.
 *
 * @async
 * @param {any} requestBody - The request body whose byte length is to be determined.
 * @returns {Promise<number>} The byte length of the request body, or 0 if null/undefined.
 */
async function getRequestBodyByteLength(requestBody) {
  // Return 0 if the request body is null or undefined
  if (requestBody == null) return 0;

  // If the request body is a Blob, return its size property
  if (DA.isBlob(requestBody)) {
    return requestBody.size;
  }

  // If the request body is a spec-compliant FormData, calculate its byte length
  if (DA.isSpecCompliantForm(requestBody)) {
    // Create a dummy POST request to measure the serialized FormData size
    const dummyRequest = new Request(H5.origin, {
      method: "POST",
      body: requestBody
    });
    const arrayBuffer = await dummyRequest.arrayBuffer();
    return arrayBuffer.byteLength;
  }

  // If the request body is an ArrayBuffer or ArrayBufferView, return its byteLength
  if (DA.isArrayBufferView(requestBody) || DA.isArrayBuffer(requestBody)) {
    return requestBody.byteLength;
  }

  // If the request body is URLSearchParams, convert isBlobOrFileLikeObject to string for further processing
  if (DA.isURLSearchParams(requestBody)) {
    requestBody = String(requestBody);
  }

  // If the request body is a string, calculate its byte length using HH9
  if (DA.isString(requestBody)) {
    // HH9 presumably encodes the string and returns an ArrayBuffer or similar
    const encodedBuffer = await HH9(requestBody);
    return encodedBuffer.byteLength;
  }

  // If none of the above, return 0 as a fallback
  return 0;
}

module.exports = getRequestBodyByteLength;