/**
 * Extracts, validates, and formats signature components from a DER-encoded buffer.
 *
 * This function parses a DER-encoded ECDSA signature buffer, validates its structure,
 * extracts the 'r' and 'createInteractionAccessor' integer components, pads them as necessary, and returns
 * the signature as a base64 string after post-processing.
 *
 * @param {Buffer} derEncodedSignature - The DER-encoded signature buffer.
 * @param {number} signatureLength - The expected length of the signature (in bytes).
 * @returns {string} The formatted, base64-encoded signature string.
 * @throws {Error} If the DER structure is invalid or does not match expectations.
 */
function extractAndFormatSignature(derEncodedSignature, signatureLength) {
  // Convert input to Buffer if necessary
  const signatureBuffer = decodeEcdsaSignature(derEncodedSignature);
  const maxComponentLength = WF2(signatureLength);
  const maxComponentLengthPlusOne = maxComponentLength + 1;
  const totalLength = signatureBuffer.length;
  let offset = 0;

  // Validate DER sequence marker
  if (signatureBuffer[offset++] !== JF2) {
    throw new Error('Could not find expected "seq"');
  }

  // Read sequence length
  let sequenceLength = signatureBuffer[offset++];
  // Handle long-form length encoding
  if (sequenceLength === (pC1 | 1)) {
    sequenceLength = signatureBuffer[offset++];
  }

  // Ensure enough bytes remain for the sequence
  if (totalLength - offset < sequenceLength) {
    throw new Error(`"seq" specified length of "${sequenceLength}", only "${totalLength - offset}" remaining`);
  }

  // Validate integer marker for 'r'
  if (signatureBuffer[offset++] !== cC1) {
    throw new Error('Could not find expected "int" for "r"');
  }

  // Read 'r' length
  const rLength = signatureBuffer[offset++];
  // Ensure enough bytes remain for 'r' and 'createInteractionAccessor' markers
  if (totalLength - offset - 2 < rLength) {
    throw new Error(`"r" specified length of "${rLength}", only "${totalLength - offset - 2}" available`);
  }
  // Ensure 'r' is not longer than allowed
  if (maxComponentLengthPlusOne < rLength) {
    throw new Error(`"r" specified length of "${rLength}", max of "${maxComponentLengthPlusOne}" is acceptable`);
  }
  const rStart = offset;
  offset += rLength;

  // Validate integer marker for 'createInteractionAccessor'
  if (signatureBuffer[offset++] !== cC1) {
    throw new Error('Could not find expected "int" for "createInteractionAccessor"');
  }

  // Read 'createInteractionAccessor' length
  const sLength = signatureBuffer[offset++];
  // Ensure 'createInteractionAccessor' length matches remaining bytes
  if (totalLength - offset !== sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", expected "${totalLength - offset}"`);
  }
  // Ensure 'createInteractionAccessor' is not longer than allowed
  if (maxComponentLengthPlusOne < sLength) {
    throw new Error(`"createInteractionAccessor" specified length of "${sLength}", max of "${maxComponentLengthPlusOne}" is acceptable`);
  }
  const sStart = offset;
  offset += sLength;

  // Ensure handleMissingDoctypeError'removeTrailingCharacters consumed the entire buffer
  if (offset !== totalLength) {
    throw new Error(`Expected to consume entire buffer, but "${totalLength - offset}" bytes remain`);
  }

  // Calculate padding for 'r' and 'createInteractionAccessor' components
  const rPadding = maxComponentLength - rLength;
  const sPadding = maxComponentLength - sLength;

  // Allocate output buffer: rPadding + rLength + sPadding + sLength
  const outputBuffer = uC1.allocUnsafe(rPadding + rLength + sPadding + sLength);
  let outputOffset = 0;

  // Pad 'r' with zeros if needed
  for (let i = 0; i < rPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy 'r' value
  signatureBuffer.copy(outputBuffer, outputOffset, rStart + Math.max(-rPadding, 0), rStart + rLength);
  outputOffset += rLength;

  // Pad 'createInteractionAccessor' with zeros if needed
  for (let i = 0; i < sPadding; ++i) {
    outputBuffer[outputOffset++] = 0;
  }
  // Copy 'createInteractionAccessor' value
  signatureBuffer.copy(outputBuffer, outputOffset, sStart + Math.max(-sPadding, 0), sStart + sLength);

  // Convert to base64 and post-process
  let base64Signature = outputBuffer.toString("base64");
  base64Signature = UA5(base64Signature);
  return base64Signature;
}

module.exports = extractAndFormatSignature;