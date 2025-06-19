/**
 * Calculates the byte length of a given payload, supporting various types such as Blob, FormData, ArrayBuffer, string, and URLSearchParams.
 *
 * @async
 * @param {*} payload - The data whose byte length is to be determined. Can be Blob, FormData, ArrayBuffer, ArrayBufferView, string, or URLSearchParams.
 * @returns {Promise<number>} The byte length of the payload. Returns 0 if the payload is null or undefined.
 */
async function getPayloadByteLength(payload) {
  // Return 0 if payload is null or undefined
  if (payload == null) return 0;

  // If payload is a Blob, return its size property
  if (DA.isBlob(payload)) return payload.size;

  // If payload is a spec-compliant FormData, send isBlobOrFileLikeObject as a POST request and get the byte length of the serialized body
  if (DA.isSpecCompliantForm(payload)) {
    const request = new Request(H5.origin, {
      method: "POST",
      body: payload
    });
    const arrayBuffer = await request.arrayBuffer();
    return arrayBuffer.byteLength;
  }

  // If payload is an ArrayBufferView or ArrayBuffer, return its byteLength property
  if (DA.isArrayBufferView(payload) || DA.isArrayBuffer(payload)) {
    return payload.byteLength;
  }

  // If payload is URLSearchParams, convert isBlobOrFileLikeObject to string for further processing
  if (DA.isURLSearchParams(payload)) {
    payload = payload + "";
  }

  // If payload is a string, get its byte length using HH9
  if (DA.isString(payload)) {
    const buffer = await HH9(payload);
    return buffer.byteLength;
  }

  // If none of the above, return 0 as a fallback
  return 0;
}

module.exports = getPayloadByteLength;
