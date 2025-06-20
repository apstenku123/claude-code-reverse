/**
 * Formats a 16-byte array into a UUID-like string using the MG lookup table.
 *
 * @param {number[]} byteArray - An array of at least 16 bytes (numbers 0-255), representing the UUID bytes.
 * @param {number} [startIndex=0] - Optional starting index in the byteArray to begin formatting from.
 * @returns {string} The formatted UUID string, with each byte mapped through the MG lookup table.
 *
 * Example output: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
 */
function formatMgUuidFromByteArray(byteArray, startIndex = 0) {
  // Each UUID section length in bytes
  const sectionLengths = [4, 2, 2, 2, 6];
  let result = '';
  let byteOffset = startIndex;

  // Iterate through each section of the UUID
  sectionLengths.forEach((sectionLength, sectionIndex) => {
    // For each byte in the section, append the mapped value from MG
    for (let i = 0; i < sectionLength; i++) {
      result += MG[byteArray[byteOffset + i]];
    }
    byteOffset += sectionLength;
    // Add dash between sections, except after the last section
    if (sectionIndex < sectionLengths.length - 1) {
      result += '-';
    }
  });

  return result;
}

module.exports = formatMgUuidFromByteArray;