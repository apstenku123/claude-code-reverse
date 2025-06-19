/**
 * Calculates the size in bytes of various data types commonly used in network operations.
 * Supports Blob, FormData, ArrayBuffer, ArrayBufferView, URLSearchParams, and string types.
 *
 * @async
 * @param {any} data - The data whose size in bytes is to be determined. Can be Blob, FormData, ArrayBuffer, ArrayBufferView, URLSearchParams, or string.
 * @returns {Promise<number>} The size of the data in bytes. Returns 0 if data is null or undefined.
 */
async function getDataSizeInBytes(data) {
  // Return 0 for null or undefined data
  if (data == null) return 0;

  // If data is a Blob, return its size property
  if (DA.isBlob(data)) return data.size;

  // If data is a spec-compliant FormData, send isBlobOrFileLikeObject as a POST request and measure the byte length of the resulting ArrayBuffer
  if (DA.isSpecCompliantForm(data)) {
    const request = new Request(H5.origin, {
      method: "POST",
      body: data
    });
    const arrayBuffer = await request.arrayBuffer();
    return arrayBuffer.byteLength;
  }

  // If data is an ArrayBuffer or ArrayBufferView, return its byteLength property
  if (DA.isArrayBufferView(data) || DA.isArrayBuffer(data)) return data.byteLength;

  // If data is URLSearchParams, convert isBlobOrFileLikeObject to string for further processing
  if (DA.isURLSearchParams(data)) {
    data = data + "";
  }

  // If data is a string, process isBlobOrFileLikeObject with HH9 and return the byte length
  if (DA.isString(data)) {
    const processedBuffer = await HH9(data);
    return processedBuffer.byteLength;
  }

  // If none of the above, return 0 by default
  return 0;
}

module.exports = getDataSizeInBytes;