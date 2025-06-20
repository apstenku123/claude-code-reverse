/**
 * Serializes a cryptographic signature into a specific binary format, splitting isBlobOrFileLikeObject into two chunks and encoding metadata.
 *
 * @param {Buffer} signatureBuffer - The signature as a Buffer. Must be twice the length of the chunk size.
 * @param {number} chunkSize - The size (in bytes) of each signature chunk. Used to split the signature.
 * @returns {Buffer} The serialized signature in the required binary format.
 * @throws {TypeError} If the signature length does not match the expected size.
 */
function serializeSignatureWithChunks(signatureBuffer, chunkSize) {
  // Normalize the signature buffer (possibly converts to Buffer if not already)
  const normalizedSignature = decodeEcdsaSignature(signatureBuffer);
  // Determine the chunk size (number of bytes per chunk)
  const chunkByteLength = WF2(chunkSize);
  const signatureLength = normalizedSignature.length;

  // The signature must be exactly twice the chunk size
  if (signatureLength !== chunkByteLength * 2) {
    throw new TypeError(
      `"${chunkSize}" signatures must be "${chunkByteLength * 2}" bytes, saw "${signatureLength}"`
    );
  }

  // Split the signature into two chunks
  const firstChunk = countLeadingZerosInRange(normalizedSignature, 0, chunkByteLength);
  const secondChunk = countLeadingZerosInRange(normalizedSignature, chunkByteLength, signatureLength);

  // Calculate leading zeros for each chunk
  const leadingZerosFirst = chunkByteLength - firstChunk;
  const leadingZerosSecond = chunkByteLength - secondChunk;

  // Calculate the total length of the serialized buffer
  // 2 (header) + leadingZerosFirst + 1 + 1 + leadingZerosSecond
  const serializedLength = 2 + leadingZerosFirst + 1 + 1 + leadingZerosSecond;
  const isShortFormat = serializedLength < pC1;

  // Allocate the output buffer
  const outputBuffer = uC1.allocUnsafe((isShortFormat ? 2 : 3) + serializedLength);
  let bufferOffset = 0;

  // Write header
  outputBuffer[bufferOffset++] = JF2;
  if (isShortFormat) {
    outputBuffer[bufferOffset++] = serializedLength;
  } else {
    outputBuffer[bufferOffset++] = pC1 | 1;
    outputBuffer[bufferOffset++] = serializedLength & 255;
  }

  // Write first chunk
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = leadingZerosFirst;
  if (firstChunk < 0) {
    outputBuffer[bufferOffset++] = 0;
    bufferOffset += normalizedSignature.copy(outputBuffer, bufferOffset, 0, chunkByteLength);
  } else {
    bufferOffset += normalizedSignature.copy(outputBuffer, bufferOffset, firstChunk, chunkByteLength);
  }

  // Write second chunk
  outputBuffer[bufferOffset++] = cC1;
  outputBuffer[bufferOffset++] = leadingZerosSecond;
  if (secondChunk < 0) {
    outputBuffer[bufferOffset++] = 0;
    normalizedSignature.copy(outputBuffer, bufferOffset, chunkByteLength);
  } else {
    normalizedSignature.copy(outputBuffer, bufferOffset, chunkByteLength + secondChunk);
  }

  return outputBuffer;
}

module.exports = serializeSignatureWithChunks;