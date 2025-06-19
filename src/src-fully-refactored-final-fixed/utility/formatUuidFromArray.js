/**
 * Formats a UUID string from an array of values using the NG lookup table.
 *
 * @param {Array<number>} byteArray - An array containing at least 16 numeric values representing bytes of a UUID.
 * @param {number} [startIndex=0] - The starting index in the array from which to read the 16 UUID bytes.
 * @returns {string} The formatted UUID string (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').
 */
function formatUuidFromArray(byteArray, startIndex = 0) {
  // Each UUID consists of 16 bytes, formatted as 8-4-4-4-12 hexadecimal digits
  // NG is assumed to be a lookup table that converts a byte value to a hexadecimal string
  return (
    NG[byteArray[startIndex + 0]] +
    NG[byteArray[startIndex + 1]] +
    NG[byteArray[startIndex + 2]] +
    NG[byteArray[startIndex + 3]] +
    '-' +
    NG[byteArray[startIndex + 4]] +
    NG[byteArray[startIndex + 5]] +
    '-' +
    NG[byteArray[startIndex + 6]] +
    NG[byteArray[startIndex + 7]] +
    '-' +
    NG[byteArray[startIndex + 8]] +
    NG[byteArray[startIndex + 9]] +
    '-' +
    NG[byteArray[startIndex + 10]] +
    NG[byteArray[startIndex + 11]] +
    NG[byteArray[startIndex + 12]] +
    NG[byteArray[startIndex + 13]] +
    NG[byteArray[startIndex + 14]] +
    NG[byteArray[startIndex + 15]]
  );
}

module.exports = formatUuidFromArray;