/**
 * Constructs a signature envelope buffer from a given signature and key type.
 *
 * @param {Buffer} signatureBytes - The signature as a Buffer. Must be twice the length of the key size.
 * @param {string} keyType - The key type identifier (used to determine key size).
 * @returns {Buffer} The constructed signature envelope buffer.
 * @throws {TypeError} If the signature length does not match the expected size for the key type.
 */
function createSignatureEnvelope(signatureBytes, keyType) {
  // Normalize the signature buffer
  const normalizedSignature = decodeEcdsaSignature(signatureBytes);

  // Determine the key size in bytes for the given key type
  const keySizeBytes = WF2(keyType);
  const signatureLength = normalizedSignature.length;

  // The signature must be exactly twice the key size
  if (signatureLength !== keySizeBytes * 2) {
    throw new TypeError(
      `"${keyType}" signatures must be "${keySizeBytes * 2}" bytes, saw "${signatureLength}"`
    );
  }

  // Extract the left and right halves of the signature
  const leftHalfOffset = countLeadingZerosInRange(normalizedSignature, 0, keySizeBytes);
  const rightHalfOffset = countLeadingZerosInRange(normalizedSignature, keySizeBytes, signatureLength);

  // Calculate the number of leading zeros in each half
  const leftPadding = keySizeBytes - leftHalfOffset;
  const rightPadding = keySizeBytes - rightHalfOffset;

  // Calculate the total envelope length
  // Structure: 2 bytes header + leftPadding + 1 + 1 + rightPadding
  const envelopeLength = 2 + leftPadding + 1 + 1 + rightPadding;
  const isShortEnvelope = envelopeLength < pC1;

  // Allocate the buffer for the envelope
  // If short, use 2 bytes for header; if long, use 3 bytes
  const totalBufferLength = (isShortEnvelope ? 2 : 3) + envelopeLength;
  const envelopeBuffer = uC1.allocUnsafe(totalBufferLength);

  let bufferOffset = 0;

  // Write envelope header
  envelopeBuffer[bufferOffset++] = JF2;
  if (isShortEnvelope) {
    envelopeBuffer[bufferOffset++] = envelopeLength;
  } else {
    envelopeBuffer[bufferOffset++] = pC1 | 1;
    envelopeBuffer[bufferOffset++] = envelopeLength & 255;
  }

  // Write left half
  envelopeBuffer[bufferOffset++] = cC1;
  envelopeBuffer[bufferOffset++] = leftPadding;
  if (leftHalfOffset < 0) {
    // If no non-zero bytes, pad with zero
    envelopeBuffer[bufferOffset++] = 0;
    bufferOffset += normalizedSignature.copy(envelopeBuffer, bufferOffset, 0, keySizeBytes);
  } else {
    // Copy the non-zero portion of the left half
    bufferOffset += normalizedSignature.copy(envelopeBuffer, bufferOffset, leftHalfOffset, keySizeBytes);
  }

  // Write right half
  envelopeBuffer[bufferOffset++] = cC1;
  envelopeBuffer[bufferOffset++] = rightPadding;
  if (rightHalfOffset < 0) {
    // If no non-zero bytes, pad with zero
    envelopeBuffer[bufferOffset++] = 0;
    normalizedSignature.copy(envelopeBuffer, bufferOffset, keySizeBytes);
  } else {
    // Copy the non-zero portion of the right half
    normalizedSignature.copy(envelopeBuffer, bufferOffset, keySizeBytes + rightHalfOffset);
  }

  return envelopeBuffer;
}

module.exports = createSignatureEnvelope;