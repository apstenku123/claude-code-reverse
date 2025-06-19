/**
 * Formats a UUID string from a byte array using a lookup table.
 *
 * @param {number[]} byteArray - An array of bytes representing the UUID (at least 16 elements).
 * @param {number} [startIndex=0] - The starting index in the byte array to read the UUID bytes from.
 * @returns {string} The formatted UUID string (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').
 */
function formatUuidFromByteArray(byteArray, startIndex = 0) {
  // Assumes jG is a lookup table mapping byte values to their hexadecimal string representations
  // Example: jG[15] === '0f'
  return (
    jG[byteArray[startIndex + 0]] +
    jG[byteArray[startIndex + 1]] +
    jG[byteArray[startIndex + 2]] +
    jG[byteArray[startIndex + 3]] +
    '-' +
    jG[byteArray[startIndex + 4]] +
    jG[byteArray[startIndex + 5]] +
    '-' +
    jG[byteArray[startIndex + 6]] +
    jG[byteArray[startIndex + 7]] +
    '-' +
    jG[byteArray[startIndex + 8]] +
    jG[byteArray[startIndex + 9]] +
    '-' +
    jG[byteArray[startIndex + 10]] +
    jG[byteArray[startIndex + 11]] +
    jG[byteArray[startIndex + 12]] +
    jG[byteArray[startIndex + 13]] +
    jG[byteArray[startIndex + 14]] +
    jG[byteArray[startIndex + 15]]
  );
}

module.exports = formatUuidFromByteArray;