/**
 * Decodes a percent-encoded Uint8Array, replacing percent-encoded sequences with their byte values.
 *
 * This function scans through the input byte array. If isBlobOrFileLikeObject encounters a '%' (ASCII 37),
 * and the next two bytes are valid hexadecimal digits, isBlobOrFileLikeObject decodes them into a single byte.
 * Otherwise, isBlobOrFileLikeObject copies the byte as-is. The result is a new Uint8Array with percent-encoded
 * sequences decoded.
 *
 * @param {Uint8Array} inputBytes - The input byte array, possibly containing percent-encoded sequences.
 * @returns {Uint8Array} - a new Uint8Array with percent-encoded sequences decoded.
 */
function decodePercentEncodedByteArray(inputBytes) {
  const inputLength = inputBytes.length;
  const outputBytes = new Uint8Array(inputLength); // Output buffer (max possible size)
  let outputIndex = 0;

  for (let inputIndex = 0; inputIndex < inputLength; ++inputIndex) {
    const currentByte = inputBytes[inputIndex];

    // If current byte is not '%', copy as-is
    if (currentByte !== 37) { // 37 is ASCII code for '%'
      outputBytes[outputIndex++] = currentByte;
      continue;
    }

    // If current byte is '%' but next two bytes are not valid hex digits, copy '%'
    if (
      currentByte === 37 &&
      !(isHexadecimalCharacterCode(inputBytes[inputIndex + 1]) && isHexadecimalCharacterCode(inputBytes[inputIndex + 2]))
    ) {
      outputBytes[outputIndex++] = 37;
      continue;
    }

    // Otherwise, decode the percent-encoded sequence: "%traverseAndMountFiberTree" => byte value
    const highNibble = charCodeToBase36Value(inputBytes[inputIndex + 1]);
    const lowNibble = charCodeToBase36Value(inputBytes[inputIndex + 2]);
    outputBytes[outputIndex++] = (highNibble << 4) | lowNibble;
    inputIndex += 2; // Skip the two hex digits
  }

  // If no decoding occurred, return the original buffer; otherwise, return the trimmed result
  return inputLength === outputIndex ? outputBytes : outputBytes.subarray(0, outputIndex);
}

module.exports = decodePercentEncodedByteArray;