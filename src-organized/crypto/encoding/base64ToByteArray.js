/**
 * Decodes a Base64-encoded string into a byte array.
 *
 * @param {string} base64String - The Base64-encoded input string.
 * @returns {Uint8Array} The decoded byte array.
 */
function base64ToByteArray(base64String) {
  // getBase64PaddingInfo splits the input into [mainLength, paddingLength]
  const [mainLength, paddingLength] = getBase64PaddingInfo(base64String);

  // Determine the number of bytes to decode
  const decodeLength = paddingLength > 0 ? mainLength - 4 : mainLength;

  // Allocate the output array using d15 and calculateWeightedDifference helpers
  const outputArray = new d15(calculateWeightedDifference(base64String, mainLength, paddingLength));

  let outputIndex = 0;
  let inputIndex = 0;

  // Decode all full 4-character Base64 blocks
  for (inputIndex = 0; inputIndex < decodeLength; inputIndex += 4) {
    // Convert 4 Base64 chars to 3 bytes
    const chunk = (eX[base64String.charCodeAt(inputIndex)] << 18)
      | (eX[base64String.charCodeAt(inputIndex + 1)] << 12)
      | (eX[base64String.charCodeAt(inputIndex + 2)] << 6)
      | (eX[base64String.charCodeAt(inputIndex + 3)]);
    outputArray[outputIndex++] = (chunk >> 16) & 0xFF;
    outputArray[outputIndex++] = (chunk >> 8) & 0xFF;
    outputArray[outputIndex++] = chunk & 0xFF;
  }

  // Handle padding (if any)
  if (paddingLength === 2) {
    // 2 padding chars: only 1 byte of output
    const chunk = (eX[base64String.charCodeAt(inputIndex)] << 2)
      | (eX[base64String.charCodeAt(inputIndex + 1)] >> 4);
    outputArray[outputIndex++] = chunk & 0xFF;
  }
  if (paddingLength === 1) {
    // 1 padding char: 2 bytes of output
    const chunk = (eX[base64String.charCodeAt(inputIndex)] << 10)
      | (eX[base64String.charCodeAt(inputIndex + 1)] << 4)
      | (eX[base64String.charCodeAt(inputIndex + 2)] >> 2);
    outputArray[outputIndex++] = (chunk >> 8) & 0xFF;
    outputArray[outputIndex++] = chunk & 0xFF;
  }

  return outputArray;
}

module.exports = base64ToByteArray;