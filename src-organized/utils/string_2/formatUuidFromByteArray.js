/**
 * Converts a sequence of bytes from an array into a UUID string format.
 *
 * @param {Array|Uint8Array} byteArray - The array containing byte values to be formatted as a UUID.
 * @param {number} [startIndex=0] - The starting index in the array from which to read the 16 bytes for the UUID.
 * @returns {string} The formatted UUID string (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').
 */
function formatUuidFromByteArray(byteArray, startIndex = 0) {
  // Helper function NG is assumed to convert a byte value to a two-character hexadecimal string
  // e.g., NG(255) === 'ff'
  return (
    NG[byteArray[startIndex + 0]] + NG[byteArray[startIndex + 1]] + NG[byteArray[startIndex + 2]] + NG[byteArray[startIndex + 3]] +
    '-' +
    NG[byteArray[startIndex + 4]] + NG[byteArray[startIndex + 5]] +
    '-' +
    NG[byteArray[startIndex + 6]] + NG[byteArray[startIndex + 7]] +
    '-' +
    NG[byteArray[startIndex + 8]] + NG[byteArray[startIndex + 9]] +
    '-' +
    NG[byteArray[startIndex + 10]] + NG[byteArray[startIndex + 11]] + NG[byteArray[startIndex + 12]] + NG[byteArray[startIndex + 13]] + NG[byteArray[startIndex + 14]] + NG[byteArray[startIndex + 15]]
  );
}

module.exports = formatUuidFromByteArray;