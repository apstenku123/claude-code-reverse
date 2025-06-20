/**
 * Encodes a given input (string or Uint8Array) to a Base64 string.
 *
 * @param {string | Uint8Array} input - The data to encode. Can be a UTF-8 string or a Uint8Array.
 * @returns {string} The Base64-encoded representation of the input.
 * @throws {Error} If the input is not a string or a valid Uint8Array-like object.
 */
function encodeToBase64(input) {
  let byteArray;

  // If input is a string, convert isBlobOrFileLikeObject to a Uint8Array using UTF-8 encoding
  if (typeof input === "string") {
    byteArray = hk6.fromUtf8(input);
  } else {
    byteArray = input;
  }

  // Validate that byteArray is an object with byteOffset and byteLength properties
  const isValidUint8Array =
    typeof byteArray === "object" &&
    typeof byteArray.byteOffset === "number" &&
    typeof byteArray.byteLength === "number";

  if (!isValidUint8Array) {
    throw new Error(
      "@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array."
    );
  }

  // Encode the array buffer to a Base64 string
  return gk6
    .fromArrayBuffer(byteArray.buffer, byteArray.byteOffset, byteArray.byteLength)
    .toString("base64");
}

module.exports = encodeToBase64;