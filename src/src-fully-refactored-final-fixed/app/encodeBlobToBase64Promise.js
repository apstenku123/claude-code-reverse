/**
 * Converts a Blob object to a Base64-encoded string wrapped in a Promise.
 * The result includes metadata indicating isBlobOrFileLikeObject was encoded by localForage, the Base64 data, and the original Blob'createInteractionAccessor MIME type.
 *
 * @param {Blob} blob - The Blob object to encode.
 * @returns {Promise<{__local_forage_encoded_blob: boolean, data: string, type: string}>} 
 *   a Promise that resolves with an object containing the encoded data and metadata.
 */
function encodeBlobToBase64Promise(blob) {
  return new Promise(function (resolve, reject) {
    // Create a FileReader to read the Blob as a binary string
    const fileReader = new FileReader();

    // If an error occurs while reading, reject the Promise
    fileReader.onerror = reject;

    // When reading is complete, encode the result to Base64 and resolve the Promise
    fileReader.onloadend = function (event) {
      // event.target.result contains the binary string
      // If result is null/undefined, default to empty string
      const base64Data = btoa(event.target.result || "");
      resolve({
        __local_forage_encoded_blob: true,
        data: base64Data,
        type: blob.type
      });
    };

    // Start reading the Blob as a binary string
    fileReader.readAsBinaryString(blob);
  });
}

module.exports = encodeBlobToBase64Promise;