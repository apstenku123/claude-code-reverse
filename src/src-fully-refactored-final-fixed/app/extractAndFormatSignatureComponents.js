/**
 * Extracts and formats signature components (r, createInteractionAccessor) from a DER-encoded buffer.
 * Validates the structure and length of the input, pads components as needed, and returns a base64-encoded string.
 *
 * @param {Buffer} derEncodedSignature - DER-encoded signature buffer
 * @param {number} maxComponentLength - Maximum allowed length for r/createInteractionAccessor components
 * @returns {string} Base64-encoded, padded signature string
 * @throws {Error} If the DER structure is invalid or component lengths are out of bounds
 */
function extractAndFormatSignatureComponents(derEncodedSignature, maxComponentLength) {
  // Normalize input buffer (may perform validation or conversion)
  const signatureBuffer = decodeEcdsaSignature(derEncodedSignature);
  // Get the maximum allowed length for r/createInteractionAccessor components
  const maxLength = WF2(maxComponentLength);
  const maxLengthPlusOne = maxLength + 1;
  const totalLength = signatureBuffer.length;
  let offset = 0;

  // Check for expected DER SEQUENCE tag
  if (signatureBuffer[offset++] !== JF2) {
    throw new Error('Could not find expected "seq"');
  }

  // Read the total length of the sequence
  let sequenceLength = signatureBuffer[offset++];
  // If the length is encoded with a high bit, read the next byte
  if (sequenceLength === (pC1 | 1)) {
    sequenceLength = signatureBuffer[offset++];
  }

  // Validate that the buffer has enough bytes for the declared sequence
  if (totalLength - offset < sequenceLength) {
    throw new Error(`"seq" specified length of "${sequenceLength}", only "${totalLength - offset}" remaining`);
  }

  // Check for expected INTEGER tag for r
  if (signatureBuffer[offset++] !== cC1) {
    throw new Error('Could not find expected "int" for "r"');
  }

  // Read r length
  const rLength = signatureBuffer[offset++];
  // Validate r length
  if (totalLength - offset - 2 < rLength) {
    throw new Error(`"r" specified length of "${rLength}", only "${totalLength - offset - 2}" available`);
  }
  if (maxLengthPlusOne < rLength) {
    throw new Error(`"r" specified length of "${rLength}", max of "${maxLengthPlusOne}" is acceptable`);
  }
  // Remember r start offset
  const rStart = offset;
  offset += rLength;

  // Check for expected INTEGER tag for createInteractionAccessor
  if (signatureBuffer[offset++] !== cC1) {
    throw new Error('Could not find expected "int" for "createInteractionAccessor"');
  }

  // Read createInteractionAccessor length
  const sLength = signatureBuffer[offset++];
  // Validate createInteractionAccessor length
  if (totalLength - offset !== sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", expected "${totalLength - offset}"`);
  }
  if (maxLengthPlusOne < sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", max of "${maxLengthPlusOne}" is acceptable`);
  }
  // Remember createInteractionAccessor start offset
  const sStart = offset;
  offset += sLength;

  // Ensure handleMissingDoctypeError'removeTrailingCharacters consumed the entire buffer
  if (offset !== totalLength) {
    throw new Error(`Expected to consume entire buffer, but "${totalLength - offset}" bytes remain`);
  }

  // Calculate padding for r and createInteractionAccessor components
  const rPadding = maxLength - rLength;
  const sPadding = maxLength - sLength;
  // Allocate output buffer: rPadding + r + sPadding + createInteractionAccessor
  const outputBuffer = uC1.allocUnsafe(rPadding + rLength + sPadding + sLength);

  let outputOffset = 0;
  // Pad r with zeros if needed
  for (let i = 0; i < rPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy r component
  signatureBuffer.copy(outputBuffer, outputOffset, rStart + Math.max(-rPadding, 0), rStart + rLength);
  outputOffset += rLength;

  // Pad createInteractionAccessor with zeros if needed
  for (let i = 0; i < sPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy createInteractionAccessor component
  signatureBuffer.copy(outputBuffer, outputOffset, sStart + Math.max(-sPadding, 0), sStart + sLength);

  // Convert to base64 and post-process
  let base64Signature = outputBuffer.toString("base64");
  base64Signature = UA5(base64Signature);
  return base64Signature;
}

module.exports = extractAndFormatSignatureComponents;