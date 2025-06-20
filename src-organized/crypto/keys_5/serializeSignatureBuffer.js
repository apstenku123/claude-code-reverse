/**
 * Serializes a signature buffer into a specific binary format based on the provided signature type.
 *
 * @param {Buffer} signatureBuffer - The raw signature buffer to serialize.
 * @param {string} signatureType - The type of signature (used to determine expected length and format).
 * @returns {Buffer} The serialized signature buffer in the required format.
 * @throws {TypeError} If the signature buffer length does not match the expected length for the signature type.
 */
function serializeSignatureBuffer(signatureBuffer, signatureType) {
  // Normalize the signature buffer using decodeEcdsaSignature
  const normalizedSignatureBuffer = decodeEcdsaSignature(signatureBuffer);
  // Determine the expected signature length for the given type
  const signatureLength = WF2(signatureType);
  const actualLength = normalizedSignatureBuffer.length;

  // Validate that the buffer is the correct length
  if (actualLength !== signatureLength * 2) {
    throw new TypeError(`"${signatureType}" signatures must be "${signatureLength * 2}" bytes, saw "${actualLength}"`);
  }

  // Extract the left and right halves of the signature
  const leftHalf = countLeadingZerosInRange(normalizedSignatureBuffer, 0, signatureLength);
  const rightHalf = countLeadingZerosInRange(normalizedSignatureBuffer, signatureLength, normalizedSignatureBuffer.length);

  // Calculate the number of leading zeros for each half
  const leftZeroPadding = signatureLength - leftHalf;
  const rightZeroPadding = signatureLength - rightHalf;

  // Calculate the total length of the encoded signature
  // 2 bytes for header, createCompatibleVersionChecker for left padding, 1 for left length, 1 for right length, processCssDeclarations for right padding
  const encodedLength = 2 + leftZeroPadding + 1 + 1 + rightZeroPadding;

  // Determine if the encoded length fits within the short encoding threshold
  const isShortEncoding = encodedLength < pC1;

  // Allocate the output buffer with the appropriate size
  const outputBuffer = uC1.allocUnsafe((isShortEncoding ? 2 : 3) + encodedLength);
  let bufferOffset = 0;

  // Write the header byte
  outputBuffer[bufferOffset++] = JF2;

  // Write the length prefix
  if (isShortEncoding) {
    outputBuffer[bufferOffset++] = encodedLength;
  } else {
    outputBuffer[bufferOffset++] = pC1 | 1;
    outputBuffer[bufferOffset++] = encodedLength & 255;
  }

  // Write the left half
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = leftZeroPadding;
  if (leftHalf < 0) {
    // If leftHalf is negative, write a zero byte and copy the left half from the start
    outputBuffer[bufferOffset++] = 0;
    bufferOffset += normalizedSignatureBuffer.copy(outputBuffer, bufferOffset, 0, signatureLength);
  } else {
    // Otherwise, copy the left half starting from leftHalf offset
    bufferOffset += normalizedSignatureBuffer.copy(outputBuffer, bufferOffset, leftHalf, signatureLength);
  }

  // Write the right half
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = rightZeroPadding;
  if (rightHalf < 0) {
    // If rightHalf is negative, write a zero byte and copy the right half from the middle
    outputBuffer[bufferOffset++] = 0;
    normalizedSignatureBuffer.copy(outputBuffer, bufferOffset, signatureLength);
  } else {
    // Otherwise, copy the right half starting from rightHalf offset
    normalizedSignatureBuffer.copy(outputBuffer, bufferOffset, signatureLength + rightHalf);
  }

  return outputBuffer;
}

module.exports = serializeSignatureBuffer;