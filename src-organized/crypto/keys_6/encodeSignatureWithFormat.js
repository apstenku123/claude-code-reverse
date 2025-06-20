/**
 * Encodes a signature buffer into a specific binary format based on the provided signature type.
 * Throws if the signature length does not match the expected size for the given type.
 *
 * @param {Buffer} signatureBuffer - The raw signature bytes to encode.
 * @param {string} signatureType - The signature type identifier (used to determine expected length).
 * @returns {Buffer} The encoded signature in the required binary format.
 * @throws {TypeError} If the signature length does not match the expected size.
 */
function encodeSignatureWithFormat(signatureBuffer, signatureType) {
  // Normalize or transform the signature buffer as required by the format
  const normalizedSignature = decodeEcdsaSignature(signatureBuffer);

  // Determine the expected signature length for the given type
  const expectedLength = WF2(signatureType);
  const actualLength = normalizedSignature.length;

  // Validate signature length
  if (actualLength !== expectedLength * 2) {
    throw new TypeError(
      `"${signatureType}" signatures must be "${expectedLength * 2}" bytes, saw "${actualLength}"`
    );
  }

  // Split the signature into two parts (isWildcardOrX and s components)
  const rComponent = countLeadingZerosInRange(normalizedSignature, 0, expectedLength);
  const sComponent = countLeadingZerosInRange(normalizedSignature, expectedLength, actualLength);

  // Calculate leading zero counts for isWildcardOrX and s(for DER encoding)
  const leadingZerosR = expectedLength - rComponent;
  const leadingZerosS = expectedLength - sComponent;

  // Calculate the total length of the DER-encoded signature
  // Structure: 2 (sequence header) + leadingZerosR + 1 (isWildcardOrX header) + 1 (s header) + leadingZerosS
  const derLength = 2 + leadingZerosR + 1 + 1 + leadingZerosS;

  // Determine if the length fits in a single byte (short-form DER encoding)
  const useShortForm = derLength < pC1;

  // Allocate the output buffer (2 or 3 bytes for headers, plus the DER-encoded signature)
  const outputBuffer = uC1.allocUnsafe((useShortForm ? 2 : 3) + derLength);
  let offset = 0;

  // Write DER sequence header
  outputBuffer[offset++] = JF2;
  if (useShortForm) {
    outputBuffer[offset++] = derLength;
  } else {
    outputBuffer[offset++] = pC1 | 1;
    outputBuffer[offset++] = derLength & 255;
  }

  // Write isWildcardOrX component
  outputBuffer[offset++] = cC1;
  outputBuffer[offset++] = leadingZerosR;
  if (rComponent < 0) {
    outputBuffer[offset++] = 0;
    offset += normalizedSignature.copy(outputBuffer, offset, 0, expectedLength);
  } else {
    offset += normalizedSignature.copy(outputBuffer, offset, rComponent, expectedLength);
  }

  // Write s component
  outputBuffer[offset++] = cC1;
  outputBuffer[offset++] = leadingZerosS;
  if (sComponent < 0) {
    outputBuffer[offset++] = 0;
    normalizedSignature.copy(outputBuffer, offset, expectedLength);
  } else {
    normalizedSignature.copy(outputBuffer, offset, expectedLength + sComponent);
  }

  return outputBuffer;
}

module.exports = encodeSignatureWithFormat;