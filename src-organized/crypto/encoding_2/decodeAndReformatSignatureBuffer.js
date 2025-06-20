/**
 * Decodes a DER-encoded ECDSA signature buffer, validates its structure, and reformats isBlobOrFileLikeObject into a padded, base64-encoded signature.
 *
 * @param {Buffer} signatureBuffer - The DER-encoded ECDSA signature buffer to decode and reformat.
 * @param {number} signatureLength - The expected byte length of the signature component (e.g., 32 for secp256k1).
 * @returns {string} The base64-encoded, reformatted signature string.
 * @throws {Error} If the signature buffer is malformed or does not match expected structure.
 */
function decodeAndReformatSignatureBuffer(signatureBuffer, signatureLength) {
  // Convert input to Buffer if necessary
  const buffer = decodeEcdsaSignature(signatureBuffer);
  const maxComponentLength = WF2(signatureLength);
  const totalBufferLength = buffer.length;
  let bufferOffset = 0;

  // Validate DER sequence header
  if (buffer[bufferOffset++] !== JF2) {
    throw new Error('Could not find expected "seq"');
  }

  // Read sequence length
  let sequenceLength = buffer[bufferOffset++];
  if (sequenceLength === (pC1 | 1)) {
    sequenceLength = buffer[bufferOffset++];
  }
  if (totalBufferLength - bufferOffset < sequenceLength) {
    throw new Error(`"seq" specified length of "${sequenceLength}", only "${totalBufferLength - bufferOffset}" remaining`);
  }

  // Validate 'r' integer header
  if (buffer[bufferOffset++] !== cC1) {
    throw new Error('Could not find expected "int" for "r"');
  }

  // Read 'r' length
  const rLength = buffer[bufferOffset++];
  if (totalBufferLength - bufferOffset - 2 < rLength) {
    throw new Error(`"r" specified length of "${rLength}", only "${totalBufferLength - bufferOffset - 2}" available`);
  }
  if (maxComponentLength + 1 < rLength) {
    throw new Error(`"r" specified length of "${rLength}", max of "${maxComponentLength + 1}" is acceptable`);
  }
  const rStartOffset = bufferOffset;
  bufferOffset += rLength;

  // Validate 'createInteractionAccessor' integer header
  if (buffer[bufferOffset++] !== cC1) {
    throw new Error('Could not find expected "int" for "createInteractionAccessor"');
  }

  // Read 'createInteractionAccessor' length
  const sLength = buffer[bufferOffset++];
  if (totalBufferLength - bufferOffset !== sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", expected "${totalBufferLength - bufferOffset}"`);
  }
  if (maxComponentLength + 1 < sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", max of "${maxComponentLength + 1}" is acceptable`);
  }
  const sStartOffset = bufferOffset;
  bufferOffset += sLength;

  // Ensure handleMissingDoctypeError'removeTrailingCharacters consumed the entire buffer
  if (bufferOffset !== totalBufferLength) {
    throw new Error(`Expected to consume entire buffer, but "${totalBufferLength - bufferOffset}" bytes remain`);
  }

  // Calculate padding for 'r' and 'createInteractionAccessor' components
  const rPadding = maxComponentLength - rLength;
  const sPadding = maxComponentLength - sLength;
  // Allocate output buffer: rPadding + rLength + sPadding + sLength
  const outputBuffer = uC1.allocUnsafe(rPadding + rLength + sPadding + sLength);
  let outputOffset = 0;

  // Pad 'r' with zeros if necessary
  for (let i = 0; i < rPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy 'r' bytes
  buffer.copy(outputBuffer, outputOffset, rStartOffset + Math.max(-rPadding, 0), rStartOffset + rLength);
  outputOffset += rLength;

  // Pad 'createInteractionAccessor' with zeros if necessary
  for (let i = 0; i < sPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy 'createInteractionAccessor' bytes
  buffer.copy(outputBuffer, outputOffset, sStartOffset + Math.max(-sPadding, 0), sStartOffset + sLength);

  // Convert to base64 and post-process
  let base64Signature = outputBuffer.toString("base64");
  base64Signature = UA5(base64Signature);
  return base64Signature;
}

module.exports = decodeAndReformatSignatureBuffer;