/**
 * Encodes a signature buffer with associated metadata into a specific binary format.
 * Validates the signature length, splits isBlobOrFileLikeObject into two parts, computes padding, and writes the result into a buffer.
 *
 * @param {Buffer} signatureBuffer - The input signature buffer to encode.
 * @param {string} signatureType - The type of signature, used to determine expected length and encoding.
 * @returns {Buffer} The encoded buffer containing the signature and metadata.
 * @throws {TypeError} If the signature buffer length does not match the expected length for the signature type.
 */
function encodeSignatureWithMetadata(signatureBuffer, signatureType) {
  // Normalize the signature buffer
  const normalizedSignature = decodeEcdsaSignature(signatureBuffer);
  // Determine the expected signature length for the given type
  const expectedSignatureLength = WF2(signatureType);
  const actualSignatureLength = normalizedSignature.length;

  // Validate signature length
  if (actualSignatureLength !== expectedSignatureLength * 2) {
    throw new TypeError(
      `"${signatureType}" signatures must be "${expectedSignatureLength * 2}" bytes, saw "${actualSignatureLength}"`
    );
  }

  // Split the signature into two parts
  const firstHalfOffset = countLeadingZerosInRange(normalizedSignature, 0, expectedSignatureLength);
  const secondHalfOffset = countLeadingZerosInRange(normalizedSignature, expectedSignatureLength, normalizedSignature.length);

  // Calculate padding for each half
  const firstHalfPadding = expectedSignatureLength - firstHalfOffset;
  const secondHalfPadding = expectedSignatureLength - secondHalfOffset;

  // Calculate the total encoded length
  const encodedLength = 2 + firstHalfPadding + 1 + 1 + secondHalfPadding;
  const isShortEncoding = encodedLength < pC1;

  // Allocate the output buffer
  const outputBuffer = uC1.allocUnsafe((isShortEncoding ? 2 : 3) + encodedLength);
  let bufferOffset = 0;

  // Write header
  outputBuffer[bufferOffset++] = JF2;
  if (isShortEncoding) {
    outputBuffer[bufferOffset++] = encodedLength;
  } else {
    outputBuffer[bufferOffset++] = pC1 | 1;
    outputBuffer[bufferOffset++] = encodedLength & 255;
  }

  // Write first half
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = firstHalfPadding;
  if (firstHalfOffset < 0) {
    outputBuffer[bufferOffset++] = 0;
    bufferOffset += normalizedSignature.copy(outputBuffer, bufferOffset, 0, expectedSignatureLength);
  } else {
    bufferOffset += normalizedSignature.copy(outputBuffer, bufferOffset, firstHalfOffset, expectedSignatureLength);
  }

  // Write second half
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = secondHalfPadding;
  if (secondHalfOffset < 0) {
    outputBuffer[bufferOffset++] = 0;
    normalizedSignature.copy(outputBuffer, bufferOffset, expectedSignatureLength);
  } else {
    normalizedSignature.copy(outputBuffer, bufferOffset, expectedSignatureLength + secondHalfOffset);
  }

  return outputBuffer;
}

module.exports = encodeSignatureWithMetadata;