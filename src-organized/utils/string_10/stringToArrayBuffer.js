/**
 * Converts a string into an ArrayBuffer where each character'createInteractionAccessor char code is stored as a byte.
 *
 * @param {string} inputString - The string to convert to an ArrayBuffer.
 * @returns {ArrayBuffer} An ArrayBuffer containing the UTF-16 char codes of the input string as bytes.
 */
function stringToArrayBuffer(inputString) {
  const stringLength = inputString.length;
  // Create a new ArrayBuffer with a byte for each character in the string
  const arrayBuffer = new ArrayBuffer(stringLength);
  // Create a Uint8Array view for the buffer to manipulate bytes
  const uint8View = new Uint8Array(arrayBuffer);

  // Iterate over each character in the string
  for (let index = 0; index < stringLength; index++) {
    // Store the character code (lower 8 bits) at the corresponding position
    uint8View[index] = inputString.charCodeAt(index);
  }

  return arrayBuffer;
}

module.exports = stringToArrayBuffer;