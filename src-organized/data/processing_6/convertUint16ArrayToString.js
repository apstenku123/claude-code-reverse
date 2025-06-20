/**
 * Converts a Uint16Array (or array of char codes) to a string efficiently, handling large arrays by processing in chunks.
 *
 * @param {Uint16Array|number[]} charCodesArray - An array-like object containing UTF-16 code units (numbers between 0 and 65535).
 * @returns {string} The resulting string formed by interpreting the array as UTF-16 code units.
 */
function convertUint16ArrayToString(charCodesArray) {
  const CHUNK_SIZE = 16384; // Maximum number of arguments for Function.prototype.apply in most JS engines
  // If the array is small enough, convert all at once
  if (charCodesArray.length < CHUNK_SIZE) {
    return String.fromCharCode.apply(String, charCodesArray);
  }
  // For large arrays, process in chunks to avoid stack overflow
  let resultString = "";
  for (let startIndex = 0; startIndex < charCodesArray.length; startIndex += CHUNK_SIZE) {
    const chunk = charCodesArray.slice(startIndex, startIndex + CHUNK_SIZE);
    resultString += String.fromCharCode.apply(String, chunk);
  }
  return resultString;
}

module.exports = convertUint16ArrayToString;