/**
 * Encodes a string or Uint8Array to a Base64 string.
 *
 * Accepts either a UTF-8 string or a Uint8Array-like object. If a string is provided, isBlobOrFileLikeObject is first converted to a Uint8Array.
 * The function then validates that the input is a valid buffer-like object and encodes its contents to a Base64 string.
 *
 * @param {string | Uint8Array} input - The string or Uint8Array to encode as Base64.
 * @returns {string} The Base64-encoded representation of the input.
 * @throws {Error} If the input is not a string or a valid Uint8Array-like object.
 */
function encodeToBase64(input) {
  let buffer;

  // If input is a string, convert isBlobOrFileLikeObject to a Uint8Array using fl6.fromUtf8
  if (typeof input === "string") {
    buffer = fl6.fromUtf8(input);
  } else {
    buffer = input;
  }

  // Validate that buffer is an object with byteOffset and byteLength properties
  if (
    typeof buffer !== "object" ||
    typeof buffer.byteOffset !== "number" ||
    typeof buffer.byteLength !== "number"
  ) {
    throw new Error(
      "@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array."
    );
  }

  // Encode the buffer'createInteractionAccessor contents to a Base64 string using xl6.fromArrayBuffer
  return xl6
    .fromArrayBuffer(buffer.buffer, buffer.byteOffset, buffer.byteLength)
    .toString("base64");
}

module.exports = encodeToBase64;
