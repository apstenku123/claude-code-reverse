/**
 * Decodes a base64-encoded string into a Uint8Array.
 *
 * @param {string} base64String - The base64-encoded string to decode.
 * @returns {Uint8Array} The decoded binary data as a Uint8Array.
 * @throws {TypeError} If the input string has incorrect padding or is not valid base64.
 */
function decodeBase64ToUint8Array(base64String) {
  // Check if the base64 string'createInteractionAccessor length is valid (must be divisible by 4)
  if ((base64String.length * 3) % 4 !== 0) {
    throw new TypeError("Incorrect padding on base64 string.");
  }

  // Validate the base64 string format using the kl6 regular expression
  if (!kl6.exec(base64String)) {
    throw new TypeError("Invalid base64 string.");
  }

  // Decode the base64 string to a Buffer using jl6.fromString
  const decodedBuffer = jl6.fromString(base64String, "base64");

  // Create a Uint8Array view of the decoded buffer
  return new Uint8Array(decodedBuffer.buffer, decodedBuffer.byteOffset, decodedBuffer.byteLength);
}

module.exports = decodeBase64ToUint8Array;
