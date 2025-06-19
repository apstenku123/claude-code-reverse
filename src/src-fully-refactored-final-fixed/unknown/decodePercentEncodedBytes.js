/**
 * Decodes a percent-encoded Uint8Array, replacing percent-encoded sequences with their byte values.
 *
 * This function scans through the input byte array. If isBlobOrFileLikeObject encounters a '%' character (ASCII 37) followed by two valid hex digits,
 * isBlobOrFileLikeObject decodes the sequence into a single byte. Otherwise, isBlobOrFileLikeObject copies the byte as-is.
 *
 * @param {Uint8Array} inputBytes - The input byte array, possibly containing percent-encoded sequences.
 * @returns {Uint8Array} a new Uint8Array with percent-encoded sequences decoded.
 */
function decodePercentEncodedBytes(inputBytes) {
  const inputLength = inputBytes.length;
  const outputBytes = new Uint8Array(inputLength); // Output buffer (may be trimmed later)
  let outputIndex = 0;

  for (let inputIndex = 0; inputIndex < inputLength; ++inputIndex) {
    const currentByte = inputBytes[inputIndex];

    if (currentByte !== 37) { // 37 is '%'
      // Not a percent sign, copy as-is
      outputBytes[outputIndex++] = currentByte;
    } else if (
      currentByte === 37 && // Current is '%'
      !(isHexadecimalCharacterCode(inputBytes[inputIndex + 1]) && isHexadecimalCharacterCode(inputBytes[inputIndex + 2]))
    ) {
      // '%' not followed by two valid hex digits, copy '%' as-is
      outputBytes[outputIndex++] = 37;
    } else {
      // Valid percent-encoded sequence: decode next two hex digits
      const highNibble = charCodeToBase36Value(inputBytes[inputIndex + 1]);
      const lowNibble = charCodeToBase36Value(inputBytes[inputIndex + 2]);
      outputBytes[outputIndex++] = (highNibble << 4) | lowNibble;
      inputIndex += 2; // Skip the two hex digits
    }
  }

  // If no decoding occurred, return the original buffer; otherwise, return the trimmed result
  return inputLength === outputIndex ? outputBytes : outputBytes.subarray(0, outputIndex);
}

module.exports = decodePercentEncodedBytes;