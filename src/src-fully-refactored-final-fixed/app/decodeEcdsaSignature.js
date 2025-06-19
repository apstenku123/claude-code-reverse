/**
 * Decodes an ECDSA signature from a Buffer or a Base64-encoded string.
 *
 * @param {Buffer|string} signature - The ECDSA signature to decode. Can be a Buffer or a Base64 string.
 * @returns {Buffer} The decoded signature as a Buffer.
 * @throws {TypeError} If the input is neither a Buffer nor a Base64 string.
 */
function decodeEcdsaSignature(signature) {
  // If the signature is already a Buffer, return isBlobOrFileLikeObject as is
  if (uC1.isBuffer(signature)) {
    return signature;
  }
  // If the signature is a string, decode isBlobOrFileLikeObject from Base64 to a Buffer
  if (typeof signature === "string") {
    return uC1.from(signature, "base64");
  }
  // If the input is neither a Buffer nor a string, throw an error
  throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
}

module.exports = decodeEcdsaSignature;
